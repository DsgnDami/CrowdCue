import { Image, type ImageSource } from 'expo-image';
import type { TabTriggerSlotProps } from 'expo-router/ui';
import { forwardRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = TabTriggerSlotProps & {
  icon: ImageSource | number;
  iconHeight?: number;
  label: string;
};

/** A button in the floating tab bar. The focused tab sits on a raised pill. */
export const TabBarButton = forwardRef<View, Props>(function TabBarButton(
  { icon, iconHeight = 24, label, isFocused, ...props },
  ref,
) {
  return (
    <Pressable
      ref={ref}
      {...props}
      role="tab"
      aria-label={label}
      aria-selected={!!isFocused}
      style={[styles.button, isFocused && styles.focused]}
    >
      <Image source={icon} style={{ width: 24, height: iconHeight }} contentFit="contain" />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  button: {
    width: 88,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 48,
  },
  focused: {
    height: 48.5,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(30, 30, 31, 0.52)',
    backgroundColor: '#101111',
  },
});
