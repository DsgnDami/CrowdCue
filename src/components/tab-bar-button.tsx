import { Image, type ImageSource } from 'expo-image';
import { router, type Href } from 'expo-router';
import type { TabTriggerSlotProps } from 'expo-router/ui';
import { forwardRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = TabTriggerSlotProps & {
  /** Solid white icon for the selected tab. */
  activeIcon: ImageSource | number;
  /** Faint "glass" outline icon for the other tabs. */
  icon: ImageSource | number;
  iconHeight?: number;
  label: string;
};

/** A button in the floating tab bar. The focused tab sits on a raised pill. */
export const TabBarButton = forwardRef<View, Props>(function TabBarButton(
  { activeIcon, icon, iconHeight = 24, label, isFocused, href, onPress, ...props },
  ref,
) {
  // Re-tapping the selected tab returns to its first screen, e.g. from the
  // live dashboard back to Home. Otherwise switch tabs as usual.
  const handlePress: typeof onPress = (event) => {
    if (isFocused && href && router.canDismiss()) {
      // On web the tab is a link; stop the browser following it.
      event.preventDefault();
      router.dismissTo(href as Href);
      return;
    }
    onPress?.(event);
  };

  return (
    <Pressable
      ref={ref}
      {...props}
      // Not in RN's types; react-native-web renders the tab as a real link.
      {...{ href }}
      onPress={handlePress}
      role="tab"
      aria-label={label}
      aria-selected={!!isFocused}
      style={[styles.button, isFocused && styles.focused]}
    >
      {/* Both icons stay mounted and only one is shown, so switching tabs
          never waits on (or cross-fades between) image loads. */}
      <View style={{ width: 24, height: iconHeight }}>
        <Image
          source={icon}
          style={[StyleSheet.absoluteFill, isFocused && styles.hidden]}
          contentFit="contain"
        />
        <Image
          source={activeIcon}
          style={[StyleSheet.absoluteFill, !isFocused && styles.hidden]}
          contentFit="contain"
        />
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  hidden: {
    opacity: 0,
  },
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
