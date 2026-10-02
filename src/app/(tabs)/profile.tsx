import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomFade } from '@/components/bottom-fade';
import { PrimaryButton } from '@/components/button';
import { EventCard } from '@/components/home/event-card';
import { EditIcon, ImageIcon } from '@/components/icons';
import { SvgAsset } from '@/components/svg-asset';
import { colors, fonts } from '@/constants/theme';
import { useSession } from '@/context/session';
import { upcomingEvents } from '@/data/home';
import { djProfile } from '@/data/profile';
import { confirmAction } from '@/lib/confirm';

// Figma frame: "iPhone 16 - 18" (node 300:7405), 393×852.
export default function Profile() {
  const insets = useSafeAreaInsets();
  const { session, endSession } = useSession();

  // TODO: wire up once editing a profile and adding events are designed.
  const handleEdit = () => {};
  const handleAddEvent = () => {};

  // TODO: sign out with the auth provider once there is one.
  const logOut = () => {
    endSession();
    router.replace('/sign-in');
  };
  const handleLogOut = () =>
    session
      ? confirmAction('Log out?', 'This will end your live session.', 'Log out', logOut)
      : logOut();

  return (
    <View style={styles.screen}>
      {/* Blurred purple/blue glow low on the screen. Clipped so it can't make
          the screen scrollable sideways. */}
      <View style={styles.glowClip} pointerEvents="none">
        <View style={styles.glow}>
          <SvgAsset source={require('../../../assets/images/glow.svg')} width={418} height={326} />
        </View>
      </View>

      <View style={[styles.header, { paddingTop: Math.max(insets.top, 72) }]}>
        <Text style={styles.headerTitle} role="heading">
          Profile
        </Text>
        <Pressable onPress={handleEdit} role="button" aria-label="Edit profile" hitSlop={10}>
          <EditIcon />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profile}>
          <View style={styles.identity}>
            <View style={styles.avatar}>
              <ImageIcon size={64} />
            </View>
            <View style={styles.names}>
              <Text style={styles.name}>{djProfile.name}</Text>
              <Text style={styles.handle}>{djProfile.handle}</Text>
            </View>
          </View>
          <Text style={styles.bio}>{djProfile.bio}</Text>
        </View>

        <View style={styles.panel}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle} role="heading">
              Upcoming Events
            </Text>
            <Pressable onPress={handleAddEvent} role="button" aria-label="Add event" hitSlop={8}>
              <Text style={styles.sectionAction}>+ Add</Text>
            </Pressable>
          </View>

          <View style={styles.events}>
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                date={event.date}
                title={event.title}
                subtitle={event.subtitle}
              />
            ))}
          </View>

          <PrimaryButton label="Log out" onPress={handleLogOut} style={styles.logOut} />
        </View>
      </ScrollView>

      <BottomFade />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    minHeight: 0,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  // 318×226 glow box at x=110, y=672; the SVG adds 50pt of blur bleed.
  glowClip: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 230,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    bottom: -96,
    left: '50%',
    marginLeft: -136.5,
  },
  header: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 353,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: fonts.display,
    fontSize: 24,
    lineHeight: 28.8,
    color: colors.white,
  },
  // Content scrolls from y=125: 24.2pt below the 28.8pt header at y=72.
  scroll: {
    flex: 1,
    minHeight: 0,
    marginTop: 24.2,
  },
  content: {
    alignItems: 'center',
    gap: 41,
  },
  profile: {
    width: 250,
    alignItems: 'center',
    gap: 24,
  },
  identity: {
    alignItems: 'center',
    gap: 12,
  },
  // Figma: 28.571pt padding, minus the 2pt border.
  avatar: {
    padding: 26.571,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.tileBorder,
    backgroundColor: colors.tileFill,
  },
  names: {
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontFamily: fonts.displayMedium,
    fontSize: 32,
    lineHeight: 38.4,
    color: colors.white,
    textAlign: 'center',
  },
  handle: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 18.2,
    letterSpacing: 0.42,
    color: colors.textMuted,
    textAlign: 'center',
  },
  bio: {
    alignSelf: 'stretch',
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 18.2,
    letterSpacing: 0.42,
    color: colors.textMuted,
    textAlign: 'center',
  },
  // Full-width panel with rounded corners. Figma's 32pt top padding minus the
  // 1pt border; the bottom clears the tab bar.
  panel: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 24,
    paddingTop: 31,
    paddingBottom: 140,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cardFill,
    boxShadow: 'inset 0px 0px 20px 6px rgba(241, 241, 241, 0.04)',
  },
  sectionHeader: {
    width: '100%',
    maxWidth: 353,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: fonts.display,
    fontSize: 20,
    lineHeight: 24,
    color: colors.textMuted,
  },
  sectionAction: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
  events: {
    width: '100%',
    maxWidth: 353,
    gap: 4,
  },
  logOut: {
    maxWidth: 353,
  },
});
