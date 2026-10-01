import QRCode from 'react-native-qrcode-svg';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/theme';

type Props = {
  /** The URL the code opens, e.g. https://crowdcue.app/j/PROPANE. */
  value: string;
  size: number;
  /** Receives the underlying SVG so the code can be exported as a PNG. */
  getRef?: (svg: unknown) => void;
};

/**
 * Scannable QR code for a session's join link, styled like the design's
 * rounded white code. Dark modules on white with a slim quiet zone, so phone
 * cameras read it reliably against the dark app background.
 */
export function JoinQrCode({ value, size, getRef }: Props) {
  const quietZone = Math.round(size * 0.05);
  return (
    <View
      style={[styles.frame, { width: size, height: size, borderRadius: Math.round(size * 0.04) }]}
      role="img"
      aria-label={`QR code for ${value}`}
    >
      <QRCode
        value={value}
        size={size - quietZone * 2}
        quietZone={quietZone}
        color={colors.background}
        backgroundColor={colors.white}
        ecl="M"
        getRef={getRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
});
