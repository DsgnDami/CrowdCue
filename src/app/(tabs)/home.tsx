import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/button';
import { GlassCard } from '@/components/glass-card';
import { BellIcon, ImageIcon } from '@/components/icons';
import { SvgAsset } from '@/components/svg-asset';
import { colors, fonts } from '@/constants/theme';

// TODO: replace with the signed-in DJ's profile once auth exists.
const DJ_NAME = 'DJ Propane';

function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

// Figma frame: "iPhone 16 - 10" (node 157:1540), 393×852.
export default function Home() {
  const insets = useSafeAreaInsets();

  const handleStartSession = () => router.push('/new-session');
  // TODO: wire up once notifications exist.
  const handleNotifications = () => {};

  return (
    <View style={styles.screen}>
      {/* Large blurred purple/blue glow anchored to the bottom of the screen. */}
      <View style={styles.glow} pointerEvents="none">
        <SvgAsset
          source={require('../../../assets/images/glow-large.svg')}
          width={693.584}
          height={540.929}
        />
      </View>

      <View style={[styles.content, { paddingTop: Math.max(insets.top, 60) }]}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <View style={styles.avatar}>
              <ImageIcon size={26.4} />
            </View>
            <View style={styles.greeting}>
              <Text style={styles.greetingText}>{greeting()}</Text>
              <Text style={styles.name}>{DJ_NAME}</Text>
            </View>
          </View>
          <Pressable
            onPress={handleNotifications}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            hitSlop={10}
          >
            <BellIcon />
          </Pressable>
        </View>

        <GlassCard style={styles.card}>
          <View style={styles.cardText}>
            <Text style={styles.title} accessibilityRole="header">
              Ready to go live?
            </Text>
            <Text style={styles.body}>
              Start a session, show the QR code, and let the crowd send requests and tips
              straight to you.
            </Text>
          </View>
          <PrimaryButton
            label="Start Live Session"
            onPress={handleStartSession}
            style={styles.startButton}
            icon={
              <Image
                source={require('../../../assets/images/icon-play-small.svg')}
                style={styles.playIcon}
              />
            }
          />
        </GlassCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    bottom: -82.95,
    left: '50%',
    marginLeft: -274.28,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    maxWidth: 353,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  // 50.4pt tile: Figma's 12pt padding minus the 1pt border.
  avatar: {
    padding: 11,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(30, 30, 31, 0.52)',
    backgroundColor: '#101111',
  },
  greeting: {
    gap: 4,
  },
  greetingText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    letterSpacing: 0.36,
    color: colors.white,
  },
  name: {
    fontFamily: fonts.medium,
    fontSize: 16,
    letterSpacing: 0.48,
    color: colors.white,
  },
  // Figma places the card at y=131, 20.6pt below the header.
  card: {
    maxWidth: 353,
    marginTop: 20.6,
    padding: 39,
    gap: 32,
  },
  cardText: {
    gap: 12,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 38.4,
    color: colors.white,
  },
  body: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.textMuted,
  },
  startButton: {
    boxShadow: 'inset 0px 0px 4px 2px rgba(0, 0, 0, 0.09)',
  },
  playIcon: {
    width: 16,
    height: 16,
  },
});
