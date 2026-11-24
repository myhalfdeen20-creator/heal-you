import { ARCHETYPE_MAP } from '../data/archetypes';
import {
  BLIND_SPOT_DATA,
  DAILY_PRACTICES,
  INTENSITY_DATA,
  MODERN_RELEVANCE,
  SYNTHESIS_DATA,
} from '../data/insights';
import type { AssessmentResult } from '../types';
import {
  createCircularAvatarPng,
  createRoundedLogoPng,
  downloadBlob,
  hexToRgb,
  mixWithWhite,
  sanitizeFilenameSegment,
} from './imageHelpers';

function cleanPdfText(text: string): string {
  return text
    .replace(/\u2014/g, ' - ')
    .replace(/\u2013/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u00B7/g, ' · ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export interface PdfExportResult {
  filename: string;
  sizeBytes: number;
}

/**
 * Generates a razor-sharp 2-page A4 vector PDF report directly via jsPDF.
 * Text is fully selectable/printable, layout heights are computed dynamically
 * so content never clips, and images are pre-converted from WebP to transparent PNG.
 */
export async function generateAssessmentPdf(
  result: AssessmentResult,
  userName: string,
  completedHabits: number[]
): Promise<PdfExportResult> {
  const { primary, secondary, lowest, scores } = result;
  const modernData = MODERN_RELEVANCE[primary.id];
  const intensityObj = INTENSITY_DATA[primary.id];
  const isHighIntensity = primary.matchPercentage >= 85;
  const intensityText = isHighIntensity ? intensityObj.high : intensityObj.mod;
  const intensityLabel = isHighIntensity
    ? 'Intensitas Tinggi (Waspada Overdrive)'
    : 'Intensitas Terintegrasi (Mengalir Alami)';
  const blindSpotText = BLIND_SPOT_DATA[lowest.id];
  const practices = DAILY_PRACTICES[primary.id];

  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Load jsPDF lazily & pre-convert WebP images to circular/rounded PNGs in parallel
  const [{ jsPDF }, primaryAvatarPng, secondaryAvatarPng, logoPng] = await Promise.all([
    import('jspdf'),
    createCircularAvatarPng(`/avatars/${primary.id}.webp`, primary.hex, 260),
    secondary
      ? createCircularAvatarPng(`/avatars/${secondary.id}.webp`, secondary.hex, 180)
      : Promise.resolve(null),
    createRoundedLogoPng('/logo-healyou.webp', 120),
  ]);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageW = 210;
  const pageH = 297;
  const marginX = 14;
  const contentW = pageW - marginX * 2; // 182mm
  const [pR, pG, pB] = hexToRgb(primary.hex);
  const [pTintR, pTintG, pTintB] = mixWithWhite(primary.hex, 0.93);

  const drawHeader = (kicker: string, title: string) => {
    // Top accent stripe
    pdf.setFillColor(pR, pG, pB);
    pdf.rect(0, 0, pageW, 2.5, 'F');

    // Left titles
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(120, 130, 148);
    pdf.text(kicker.toUpperCase(), marginX, 11.5);

    pdf.setFont('times', 'bold');
    pdf.setFontSize(17);
    pdf.setTextColor(74, 72, 101);
    pdf.text(title, marginX, 18);

    // Right metadata + logo
    const logoSize = 11;
    const logoX = pageW - marginX - logoSize;
    if (logoPng) {
      pdf.addImage(logoPng, 'PNG', logoX, 8.5, logoSize, logoSize, undefined, 'FAST');
    }

    const metaRightX = logoPng ? logoX - 3.5 : pageW - marginX;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.2);
    pdf.setTextColor(100, 116, 139);
    pdf.text(`Tanggal: ${dateStr}`, metaRightX, 13, { align: 'right' });

    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(30, 41, 59);
    pdf.text(`Subjek: ${cleanPdfText(userName || 'Anonim')}`, metaRightX, 17.5, {
      align: 'right',
    });

    // Hairline divider
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.3);
    pdf.line(marginX, 22.5, pageW - marginX, 22.5);
  };

  const drawFooter = (pageNum: number, subtitle: string) => {
    const footerY = pageH - 11;
    pdf.setFillColor(248, 250, 252);
    pdf.rect(0, pageH - 15, pageW, 15, 'F');
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.25);
    pdf.line(0, pageH - 15, pageW, pageH - 15);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(148, 163, 184);
    pdf.text('HEALYOU · ASESMEN UMMUL MUKMININ · DOKUMEN REFLEKSI PRIBADI', marginX, footerY + 3.5);
    pdf.text(
      `HALAMAN ${pageNum} DARI 2 · ${subtitle.toUpperCase()}`,
      pageW - marginX,
      footerY + 3.5,
      { align: 'right' }
    );
  };

  // =========================================================================
  // PAGE 1: EXECUTIVE SUMMARY
  // =========================================================================
  pdf.setFillColor(253, 253, 254);
  pdf.rect(0, 0, pageW, pageH, 'F');
  drawHeader('Laporan Hasil Asesmen · HealYou', 'Ringkasan Eksekutif Karakter');

  let y = 27;

  // --- 1. Core Identity Card ---
  const avatarDia = 26;
  const textX = marginX + 5 + avatarDia + 5;
  const identityTextW = contentW - (textX - marginX) - 5;

  pdf.setFont('times', 'bold');
  pdf.setFontSize(15.5);
  const nameLines = pdf.splitTextToSize(cleanPdfText(primary.name), identityTextW - 22);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.8);
  const summaryLines = pdf.splitTextToSize(cleanPdfText(primary.shortSummary), identityTextW);

  pdf.setFont('times', 'italic');
  pdf.setFontSize(8.8);
  const validationLines = pdf.splitTextToSize(
    `"${cleanPdfText(modernData.validation)}"`,
    identityTextW
  );

  const identityBodyH =
    5.5 + nameLines.length * 6 + 2 + summaryLines.length * 4 + 2.5 + validationLines.length * 4;
  const identityCardH = Math.max(36, identityBodyH + 9);

  pdf.setFillColor(pTintR, pTintG, pTintB);
  pdf.setDrawColor(226, 232, 240);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(marginX, y, contentW, identityCardH, 3.5, 3.5, 'FD');

  if (primaryAvatarPng) {
    const avatarY = y + (identityCardH - avatarDia) / 2;
    pdf.addImage(primaryAvatarPng, 'PNG', marginX + 5, avatarY, avatarDia, avatarDia, undefined, 'FAST');
  }

  let curY = y + 6.5;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(pR, pG, pB);
  pdf.text(`RESONANSI UTAMA · ${cleanPdfText(primary.epithet).toUpperCase()}`, textX, curY);

  // Score badge at top-right of card
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.setTextColor(pR, pG, pB);
  pdf.text(`${primary.matchPercentage}%`, pageW - marginX - 5, curY + 5, { align: 'right' });
  pdf.setFontSize(6.5);
  pdf.setTextColor(148, 163, 184);
  pdf.text('KESESUAIAN', pageW - marginX - 5, curY + 8.5, { align: 'right' });

  curY += 5.5;
  pdf.setFont('times', 'bold');
  pdf.setFontSize(15.5);
  pdf.setTextColor(15, 23, 42);
  pdf.text(nameLines, textX, curY);
  curY += nameLines.length * 6 + 1;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.8);
  pdf.setTextColor(51, 65, 85);
  pdf.text(summaryLines, textX, curY);
  curY += summaryLines.length * 4 + 2;

  pdf.setFont('times', 'italic');
  pdf.setFontSize(8.8);
  pdf.setTextColor(pR, pG, pB);
  pdf.text(validationLines, textX, curY);

  y += identityCardH + 4.5;

  // --- 2. Modern Relevance Card ---
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  const relevanceLines = pdf.splitTextToSize(cleanPdfText(modernData.relevance), contentW - 10);
  const relevanceCardH = 12 + relevanceLines.length * 4.2 + 3.5;

  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(226, 232, 240);
  pdf.roundedRect(marginX, y, contentW, relevanceCardH, 3, 3, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(148, 163, 184);
  pdf.text('MAKNA KARAKTER UNTUK JATI DIRIMU HARI INI', marginX + 5, y + 6);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(30, 41, 59);
  pdf.text(relevanceLines, marginX + 5, y + 11.5);

  y += relevanceCardH + 4.5;

  // --- 3. Intensity Scale Card ---
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.8);
  const intensityLines = pdf.splitTextToSize(cleanPdfText(intensityText), contentW - 10);
  const intensityCardH = 17.5 + intensityLines.length * 4 + 3.5;

  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(226, 232, 240);
  pdf.roundedRect(marginX, y, contentW, intensityCardH, 3, 3, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(71, 85, 105);
  pdf.text(`SKALA INTENSITAS · ${intensityLabel.toUpperCase()}`, marginX + 5, y + 6);

  pdf.setFontSize(9);
  pdf.setTextColor(pR, pG, pB);
  pdf.text(`${primary.matchPercentage}%`, pageW - marginX - 5, y + 6, { align: 'right' });

  // Vector progress bar
  const barX = marginX + 5;
  const barW = contentW - 10;
  const barY = y + 8.5;
  pdf.setFillColor(226, 232, 240);
  pdf.roundedRect(barX, barY, barW, 2.4, 1.2, 1.2, 'F');
  if (isHighIntensity) {
    pdf.setFillColor(217, 119, 6);
  } else {
    pdf.setFillColor(5, 150, 105);
  }
  const fillW = Math.max(4, (barW * Math.min(100, primary.matchPercentage)) / 100);
  pdf.roundedRect(barX, barY, fillW, 2.4, 1.2, 1.2, 'F');

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.8);
  pdf.setTextColor(71, 85, 105);
  pdf.text(intensityLines, marginX + 5, y + 16);

  y += intensityCardH + 4.5;

  // --- 4. Two Columns: Relational Dynamics & Cognitive Strengths ---
  const colGap = 4.5;
  const colW = (contentW - colGap) / 2;
  const innerColW = colW - 9;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.8);
  const roleLines = pdf.splitTextToSize(cleanPdfText(primary.roleDynamics), innerColW);
  const leftNeededH = 14 + roleLines.length * 4.2 + 4;

  // Measure right column wisdom items
  const parsedWisdom = primary.wisdom.map((w) => {
    const [term, desc] = w.split(': ');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.3);
    const descLines = pdf.splitTextToSize(cleanPdfText(desc || ''), innerColW);
    return { term: cleanPdfText(term || ''), descLines };
  });
  const rightNeededH =
    14 +
    parsedWisdom.reduce((sum, item) => sum + 4 + item.descLines.length * 3.7 + 2.5, 0) +
    2;

  const twoColH = Math.max(leftNeededH, rightNeededH);

  // Left card
  pdf.setFillColor(248, 250, 252);
  pdf.setDrawColor(226, 232, 240);
  pdf.roundedRect(marginX, y, colW, twoColH, 3, 3, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(71, 85, 105);
  pdf.text('DINAMIKA RELASIONAL & KESEHARIAN', marginX + 4.5, y + 6.5);
  pdf.setDrawColor(226, 232, 240);
  pdf.line(marginX + 4.5, y + 8.5, marginX + colW - 4.5, y + 8.5);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.8);
  pdf.setTextColor(51, 65, 85);
  pdf.text(roleLines, marginX + 4.5, y + 13.5);

  // Right card
  const rightX = marginX + colW + colGap;
  pdf.setFillColor(248, 250, 252);
  pdf.setDrawColor(226, 232, 240);
  pdf.roundedRect(rightX, y, colW, twoColH, 3, 3, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);
  pdf.setTextColor(71, 85, 105);
  pdf.text('KEKUATAN KOGNITIF & EMOSIONAL', rightX + 4.5, y + 6.5);
  pdf.line(rightX + 4.5, y + 8.5, rightX + colW - 4.5, y + 8.5);

  let wY = y + 13.2;
  parsedWisdom.forEach((item) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.3);
    pdf.setTextColor(pR, pG, pB);
    pdf.text(`• ${item.term}`, rightX + 4.5, wY);
    wY += 3.8;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.2);
    pdf.setTextColor(71, 85, 105);
    pdf.text(item.descLines, rightX + 4.5, wY);
    wY += item.descLines.length * 3.7 + 2.5;
  });

  y += twoColH + 4.5;

  // --- 5. Secondary Character Card (if exists & fits cleanly) ---
  if (secondary) {
    const [sR, sG, sB] = hexToRgb(secondary.hex);
    const secAvatarDia = 16;
    const secTextX = marginX + 5 + secAvatarDia + 4.5;
    const secTextW = contentW - (secTextX - marginX) - 5;

    const synthText = `${SYNTHESIS_DATA.primary[primary.id]} ${SYNTHESIS_DATA.secondary[secondary.id]}`;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.4);
    const synthLines = pdf.splitTextToSize(cleanPdfText(synthText), secTextW);
    const maxSecH = pageH - 18 - y;
    const secCardH = Math.min(maxSecH, Math.max(24, 13 + synthLines.length * 3.7 + 3));

    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(226, 232, 240);
    pdf.roundedRect(marginX, y, contentW, secCardH, 3, 3, 'FD');

    if (secondaryAvatarPng) {
      pdf.addImage(
        secondaryAvatarPng,
        'PNG',
        marginX + 5,
        y + (secCardH - secAvatarDia) / 2,
        secAvatarDia,
        secAvatarDia,
        undefined,
        'FAST'
      );
    }

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.5);
    pdf.setTextColor(148, 163, 184);
    pdf.text('SIFAT PENDAMPING & PENYEIMBANG', secTextX, y + 6);

    pdf.setFontSize(8.5);
    pdf.setTextColor(sR, sG, sB);
    pdf.text(`${secondary.matchPercentage}% Kesesuaian`, pageW - marginX - 5, y + 6, {
      align: 'right',
    });

    pdf.setFont('times', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(15, 23, 42);
    pdf.text(cleanPdfText(secondary.name), secTextX, y + 10.8);

    // Clamp lines only if extremely tight (never overflows footer)
    const maxLines = Math.max(2, Math.floor((secCardH - 14.5) / 3.7));
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.3);
    pdf.setTextColor(71, 85, 105);
    pdf.text(synthLines.slice(0, maxLines), secTextX, y + 15);
  }

  drawFooter(1, 'Ringkasan Eksekutif');

  // =========================================================================
  // PAGE 2: RECAP TABLE, BLIND SPOT, & DAILY MICRO-HABITS
  // =========================================================================
  pdf.addPage();
  pdf.setFillColor(253, 253, 254);
  pdf.rect(0, 0, pageW, pageH, 'F');
  drawHeader('Lampiran Evaluasi & Rekapitulasi · HealYou', 'Rekapitulasi 11 Profil & Ruang Bertumbuh');

  let y2 = 27;

  // --- 1. Blind Spot Card ---
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.6);
  const blindLines = pdf.splitTextToSize(`"${cleanPdfText(blindSpotText)}"`, contentW - 10);
  const blindCardH = 14.5 + blindLines.length * 4 + 3.5;

  pdf.setFillColor(246, 247, 253);
  pdf.setDrawColor(199, 210, 254);
  pdf.setLineWidth(0.35);
  pdf.roundedRect(marginX, y2, contentW, blindCardH, 3, 3, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.5);
  pdf.setTextColor(30, 41, 59);
  pdf.text('Pesan dari Ruang Sepi di Hatimu (Ruang Bertumbuh)', marginX + 5, y2 + 6.2);

  pdf.setFontSize(8);
  pdf.setTextColor(67, 56, 202);
  pdf.text(
    `${cleanPdfText(lowest.name)} · ${lowest.matchPercentage}%`,
    pageW - marginX - 5,
    y2 + 6.2,
    { align: 'right' }
  );

  pdf.setDrawColor(224, 231, 255);
  pdf.line(marginX + 5, y2 + 8.5, pageW - marginX - 5, y2 + 8.5);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.6);
  pdf.setTextColor(51, 65, 85);
  pdf.text(blindLines, marginX + 5, y2 + 13.2);

  y2 += blindCardH + 5;

  // --- 2. Full 11-Profile Table ---
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.8);
  pdf.setTextColor(30, 41, 59);
  pdf.text('TABEL REKAPITULASI 11 PROFIL UMMUL MUKMININ', marginX, y2 + 3);
  pdf.setFontSize(7);
  pdf.setTextColor(148, 163, 184);
  pdf.text('URUTAN TERTINGGI KE TERENDAH', pageW - marginX, y2 + 3, { align: 'right' });

  y2 += 5;

  const tableHeaderH = 6.5;
  const rowH = 9.4;
  const tableTotalH = tableHeaderH + scores.length * rowH;

  pdf.setFillColor(255, 255, 255);
  pdf.setDrawColor(226, 232, 240);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(marginX, y2, contentW, tableTotalH, 2.5, 2.5, 'FD');

  // Table header background
  pdf.setFillColor(241, 245, 249);
  pdf.rect(marginX + 0.2, y2 + 0.2, contentW - 0.4, tableHeaderH, 'F');

  const colRankX = marginX + 4;
  const colNameX = marginX + 11;
  const colStatusX = marginX + 101;
  const colBarX = marginX + 134;
  const colBarW = 31;
  const colScoreX = pageW - marginX - 3.5;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7);
  pdf.setTextColor(71, 85, 105);
  pdf.text('#', colRankX, y2 + 4.4, { align: 'center' });
  pdf.text('FIGUR UMMUL MUKMININ', colNameX, y2 + 4.4);
  pdf.text('STATUS', colStatusX, y2 + 4.4);
  pdf.text('DISTRIBUSI', colBarX, y2 + 4.4);
  pdf.text('SKOR', colScoreX, y2 + 4.4, { align: 'right' });

  scores.forEach((item, idx) => {
    const arch = ARCHETYPE_MAP[item.id];
    const rowY = y2 + tableHeaderH + idx * rowH;
    const isPrimary = primary.id === item.id;
    const isSecondary = secondary?.id === item.id;
    const isLowest = lowest.id === item.id;
    const [aR, aG, aB] = hexToRgb(arch.hex);

    if (isPrimary) {
      pdf.setFillColor(236, 253, 245);
      pdf.rect(marginX + 0.2, rowY, contentW - 0.4, rowH, 'F');
    } else if (isSecondary) {
      pdf.setFillColor(255, 251, 235);
      pdf.rect(marginX + 0.2, rowY, contentW - 0.4, rowH, 'F');
    } else if (idx % 2 === 1) {
      pdf.setFillColor(248, 250, 252);
      pdf.rect(marginX + 0.2, rowY, contentW - 0.4, rowH, 'F');
    }

    // Subtle row separator
    pdf.setDrawColor(241, 245, 249);
    pdf.setLineWidth(0.2);
    pdf.line(marginX, rowY, pageW - marginX, rowY);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(148, 163, 184);
    pdf.text(`${idx + 1}`, colRankX, rowY + 5.6, { align: 'center' });

    pdf.setFont('helvetica', isPrimary ? 'bold' : 'normal');
    pdf.setFontSize(8.2);
    pdf.setTextColor(15, 23, 42);
    pdf.text(cleanPdfText(arch.name), colNameX, rowY + 4.1);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.7);
    pdf.setTextColor(100, 116, 139);
    pdf.text(cleanPdfText(arch.epithet), colNameX, rowY + 7.6);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7.2);
    if (isPrimary) {
      pdf.setTextColor(6, 95, 70);
      pdf.text('Resonansi Utama', colStatusX, rowY + 5.6);
    } else if (isSecondary) {
      pdf.setTextColor(180, 83, 9);
      pdf.text('Sifat Pendamping', colStatusX, rowY + 5.6);
    } else if (isLowest) {
      pdf.setTextColor(67, 56, 202);
      pdf.text('Ruang Bertumbuh', colStatusX, rowY + 5.6);
    } else {
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(148, 163, 184);
      pdf.text('Dimensi Pendukung', colStatusX, rowY + 5.6);
    }

    // Vector mini progress bar
    const miniBarY = rowY + 4.2;
    pdf.setFillColor(226, 232, 240);
    pdf.roundedRect(colBarX, miniBarY, colBarW, 1.8, 0.9, 0.9, 'F');
    pdf.setFillColor(aR, aG, aB);
    const w = Math.max(1.5, (colBarW * item.matchPercentage) / 100);
    pdf.roundedRect(colBarX, miniBarY, w, 1.8, 0.9, 0.9, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.2);
    pdf.setTextColor(aR, aG, aB);
    pdf.text(`${item.matchPercentage}%`, colScoreX, rowY + 5.6, { align: 'right' });
  });

  // Re-stroke outer table border cleanly
  pdf.setDrawColor(226, 232, 240);
  pdf.setLineWidth(0.3);
  pdf.roundedRect(marginX, y2, contentW, tableTotalH, 2.5, 2.5, 'S');

  y2 += tableTotalH + 5.5;

  // --- 3. Daily Micro-Habits (3-column grid) ---
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.8);
  pdf.setTextColor(30, 41, 59);
  pdf.text('REKOMENDASI AKSI PRAKTIS (DAILY MICRO-HABITS)', marginX, y2 + 3);
  pdf.setFontSize(7);
  pdf.setTextColor(148, 163, 184);
  pdf.text('3 PRAKTIK KESEHARIAN INTEGRASI DIRI', pageW - marginX, y2 + 3, { align: 'right' });

  y2 += 5;

  const habitGap = 3.5;
  const habitColW = (contentW - habitGap * 2) / 3;
  const habitInnerW = habitColW - 7;

  const measuredHabits = practices.map((item, idx) => {
    pdf.setFont('times', 'bold');
    pdf.setFontSize(9.2);
    const titleLines = pdf.splitTextToSize(cleanPdfText(item.title), habitInnerW);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.8);
    const habitLines = pdf.splitTextToSize(cleanPdfText(item.habit), habitInnerW);

    const h = 10 + titleLines.length * 4 + 1.5 + habitLines.length * 3.4 + 4;
    return {
      item,
      idx,
      titleLines,
      habitLines,
      h,
      done: completedHabits.includes(idx),
    };
  });

  const maxHabitAvail = pageH - 36 - y2;
  const habitCardH = Math.min(maxHabitAvail, Math.max(...measuredHabits.map((m) => m.h)));

  measuredHabits.forEach((m, i) => {
    const hx = marginX + i * (habitColW + habitGap);
    if (m.done) {
      pdf.setFillColor(236, 253, 245);
      pdf.setDrawColor(167, 243, 208);
    } else {
      pdf.setFillColor(248, 250, 252);
      pdf.setDrawColor(226, 232, 240);
    }
    pdf.setLineWidth(0.3);
    pdf.roundedRect(hx, y2, habitColW, habitCardH, 2.5, 2.5, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(6.8);
    pdf.setTextColor(pR, pG, pB);
    pdf.text(`0${i + 1} · ${cleanPdfText(m.item.tag).toUpperCase()}`, hx + 3.5, y2 + 5.5);

    if (m.done) {
      pdf.setTextColor(5, 150, 105);
      pdf.text('DITANDAI', hx + habitColW - 3.5, y2 + 5.5, { align: 'right' });
    }

    let hy = y2 + 9.8;
    pdf.setFont('times', 'bold');
    pdf.setFontSize(9.2);
    pdf.setTextColor(15, 23, 42);
    pdf.text(m.titleLines, hx + 3.5, hy);
    hy += m.titleLines.length * 4 + 1.2;

    const maxLines = Math.max(2, Math.floor((y2 + habitCardH - 2.5 - hy) / 3.4));
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.8);
    pdf.setTextColor(71, 85, 105);
    pdf.text(m.habitLines.slice(0, maxLines), hx + 3.5, hy);
  });

  // --- 4. Methodology Note (with true italic "muhasabah") ---
  const methodY = pageH - 33.5;
  const methodH = 16;
  pdf.setFillColor(248, 250, 252);
  pdf.setDrawColor(226, 232, 240);
  pdf.roundedRect(marginX, methodY, contentW, methodH, 2.5, 2.5, 'FD');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7);
  pdf.setTextColor(71, 85, 105);
  pdf.text('LANDASAN METODOLOGI & PETUNJUK PENGGUNAAN', marginX + 4, methodY + 5);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.6);
  pdf.setTextColor(100, 116, 139);
  pdf.text(
    'Asesmen ini dikembangkan oleh HealYou melalui sintesis historiografi Sirah Nabawiyah dan kerangka psikologi kepribadian kontemporer.',
    marginX + 4,
    methodY + 9.5
  );

  // Second line with properly italicized "muhasabah"
  const part1 = 'Hasil ini bukan pelabelan kaku, melainkan sarana refleksi diri (';
  const part2 = 'muhasabah';
  const part3 = ') dan peta pertumbuhan menuju pribadi yang tenang dan utuh.';
  const line2Y = methodY + 13.2;

  pdf.text(part1, marginX + 4, line2Y);
  const w1 = pdf.getTextWidth(part1);
  pdf.setFont('helvetica', 'italic');
  pdf.text(part2, marginX + 4 + w1, line2Y);
  const w2 = pdf.getTextWidth(part2);
  pdf.setFont('helvetica', 'normal');
  pdf.text(part3, marginX + 4 + w1 + w2, line2Y);

  drawFooter(2, 'Rekapitulasi & Peta Pertumbuhan');

  // Output as Blob for fast, safe download across desktop & iOS/Android
  const blob = pdf.output('blob');
  const filename = `Rapor_Karakter_${sanitizeFilenameSegment(primary.name)}.pdf`;
  downloadBlob(blob, filename);

  return { filename, sizeBytes: blob.size };
}
