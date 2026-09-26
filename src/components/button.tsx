import { Image, type ImageSource } from 'expo-image';
import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, fonts } from '@/constants/theme';

type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
};

type PrimaryButtonProps = ButtonProps & {
  /** Optional leading icon, rendered 6pt before the label. */
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({ label, icon, style, ...pressableProps }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [styles.primary, style, pressed && styles.pressed]}
      {...pressableProps}
    >
      {icon}
      <Text style={styles.primaryLabel}>{label}</Text>
    </Pressable>
  );
}

type OutlineButtonProps = ButtonProps & {
  icon: ImageSource | number;
};

export function OutlineButton({ label, icon, ...pressableProps }: OutlineButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [styles.outline, pressed && styles.pressed]}
      {...pressableProps}
    >
      <Image source={icon} style={styles.outlineIcon} contentFit="contain" />
      <Text style={styles.outlineLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.white,
    boxShadow: 'inset 0px 0px 4px 0px rgba(0, 0, 0, 0.09)',
  },
  primaryLabel: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.textOnLight,
    textAlign: 'center',
  },
  outline: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 40,
    paddingVertical: 8,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: colors.border,
  },
  outlineIcon: {
    width: 24,
    height: 24,
  },
  outlineLabel: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    letterSpacing: 0.42,
    color: colors.textMuted,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});
