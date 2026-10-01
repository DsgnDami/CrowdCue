import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/constants/theme';

/**
 * Empty request list: headphones and a short message (Figma node 308:8076).
 * Fills the list and centres itself in the part not covered by the tab bar.
 */
export function EmptyRequests({ message }: { message: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../../assets/images/empty-state-headphones.svg')}
          style={styles.icon}
          accessibilityIgnoresInvertColors
        />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // The list already pads 120pt (+ any off-screen part) for the tab bar;
  // Figma centres this 142pt above the list's bottom, so add 22pt more.
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  content: {
    width: 182,
    alignItems: 'center',
    gap: 14,
  },
  icon: {
    width: 72,
    height: 72,
  },
  message: {
    alignSelf: 'stretch',
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
