import { useId } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { colors } from '@/constants/theme';

/**
 * Fades scrolling content out behind the floating tab bar (Figma: 108pt tall
 * at y=781). Figma also blurs this layer by 30pt, which React Native can't do
 * without extra native code.
 */
export function BottomFade() {
  // Unique per instance so two fades on web don't share a gradient id.
  const id = `bottom-fade-${useId().replace(/:/g, '')}`;
  return (
    <Svg style={styles.fade} width="100%" height="108" pointerEvents="none">
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0.0179" stopColor={colors.tileFill} stopOpacity={0} />
          <Stop offset="0.40741" stopColor={colors.tileFill} stopOpacity={1} />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill={`url(#${id})`} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -37,
  },
});
