import type { SaveResult } from './save-qr-png';

/** Exported PNG edge length, large enough to print crisply. */
const EXPORT_SIZE = 1024;

/**
 * Web version of saveQrPng: downloads the QR code as a PNG file. Kept separate
 * so expo-media-library, which has no web support, is never loaded on web.
 *
 * @param _svg Only used on iOS/Android.
 * @param webContainerId `nativeID` of a View wrapping the code, used to find
 *   the rendered <svg> element.
 */
export async function saveQrPng(
  _svg: unknown,
  webContainerId: string,
  fileName: string,
): Promise<SaveResult> {
  await downloadOnWeb(webContainerId, fileName);
  return 'downloaded';
}

/** Draws the rendered <svg> onto a canvas and downloads it as a PNG. */
async function downloadOnWeb(containerId: string, fileName: string) {
  const svgEl = document.getElementById(containerId)?.querySelector('svg');
  if (!svgEl) throw new Error('QR code not rendered');

  const markup = new XMLSerializer().serializeToString(svgEl);
  const image = new window.Image();
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`;
  await image.decode();

  const canvas = document.createElement('canvas');
  canvas.width = EXPORT_SIZE;
  canvas.height = EXPORT_SIZE;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas not available');
  context.imageSmoothingEnabled = false;
  context.drawImage(image, 0, 0, EXPORT_SIZE, EXPORT_SIZE);

  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = fileName;
  link.click();
}
