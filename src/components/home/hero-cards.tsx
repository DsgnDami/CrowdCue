import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/button';
import { DjScenePhoto, DjTropicalPhoto } from '@/components/dj-photos';
import { GlassCard } from '@/components/glass-card';
import { colors, fonts } from '@/constants/theme';

/** Shown while a session is running (Figma node 260:232). */
export function LiveHeroCard({ onOpen }: { onOpen: () => void }) {
  return (
    <GlassCard style={[styles.card, styles.liveCard]}>
      <View style={styles.text}>
        <Text style={styles.title} role="heading">
          You are LIVE
        </Text>
        <Text style={styles.body}>
          {'Requests are rolling in.\nTap below to open your session.'}
        </Text>
      </View>
      <PrimaryButton
        label="Open Live Session"
        onPress={onOpen}
        style={styles.button}
        trailingIcon={
          <Image
            source={require('../../../assets/images/icon-chevron-right.svg')}
            style={styles.chevron}
          />
        }
      />
      <DjScenePhoto />
      <DjTropicalPhoto />
    </GlassCard>
  );
}

/** Shown when no session is running (Figma node 157:1547). */
export function ReadyHeroCard({ onStart }: { onStart: () => void }) {
  return (
    <GlassCard style={[styles.card, styles.readyCard]}>
      <View style={styles.text}>
        <Text style={styles.title} role="heading">
          Ready to go live?
        </Text>
        <Text style={styles.body}>
          Start a session, show the QR code, and let the crowd send requests and tips straight
          to you.
        </Text>
      </View>
      <PrimaryButton
        label="Start Live Session"
        onPress={onStart}
        style={styles.button}
        icon={
          <Image
            source={require('../../../assets/images/icon-play-small.svg')}
            style={styles.playIcon}
          />
        }
      />
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    maxWidth: 353,
    gap: 32,
  },
  // Figma: 48/40/40 padding, minus the 1pt border.
  liveCard: {
    paddingTop: 47,
    paddingBottom: 39,
    paddingHorizontal: 39,
  },
  // Figma: 40pt padding, minus the 1pt border.
  readyCard: {
    padding: 39,
  },
  text: {
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
  button: {
    boxShadow: 'inset 0px 0px 4px 2px rgba(0, 0, 0, 0.09)',
  },
  chevron: {
    width: 12,
    height: 12.333,
  },
  playIcon: {
    width: 16,
    height: 16,
  },
});
