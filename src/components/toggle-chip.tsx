import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fonts } from '@/constants/theme';

type Props = {
  label: string;
  selected: boolean;
  onToggle: () => void;
};

/** Pill toggle: solid when on, dashed outline when off. */
export function ToggleChip({ label, selected, onToggle }: Props) {
  return (
    <Pressable
      onPress={onToggle}
      role="checkbox"
      aria-checked={selected}
      aria-label={label}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.selected : styles.unselected,
        pressed && styles.pressed,
      ]}
    >
      <Image
        source={
          selected
            ? require('../../assets/images/icon-check-on.svg')
            : require('../../assets/images/icon-check-off.svg')
        }
        style={styles.icon}
      />
      <Text style={[styles.label, !selected && styles.labelOff]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    // Figma: 24/16 padding, minus the 1pt border.
    paddingHorizontal: 23,
    paddingVertical: 15,
    borderRadius: 48,
    borderWidth: 1,
  },
  selected: {
    borderColor: '#737577',
    backgroundColor: 'rgba(75, 75, 75, 0.64)',
  },
  unselected: {
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  pressed: {
    opacity: 0.8,
  },
  icon: {
    width: 16,
    height: 16,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    letterSpacing: 0.42,
    color: colors.white,
    textAlign: 'center',
  },
  labelOff: {
    color: colors.textOnLight,
  },
});
