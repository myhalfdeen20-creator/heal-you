export function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Renders a local WebP/JPG avatar onto an offscreen canvas clipped to a crisp circle
 * with an accent border, returning a transparent PNG data URL compatible with jsPDF.
 */
export async function createCircularAvatarPng(
  src: string,
  accentHex: string,
  sizePx = 280
): Promise<string | null> {
  const img = await loadImage(src);
  if (!img) return null;

  const canvas = document.createElement('canvas');
  canvas.width = sizePx;
  canvas.height = sizePx;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const radius = sizePx / 2;
  const ringWidth = Math.max(4, Math.round(sizePx * 0.032));
  const innerRadius = radius - ringWidth;

  // Soft tinted fill behind avatar
  ctx.save();
  ctx.beginPath();
  ctx.arc(radius, radius, innerRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.clip();

  // Center-crop cover draw
  const imgAspect = img.naturalWidth / Math.max(1, img.naturalHeight);
  const diameter = innerRadius * 2;
  let drawW = diameter;
  let drawH = diameter;
  let offsetX = ringWidth;
  let offsetY = ringWidth;

  if (imgAspect > 1) {
    drawW = diameter * imgAspect;
    offsetX = radius - drawW / 2;
  } else {
    drawH = diameter / imgAspect;
    offsetY = radius - drawH / 2;
  }
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  ctx.restore();

  // Crisp accent border ring
  ctx.beginPath();
  ctx.arc(radius, radius, radius - ringWidth / 2, 0, Math.PI * 2);
  ctx.lineWidth = ringWidth;
  ctx.strokeStyle = hexWithAlpha(accentHex, 0.35);
  ctx.stroke();

  return canvas.toDataURL('image/png');
}

/**
 * Converts a local WebP logo into a rounded-square PNG data URL for jsPDF.
 */
export async function createRoundedLogoPng(
  src: string,
  sizePx = 128
): Promise<string | null> {
  const img = await loadImage(src);
  if (!img) return null;

  const canvas = document.createElement('canvas');
  canvas.width = sizePx;
  canvas.height = sizePx;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const r = Math.round(sizePx * 0.22);
  drawRoundedRectPath(ctx, 2, 2, sizePx - 4, sizePx - 4, r);
  ctx.save();
  ctx.clip();
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, sizePx, sizePx);
  ctx.drawImage(img, 4, 4, sizePx - 8, sizePx - 8);
  ctx.restore();

  drawRoundedRectPath(ctx, 2, 2, sizePx - 4, sizePx - 4, r);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#E2E8F0';
  ctx.stroke();

  return canvas.toDataURL('image/png');
}

export function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '').trim();
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return [94, 91, 128];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function hexWithAlpha(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function mixWithWhite(hex: string, whiteRatio: number): [number, number, number] {
  const [r, g, b] = hexToRgb(hex);
  const w = Math.max(0, Math.min(1, whiteRatio));
  return [
    Math.round(r + (255 - r) * w),
    Math.round(g + (255 - g) * w),
    Math.round(b + (255 - b) * w),
  ];
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Delay revoke slightly so mobile Safari finishes initiating download
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function sanitizeFilenameSegment(raw: string): string {
  return raw
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 48);
}
