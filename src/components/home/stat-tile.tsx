import { Image, type ImageSource } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { fonts } from '@/constants/theme';

// Note: no key is called `value`. Reanimated's Babel plugin treats any
// `x.value` in an inline style as a shared value and adds a runtime check
// that crashes in Expo Go.
export type StatPalette = {
  border: string;
  fill: string;
  glow: string;
  /** Colour of the big number. */
  number: string;
  label: string;
};

/** Tinted palettes from the home stat tiles (Figma node 264:792). */
export const statPalettes = {
  blue: {
    border: '#011858',
    fill: 'rgba(0, 8, 30, 0.43)',
    glow: 'rgba(2, 36, 128, 0.41)',
    number: '#7a98f6',
    label: '#5976d2',
  },
  pink: {
    border: '#340036',
    fill: 'rgba(30, 0, 31, 0.38)',
    glow: 'rgba(69, 0, 71, 0.5)',
    number: '#e761ec',
    label: '#c76bca',
  },
  purple: {
    border: '#2a0153',
    fill: 'rgba(30, 2, 58, 0.19)',
    glow: 'rgba(62, 1, 122, 0.41)',
    number: '#a552f6',
    label: '#a062dd',
  },
} satisfies Record<string, StatPalette>;

type Props = {
  icon: ImageSource | number;
  value: string;
  label: string;
  palette: StatPalette;
};

export function StatTile({ icon, value, label, palette }: Props) {
  return (
    <View
      style={[
        styles.tile,
        {
          borderColor: palette.border,
          backgroundColor: palette.fill,
          boxShadow: `inset 0px 0px 20px 6px ${palette.glow}`,
        },
      ]}
      accessible
      aria-label={`${value} ${label}`}
    >
      <Image source={icon} style={styles.icon} />
      <View style={styles.text}>
        <Text style={[styles.value, { color: palette.number }]}>{value}</Text>
        <Text style={[styles.label, { color: palette.label }]}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Figma: 20pt padding, minus the 1pt border.
  tile: {
    flex: 1,
    gap: 24,
    padding: 19,
    borderRadius: 32,
    borderWidth: 1,
    overflow: 'hidden',
  },
  icon: {
    width: 32,
    height: 32,
  },
  text: {
    gap: 4,
  },
  value: {
    fontFamily: fonts.medium,
    fontSize: 24,
    letterSpacing: 0.72,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 12,
  },
});
