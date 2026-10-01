import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { Vignette } from '@/components/vignette';

/**
 * Faint DJ photos blended into a 353pt-wide glass card, as on the live QR
 * card and the "You are LIVE" card. Positions are relative to the card.
 */

/** Tropical DJ photo, bottom-left, 10% colour-dodge. */
export function DjTropicalPhoto() {
  return (
    <View style={styles.tropical} pointerEvents="none">
      <Image
        source={require('../../assets/images/dj-tropical.png')}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
    </View>
  );
}

/** Overhead DJ photo, top-right, 22% colour-dodge with a radial fade. */
export function DjScenePhoto() {
  return (
    <View style={styles.scene} pointerEvents="none">
      <Image
        source={require('../../assets/images/dj-performance.png')}
        style={StyleSheet.absoluteFill}
        contentFit="fill"
        contentPosition="bottom"
      />
      <Vignette />
    </View>
  );
}

const styles = StyleSheet.create({
  tropical: {
    position: 'absolute',
    left: -11,
    top: 95,
    width: 193,
    height: 129,
    opacity: 0.1,
    mixBlendMode: 'color-dodge',
  },
  scene: {
    position: 'absolute',
    left: 181,
    top: -126,
    width: 302,
    height: 459,
    opacity: 0.22,
    mixBlendMode: 'color-dodge',
  },
});
