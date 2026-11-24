import {
  BLIND_SPOT_DATA,
  INTENSITY_DATA,
  MODERN_RELEVANCE,
} from '../data/insights';
import type { AssessmentResult } from '../types';
import {
  drawRoundedRectPath,
  hexWithAlpha,
  loadImage,
  sanitizeFilenameSegment,
} from './imageHelpers';

export type PosterFormat = 'portrait' | 'story';

export interface GeneratedPoster {
  blob: Blob;
  previewUrl: string;
  filename: string;
  width: number;
  height: number;
  sizeBytes: number;
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function drawCircularImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | null,
  cx: number,
  cy: number,
  radius: number,
  accentHex: string,
  ringWidth = 8
): void {
  const innerR = radius - ringWidth;

  // Soft outer glow halo
  const halo = ctx.createRadialGradient(cx, cy, innerR * 0.8, cx, cy, radius + 24);
  halo.addColorStop(0, hexWithAlpha(accentHex, 0.16));
  halo.addColorStop(1, hexWithAlpha(accentHex, 0));
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(cx, cy, radius + 24, 0, Math.PI * 2);
  ctx.fill();

  // White backing + circular clip
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.clip();

  if (img) {
    const aspect = img.naturalWidth / Math.max(1, img.naturalHeight);
    const dia = innerR * 2;
    let dw = dia;
    let dh = dia;
    let dx = cx - innerR;
    let dy = cy - innerR;

    if (aspect > 1) {
      dw = dia * aspect;
      dx = cx - dw / 2;
    } else {
      dh = dia / aspect;
      dy = cy - dh / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);
  } else {
    ctx.fillStyle = hexWithAlpha(accentHex, 0.14);
    ctx.fillRect(cx - innerR, cy - innerR, innerR * 2, innerR * 2);
  }
  ctx.restore();

  // Accent ring
  ctx.beginPath();
  ctx.arc(cx, cy, radius - ringWidth / 2, 0, Math.PI * 2);
  ctx.lineWidth = ringWidth;
  ctx.strokeStyle = hexWithAlpha(accentHex, 0.36);
  ctx.stroke();
}

/**
 * Pure HTML5 Canvas 2D HD Poster Renderer (1080px wide).
 * Eliminates DOM cloning, SVG foreignObject font/image bugs on iOS Safari,
 * and dynamically computes exact vertical metrics so zero text ever clips.
 */
export async function generatePosterImage(
  result: AssessmentResult,
  userName: string,
  format: PosterFormat = 'portrait'
): Promise<GeneratedPoster> {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const { primary, secondary, lowest } = result;
  const isHighIntensity = primary.matchPercentage >= 85;
  const intensityText = isHighIntensity
    ? INTENSITY_DATA[primary.id].high
    : INTENSITY_DATA[primary.id].mod;
  const validationText = MODERN_RELEVANCE[primary.id].validation;
  const blindSpotText = BLIND_SPOT_DATA[lowest.id];
  const dateStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const [primaryImg, secondaryImg, logoImg] = await Promise.all([
    loadImage(`/avatars/${primary.id}.webp`),
    secondary ? loadImage(`/avatars/${secondary.id}.webp`) : Promise.resolve(null),
    loadImage('/logo-healyou.webp'),
  ]);

  const width = 1080;
  const padX = 76;
  const contentW = width - padX * 2; // 928px
  const cardPad = 36;
  const cardInnerW = contentW - cardPad * 2; // 856px
  const isStory = format === 'story';

  // Temporary measurement context
  const measureCanvas = document.createElement('canvas');
  const mCtx = measureCanvas.getContext('2d')!;

  const serif = '"Playfair Display", Georgia, serif';
  const sans = '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif';

  // Measure dynamic text blocks
  mCtx.font = `700 54px ${serif}`;
  const nameLines = wrapCanvasText(mCtx, primary.name, contentW - 40);

  mCtx.font = `600 22px ${sans}`;
  const epithetLines = wrapCanvasText(
    mCtx,
    `${primary.epithet}  ·  ${primary.matchPercentage}% Kesesuaian`,
    contentW - 40
  );

  mCtx.font = `500 26px ${sans}`;
  const summaryLines = wrapCanvasText(mCtx, `"${primary.shortSummary}"`, contentW - 60);

  mCtx.font = `italic 500 24px ${serif}`;
  const validationLines = wrapCanvasText(mCtx, validationText, contentW - 80);

  mCtx.font = `500 24px ${sans}`;
  const intensityLines = wrapCanvasText(mCtx, intensityText, cardInnerW);
  const intensityCardH = 84 + intensityLines.length * 36 + 24;

  let secondaryCardH = 0;
  let secEpithetLines: string[] = [];
  if (secondary) {
    mCtx.font = `500 22px ${sans}`;
    secEpithetLines = wrapCanvasText(mCtx, secondary.epithet, cardInnerW - 130);
    secondaryCardH = Math.max(144, 92 + secEpithetLines.length * 30 + 26);
  }

  mCtx.font = `500 24px ${sans}`;
  const blindLines = wrapCanvasText(mCtx, `"${blindSpotText}"`, cardInnerW);
  const blindCardH = 88 + blindLines.length * 36 + 26;

  // Compute total height
  const headerH = isStory ? 116 : 96;
  const avatarSectionH = isStory ? 300 : 272;
  const heroTextH =
    epithetLines.length * 32 +
    20 +
    36 + // userName subtitle
    nameLines.length * 66 +
    22 +
    summaryLines.length * 38 +
    (isStory ? 22 + validationLines.length * 34 : 0);

  const cardsGap = isStory ? 28 : 22;
  const cardsTotalH =
    intensityCardH +
    (secondary ? cardsGap + secondaryCardH : 0) +
    cardsGap +
    blindCardH;

  const footerH = 112;
  const computedH =
    (isStory ? 90 : 56) +
    headerH +
    avatarSectionH +
    heroTextH +
    (isStory ? 44 : 34) +
    cardsTotalH +
    (isStory ? 44 : 34) +
    footerH +
    (isStory ? 60 : 40);

  const height = isStory ? Math.max(1920, computedH) : Math.max(1350, computedH);

  // Final HD canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  // 1. Background canvas + soft radial atmospheric accents
  ctx.fillStyle = '#FDFDFE';
  ctx.fillRect(0, 0, width, height);

  const topGrad = ctx.createRadialGradient(width - 60, 80, 40, width - 60, 80, 520);
  topGrad.addColorStop(0, hexWithAlpha(primary.hex, 0.11));
  topGrad.addColorStop(1, hexWithAlpha(primary.hex, 0));
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, width, height);

  const botAccent = secondary ? secondary.hex : primary.hex;
  const botGrad = ctx.createRadialGradient(80, height - 120, 40, 80, height - 120, 520);
  botGrad.addColorStop(0, hexWithAlpha(botAccent, 0.1));
  botGrad.addColorStop(1, hexWithAlpha(botAccent, 0));
  ctx.fillStyle = botGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle editorial outer frame
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  drawRoundedRectPath(ctx, 26, 26, width - 52, height - 52, 36);
  ctx.stroke();

  // Top accent bar inside frame
  ctx.save();
  drawRoundedRectPath(ctx, 26, 26, width - 52, height - 52, 36);
  ctx.clip();
  ctx.fillStyle = primary.hex;
  ctx.fillRect(26, 26, width - 52, 10);
  ctx.restore();

  // Extra vertical breathing room for exact 1920px Story balance
  const extraSpace = Math.max(0, height - computedH);
  let y = (isStory ? 84 : 64) + Math.round(extraSpace * 0.2);

  // 2. Header row
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.font = `700 20px ${sans}`;
  ctx.fillStyle = '#5E5B80';
  ctx.fillText('HEALYOU  ·  ASESMEN UMMUL MUKMININ', padX, y + 18);

  ctx.textAlign = 'right';
  ctx.font = `600 19px ${sans}`;
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(dateStr.toUpperCase(), width - padX, y + 18);

  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padX, y + 48);
  ctx.lineTo(width - padX, y + 48);
  ctx.stroke();

  y += headerH;

  // 3. Avatar
  const avatarR = isStory ? 128 : 116;
  const avatarCy = y + avatarR + 6;
  drawCircularImage(ctx, primaryImg, width / 2, avatarCy, avatarR, primary.hex, 9);
  y = avatarCy + avatarR + (isStory ? 44 : 34);

  // 4. Epithet + Score
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.font = `700 22px ${sans}`;
  ctx.fillStyle = primary.hex;
  epithetLines.forEach((line) => {
    ctx.fillText(line, width / 2, y);
    y += 32;
  });

  y += 14;

  // 5. User Subtitle
  ctx.font = `italic 500 25px ${serif}`;
  ctx.fillStyle = '#64748B';
  ctx.fillText(
    userName ? `Catatan refleksi ${userName}` : 'Catatan Refleksi Diri',
    width / 2,
    y
  );
  y += 38;

  // 6. Archetype Name
  ctx.font = `700 54px ${serif}`;
  ctx.fillStyle = primary.hex;
  nameLines.forEach((line) => {
    ctx.fillText(line, width / 2, y);
    y += 66;
  });

  y += 16;

  // 7. Short Summary
  ctx.font = `500 26px ${sans}`;
  ctx.fillStyle = '#475569';
  summaryLines.forEach((line) => {
    ctx.fillText(line, width / 2, y);
    y += 38;
  });

  // 8. Validation quote on Story format
  if (isStory) {
    y += 18;
    ctx.font = `italic 500 24px ${serif}`;
    ctx.fillStyle = primary.hex;
    validationLines.forEach((line) => {
      ctx.fillText(line, width / 2, y);
      y += 34;
    });
  }

  y += (isStory ? 40 : 32) + Math.round(extraSpace * 0.3);

  // 9. Intensity Card
  ctx.fillStyle = '#F8FAFC';
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  drawRoundedRectPath(ctx, padX, y, contentW, intensityCardH, 28);
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.font = `700 18px ${sans}`;
  ctx.fillStyle = '#64748B';
  ctx.fillText('SKALA INTENSITAS KARAKTER', padX + cardPad, y + 32);

  ctx.textAlign = 'right';
  ctx.font = `700 18px ${sans}`;
  ctx.fillStyle = isHighIntensity ? '#B45309' : '#047857';
  ctx.fillText(
    isHighIntensity ? 'Intensitas Tinggi' : 'Intensitas Mengalir',
    width - padX - cardPad,
    y + 32
  );

  // Mini bar inside Intensity card
  const barX = padX + cardPad;
  const barY = y + 62;
  ctx.fillStyle = '#E2E8F0';
  drawRoundedRectPath(ctx, barX, barY, cardInnerW, 8, 4);
  ctx.fill();
  ctx.fillStyle = primary.hex;
  drawRoundedRectPath(
    ctx,
    barX,
    barY,
    Math.max(24, (cardInnerW * primary.matchPercentage) / 100),
    8,
    4
  );
  ctx.fill();

  ctx.textAlign = 'left';
  ctx.font = `500 24px ${sans}`;
  ctx.fillStyle = '#334155';
  let iy = y + 86;
  intensityLines.forEach((line) => {
    ctx.fillText(line, padX + cardPad, iy);
    iy += 36;
  });

  y += intensityCardH + cardsGap;

  // 10. Secondary Character Card (if exists)
  if (secondary) {
    ctx.fillStyle = '#F8FAFC';
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    drawRoundedRectPath(ctx, padX, y, contentW, secondaryCardH, 28);
    ctx.fill();
    ctx.stroke();

    const secR = 46;
    const secCx = padX + cardPad + secR;
    const secCy = y + secondaryCardH / 2;
    drawCircularImage(ctx, secondaryImg, secCx, secCy, secR, secondary.hex, 5);

    const secTextX = secCx + secR + 28;
    ctx.textAlign = 'left';
    ctx.font = `700 17px ${sans}`;
    ctx.fillStyle = '#64748B';
    ctx.fillText('SIFAT PENDAMPING', secTextX, y + 30);

    ctx.textAlign = 'right';
    ctx.font = `700 20px ${sans}`;
    ctx.fillStyle = secondary.hex;
    ctx.fillText(`${secondary.matchPercentage}% Kesesuaian`, width - padX - cardPad, y + 29);

    ctx.textAlign = 'left';
    ctx.font = `700 30px ${serif}`;
    ctx.fillStyle = '#0F172A';
    ctx.fillText(secondary.name, secTextX, y + 58);

    ctx.font = `500 22px ${sans}`;
    ctx.fillStyle = '#64748B';
    let sy = y + 98;
    secEpithetLines.forEach((line) => {
      ctx.fillText(line, secTextX, sy);
      sy += 30;
    });

    y += secondaryCardH + cardsGap;
  }

  // 11. Dark Ruang Bertumbuh Card
  ctx.fillStyle = '#0F172A';
  drawRoundedRectPath(ctx, padX, y, contentW, blindCardH, 28);
  ctx.fill();

  ctx.textAlign = 'left';
  ctx.font = `700 18px ${sans}`;
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(`RUANG BERTUMBUH  ·  ${lowest.name.toUpperCase()}`, padX + cardPad, y + 32);

  ctx.textAlign = 'right';
  ctx.font = `700 19px ${sans}`;
  ctx.fillStyle = '#FCD34D';
  ctx.fillText(`${lowest.matchPercentage}%`, width - padX - cardPad, y + 31);

  ctx.textAlign = 'left';
  ctx.font = `500 24px ${sans}`;
  ctx.fillStyle = '#E2E8F0';
  let by = y + 72;
  blindLines.forEach((line) => {
    ctx.fillText(line, padX + cardPad, by);
    by += 36;
  });

  // 12. Footer pinned near bottom
  const footerY = height - (isStory ? 116 : 96);
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padX, footerY - 22);
  ctx.lineTo(width - padX, footerY - 22);
  ctx.stroke();

  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = `700 22px ${sans}`;
  ctx.fillStyle = '#5E5B80';
  ctx.fillText('Arsitektur Psikologis Ummul Mukminin', padX, footerY);

  ctx.font = `500 18px ${sans}`;
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('Refleksi karakter terinspirasi sirah nabawiyah', padX, footerY + 30);

  // Logo + HealYou wordmark on right
  const logoDia = 52;
  const logoX = width - padX - logoDia;
  if (logoImg) {
    ctx.save();
    drawRoundedRectPath(ctx, logoX, footerY + 2, logoDia, logoDia, 14);
    ctx.clip();
    ctx.drawImage(logoImg, logoX, footerY + 2, logoDia, logoDia);
    ctx.restore();
  }

  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.font = `700 20px ${sans}`;
  ctx.fillStyle = '#5E5B80';
  ctx.fillText('HEALYOU', logoImg ? logoX - 16 : width - padX, footerY + 28);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Gagal menghasilkan gambar poster.'));
      },
      'image/jpeg',
      0.93
    );
  });

  const suffix = format === 'story' ? 'Story' : 'Poster';
  const filename = `HealYou_${suffix}_${sanitizeFilenameSegment(primary.name)}.jpg`;

  return {
    blob,
    previewUrl: URL.createObjectURL(blob),
    filename,
    width,
    height,
    sizeBytes: blob.size,
  };
}

export function canShareImageFile(blob: Blob, filename: string): boolean {
  if (typeof navigator.share !== 'function' || typeof navigator.canShare !== 'function') {
    return false;
  }
  try {
    const file = new File([blob], filename, { type: 'image/jpeg' });
    return navigator.canShare({ files: [file] });
  } catch {
    return false;
  }
}
