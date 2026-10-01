import { Image } from 'expo-image';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { Redirect, Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { JoinQrCode } from '@/components/join-qr-code';
import { SvgAsset } from '@/components/svg-asset';
import { colors, fonts } from '@/constants/theme';
import { useSession } from '@/context/session';

// Figma frame: "iPhone 16 - 17" (node 300:7256), 393×852.
const FRAME_WIDTH = 393;
const FRAME_HEIGHT = 852;

const exit = () => (router.canGoBack() ? router.back() : router.replace('/home/session-qr'));

/**
 * Full-screen QR for projectors, TVs and venue screens. The design is laid out
 * at its native size and scaled to fit, so it looks the same when mirrored.
 */
const KEEP_AWAKE_TAG = 'present-qr';

export default function Present() {
  // Keep the screen on for projectors. On web the browser may refuse or not
  // yet have granted the wake lock when we leave; neither is a problem.
  useEffect(() => {
    activateKeepAwakeAsync(KEEP_AWAKE_TAG).catch(() => {});
    return () => {
      Promise.resolve(deactivateKeepAwake(KEEP_AWAKE_TAG)).catch(() => {});
    };
  }, []);
  const { session } = useSession();
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / FRAME_WIDTH, height / FRAME_HEIGHT);

  if (!session) return <Redirect href="/home" />;

  return (
    <Pressable
      style={styles.screen}
      onPress={exit}
      role="button"
      aria-label="Exit preview"
    >
      <Stack.Screen options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
      <StatusBar hidden />

      <View style={[styles.frame, { transform: [{ scale }] }]} pointerEvents="none">
        <View style={styles.glow}>
          <SvgAsset source={require('../../assets/images/glow.svg')} width={418} height={326} />
        </View>

        <View style={styles.pillRow}>
          <View style={styles.pill}>
            {/* The dot SVG carries its glow, so it overflows the 12pt slot. */}
            <View style={styles.dotSlot}>
              <Image
                source={require('../../assets/images/live-dot-accent.svg')}
                style={styles.dot}
              />
            </View>
            <Text style={styles.pillText}>LIVE · TAKING REQUESTS</Text>
          </View>
        </View>

        <View style={styles.column}>
          <Text style={styles.title}>Scan to request a song</Text>
          <JoinQrCode value={`https://${session.joinUrl}`} size={262} />
          <View style={styles.details}>
            <Text style={styles.link}>{session.joinUrl}</Text>
            <Text style={styles.event}>{session.eventName}</Text>
          </View>
        </View>

        <Text style={styles.exitHint}>tap anywhere to exit preview</Text>

        <View style={styles.logo}>
          <SvgAsset
            source={require('../../assets/images/crowdcue-logo-small.svg')}
            width={82.3467}
            height={46.258}
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
  frame: {
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    backgroundColor: colors.background,
  },
  // 318×226 glow box at x=110, 50pt below the bottom edge; the SVG includes
  // 50pt of blur bleed on every side.
  glow: {
    position: 'absolute',
    left: 60,
    top: 626,
  },
  pillRow: {
    position: 'absolute',
    top: 124,
    left: 1,
    right: 0,
    alignItems: 'center',
  },
  // Figma: 14/20/12 padding, minus the 1pt border.
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 13,
    paddingRight: 19,
    paddingVertical: 11,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: 'rgba(245, 0, 253, 0.05)',
    backgroundColor: 'rgba(146, 0, 151, 0.13)',
    boxShadow: 'inset 0px 0px 10px 0px rgba(192, 4, 198, 0.54)',
  },
  dotSlot: {
    width: 12,
    height: 12,
    overflow: 'visible',
  },
  dot: {
    position: 'absolute',
    left: -23,
    top: -19,
    width: 58,
    height: 58,
  },
  pillText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    letterSpacing: 1.6,
    color: colors.white,
  },
  column: {
    position: 'absolute',
    top: 212,
    left: 61,
    width: 272,
    alignItems: 'center',
    gap: 24,
  },
  title: {
    alignSelf: 'stretch',
    fontFamily: fonts.display,
    fontSize: 24,
    lineHeight: 26.88,
    color: colors.white,
    textAlign: 'center',
  },
  details: {
    alignItems: 'center',
    gap: 8,
  },
  link: {
    fontFamily: fonts.medium,
    fontSize: 20,
    letterSpacing: 0.6,
    color: colors.white,
    textAlign: 'center',
  },
  event: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: 0.48,
    color: colors.textMuted,
    textAlign: 'center',
  },
  // Bottom edge 185pt above the frame bottom, so the text's top is at y=667.
  exitHint: {
    position: 'absolute',
    top: 667,
    left: 0,
    right: 0,
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 18.2,
    letterSpacing: 0.42,
    color: '#ef9cf3',
    textAlign: 'center',
  },
  // 80×40.662 logo slot centred at y=789.33; the SVG includes its drop shadow.
  logo: {
    position: 'absolute',
    top: 769,
    left: 157,
    width: 80,
    height: 40.662,
    overflow: 'visible',
  },
});
