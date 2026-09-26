import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/constants/theme';

type Props = {
  title: string;
  onBack: () => void;
};

/** Centered display title with a back arrow on the left. */
export function ScreenHeader({ title, onBack }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      <Pressable
        style={styles.back}
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Back"
        hitSlop={8}
      >
        <Image
          source={require('../../assets/images/icon-back.svg')}
          style={styles.backIcon}
          contentFit="contain"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 38.4,
    color: colors.white,
    textAlign: 'center',
  },
  back: {
    position: 'absolute',
    left: 8,
    top: 4.67,
  },
  // The arrow asset points right; Figma mirrors it horizontally.
  backIcon: {
    width: 28.667,
    height: 28.667,
    transform: [{ scaleX: -1 }],
  },
});
