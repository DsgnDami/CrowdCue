import { useId } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { colors } from '@/constants/theme';

/**
 * Radial vignette that fades whatever is behind it into the background colour
 * towards its edges (Figma: clear to 55%, 70% at 85%, solid at 100%).
 * Fills its parent.
 */
export function Vignette() {
  // Unique per instance so two vignettes on web don't share a gradient id.
  const id = `vignette-${useId().replace(/:/g, '')}`;
  return (
    <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
      <Defs>
        <RadialGradient id={id} cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={colors.background} stopOpacity={0} />
          <Stop offset="0.55" stopColor={colors.background} stopOpacity={0} />
          <Stop offset="0.85" stopColor={colors.background} stopOpacity={0.7} />
          <Stop offset="1" stopColor={colors.background} stopOpacity={1} />
        </RadialGradient>
      </Defs>
      <Rect width="100%" height="100%" fill={`url(#${id})`} />
    </Svg>
  );
}
