import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '@/constants/theme';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * Frosted card with a faint border and inner glow. Figma measures padding from
 * the outer edge, so subtract the 1pt border when setting padding.
 */
export function GlassCard({ children, style }: Props) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 48,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cardFill,
    boxShadow: 'inset 0px 0px 20px 6px rgba(241, 241, 241, 0.04)',
    overflow: 'hidden',
  },
});
