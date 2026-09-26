import { Image } from 'expo-image';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { SvgAsset } from '@/components/svg-asset';
import { colors } from '@/constants/theme';

// Figma frame: "iPhone 16 - 5" (node 135:267), 393×852.
const FRAME_WIDTH = 393;
const FRAME_HEIGHT = 852;

type Props = {
  onPress: () => void;
};

export function SplashScreen({ onPress }: Props) {
  const { width, height } = useWindowDimensions();
  // Lay the design out at its native size, then scale it to fit the device.
  const scale = Math.min(width / FRAME_WIDTH, height / FRAME_HEIGHT);

  return (
    <Pressable
      style={styles.screen}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="CrowdCue. Tap to continue"
    >
      <View style={[styles.frame, { transform: [{ scale }] }]}>
        <View style={styles.scene} pointerEvents="none">
          <Image
            source={require('../../assets/images/dj-performance.png')}
            style={StyleSheet.absoluteFill}
            contentFit="fill"
            contentPosition="bottom"
          />
          {/* Radial vignette fading the photo into the background. */}
          <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
            <Defs>
              <RadialGradient id="vignette" cx="50%" cy="50%" r="50%">
                <Stop offset="0" stopColor={colors.background} stopOpacity={0} />
                <Stop offset="0.55" stopColor={colors.background} stopOpacity={0} />
                <Stop offset="0.85" stopColor={colors.background} stopOpacity={0.7} />
                <Stop offset="1" stopColor={colors.background} stopOpacity={1} />
              </RadialGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#vignette)" />
          </Svg>
        </View>

        {/* The SVG includes its drop shadow, so it overflows the 166×84.375 logo slot. */}
        <View style={styles.logo}>
          <SvgAsset
            source={require('../../assets/images/crowdcue-logo.svg')}
            width={170.869}
            height={95.9853}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  // The frame needs its own background: the scaled frame is its own stacking
  // context, and the photo's color-dodge blend needs something to blend against.
  frame: {
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    backgroundColor: colors.background,
  },
  logo: {
    position: 'absolute',
    left: 114,
    top: 251,
    width: 166,
    height: 84.375,
    overflow: 'visible',
  },
  scene: {
    position: 'absolute',
    left: 2,
    top: 229,
    width: 389,
    height: 590,
    mixBlendMode: 'color-dodge',
  },
});
