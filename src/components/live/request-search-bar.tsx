import { Image } from 'expo-image';
import { Platform, Pressable, StyleSheet, TextInput, View, type TextStyle } from 'react-native';

import { colors, fonts } from '@/constants/theme';

type Props = {
  value: string;
  onChange: (query: string) => void;
  onClose: () => void;
};

/** Replaces the filter chips while searching (Figma node 300:6484). */
export function RequestSearchBar({ value, onChange, onClose }: Props) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onClose} role="button" aria-label="Close search" style={styles.back}>
        <Image
          source={require('../../../assets/images/icon-back-small.svg')}
          style={styles.backIcon}
        />
      </Pressable>
      <View style={styles.field}>
        <Image
          source={require('../../../assets/images/icon-search-active.svg')}
          style={styles.icon}
        />
        <TextInput
          value={value}
          onChangeText={onChange}
          autoFocus
          aria-label="Search song requests"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          selectionColor={colors.white}
          style={styles.input}
        />
      </View>
    </View>
  );
}

// Shared pill look: faint border and fill with a soft inner glow.
const pill = {
  borderRadius: 48,
  borderWidth: 1,
  borderColor: colors.cardBorder,
  backgroundColor: colors.cardFill,
  boxShadow: 'inset 0px 0px 20px 0px rgba(241, 241, 241, 0.04)',
} as const;

const styles = StyleSheet.create({
  // Figma leaves 20pt under the title here (vs 12pt for the filter chips),
  // so add 8pt to the header's 12pt gap.
  row: {
    width: '100%',
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Figma: 12pt padding, minus the 1pt border.
  back: {
    ...pill,
    padding: 11,
  },
  // The arrow asset points right; Figma mirrors it horizontally.
  backIcon: {
    width: 16,
    height: 16,
    transform: [{ scaleX: -1 }],
  },
  field: {
    ...pill,
    flex: 1,
    minWidth: 0,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingHorizontal: 11,
  },
  icon: {
    width: 16,
    height: 16,
  },
  input: {
    flex: 1,
    minWidth: 0,
    padding: 0,
    fontFamily: fonts.medium,
    fontSize: 14,
    letterSpacing: 0.42,
    color: '#bcbebf',
    // No browser focus ring on web; the field's outline is the affordance.
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as unknown as TextStyle) : null),
  },
});
