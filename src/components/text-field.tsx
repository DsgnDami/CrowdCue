import { Image } from 'expo-image';
import { forwardRef, type ReactNode } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type TextStyle,
} from 'react-native';

import { colors, fonts } from '@/constants/theme';

type Props = TextInputProps & {
  /** 20×20 leading icon, e.g. <MailIcon />. */
  icon: ReactNode;
  /** Rendered at the right end of the field, e.g. a "Forgot password?" link. */
  accessory?: ReactNode;
  /** Dimmer text after the placeholder, e.g. "(optional)". */
  placeholderHint?: string;
};

/** Underlined text field with a leading icon, as used on the auth screens. */
export const TextField = forwardRef<TextInput, Props>(function TextField(
  { icon, accessory, placeholderHint, placeholder, style, ...inputProps },
  ref,
) {
  // A native placeholder is single-colour, so a two-tone one is drawn as an
  // overlay that hides once there's text.
  const customPlaceholder = placeholderHint !== undefined;
  const showCustomPlaceholder = customPlaceholder && !inputProps.value;

  return (
    <View style={styles.field}>
      <View style={styles.row}>
        {icon}
        <View style={styles.inputWrap}>
          <TextInput
            ref={ref}
            placeholder={customPlaceholder ? undefined : placeholder}
            aria-label={customPlaceholder ? `${placeholder} ${placeholderHint}` : undefined}
            placeholderTextColor={colors.textMuted}
            selectionColor={colors.white}
            style={[styles.input, style]}
            {...inputProps}
          />
          {showCustomPlaceholder && (
            <Text style={[styles.input, styles.placeholder]} pointerEvents="none" numberOfLines={1}>
              {placeholder} <Text style={styles.placeholderHint}>{placeholderHint}</Text>
            </Text>
          )}
        </View>
        {accessory}
      </View>
      <Image
        source={require('../../assets/images/divider.svg')}
        style={styles.divider}
        contentFit="fill"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  // Fixed at 30pt as in Figma: the 20pt icon row plus spacing overflows it
  // slightly, so the divider sits just below the field's layout box.
  field: {
    width: '100%',
    height: 30,
    overflow: 'visible',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputWrap: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  input: {
    padding: 0,
    fontFamily: fonts.medium,
    fontSize: 16,
    letterSpacing: 0.48,
    color: colors.white,
    // The underline is the focus affordance; drop the browser focus ring on web.
    // RN's types don't include 'none', but react-native-web passes it through.
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as unknown as TextStyle) : null),
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    right: 0,
    color: colors.textMuted,
  },
  placeholderHint: {
    color: '#2b2c2d',
  },
  divider: {
    width: '100%',
    height: 1,
    marginTop: 11,
  },
});
