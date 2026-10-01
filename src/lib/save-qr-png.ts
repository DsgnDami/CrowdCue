import { File, Paths } from 'expo-file-system';
import { Asset, requestPermissionsAsync } from 'expo-media-library';

/** Exported PNG edge length, large enough to print crisply. */
const EXPORT_SIZE = 1024;

export type SaveResult = 'saved' | 'downloaded' | 'denied';

type NativeSvg = {
  toDataURL: (callback: (base64: string) => void, options?: { width: number; height: number }) => void;
};

/**
 * Saves the QR code as a PNG to Photos (iOS/Android). The web version, in
 * save-qr-png.web.ts, downloads a file instead.
 *
 * @param svg The ref from <JoinQrCode getRef>.
 * @param _webContainerId Only used on web.
 */
export async function saveQrPng(
  svg: unknown,
  _webContainerId: string,
  fileName: string,
): Promise<SaveResult> {
  const permission = await requestPermissionsAsync(true);
  if (!permission.granted) return 'denied';

  const base64 = await new Promise<string>((resolve) =>
    (svg as NativeSvg).toDataURL(resolve, { width: EXPORT_SIZE, height: EXPORT_SIZE }),
  );
  const file = new File(Paths.cache, fileName);
  if (file.exists) file.delete();
  file.create();
  file.write(base64, { encoding: 'base64' });
  await Asset.create(file.uri);
  return 'saved';
}
