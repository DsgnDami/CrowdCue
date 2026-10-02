import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomFade } from '@/components/bottom-fade';
import { EventCard } from '@/components/home/event-card';
import { HomeHeader } from '@/components/home/home-header';
import { LiveHeroCard, ReadyHeroCard } from '@/components/home/hero-cards';
import { StatTile, statPalettes } from '@/components/home/stat-tile';
import { colors, fonts } from '@/constants/theme';
import { useSession } from '@/context/session';
import { formatPounds, homeStats, previousSessions, upcomingEvents } from '@/data/home';
import { djProfile } from '@/data/profile';

// Figma frame: "iPhone 16 - 14" (node 260:226), 393×852.
export default function Home() {
  const insets = useSafeAreaInsets();
  const { session } = useSession();
  const headerTop = Math.max(insets.top, 60);

  // TODO: wire up once notifications, the events list and analytics exist.
  const handleNotifications = () => {};
  const handleSeeAllEvents = () => {};
  const handleAnalytics = () => {};

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: headerTop }]}>
        <HomeHeader name={djProfile.name} onNotifications={handleNotifications} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Decorative orb peeking out just above the events panel, behind the
            stats. Clipped so it can't widen the scroll area; it has the
            screen background so its "difference" blend has a backdrop. */}
        <View style={styles.orbClip} pointerEvents="none">
          <Image
            source={require('../../../../assets/images/home-orb.png')}
            style={styles.orb}
            contentFit="fill"
            contentPosition="bottom"
          />
        </View>

        {session ? (
          <LiveHeroCard onOpen={() => router.navigate('/live')} />
        ) : (
          <ReadyHeroCard onStart={() => router.push('/new-session')} />
        )}

        <View style={styles.stats}>
          <View style={styles.statsRow}>
            <StatTile
              icon={require('../../../../assets/images/stat-requests.svg')}
              value={String(homeStats.requests)}
              label="Requests"
              palette={statPalettes.blue}
            />
            <StatTile
              icon={require('../../../../assets/images/stat-tips.svg')}
              value={formatPounds(homeStats.tipsThisWeek)}
              label="Tips earned · this week"
              palette={statPalettes.pink}
            />
          </View>
          <View style={styles.statsRow}>
            <StatTile
              icon={require('../../../../assets/images/stat-events.svg')}
              value={String(upcomingEvents.length)}
              label="Upcoming events"
              palette={statPalettes.purple}
            />
            <View style={styles.statsSpacer} />
          </View>
        </View>

        <View style={styles.panel}>
          <View style={styles.section}>
            <SectionHeader title="Upcoming Events" action="See all" onAction={handleSeeAllEvents} />
            <View style={styles.upcomingList}>
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  date={event.date}
                  title={event.title}
                  subtitle={event.subtitle}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader title="Previous sessions" action="Analytics" onAction={handleAnalytics} />
            <View style={styles.previousList}>
              {previousSessions.map((event) => (
                <EventCard
                  key={event.id}
                  date={event.date}
                  title={event.title}
                  subtitle={event.subtitle}
                  trailing={
                    event.tips !== undefined
                      ? { value: formatPounds(event.tips), label: 'tips' }
                      : undefined
                  }
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomFade />
    </View>
  );
}

function SectionHeader({
  title,
  action,
  onAction,
}: {
  title: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle} role="heading">
        {title}
      </Text>
      <Pressable onPress={onAction} role="button" hitSlop={8}>
        <Text style={styles.sectionAction}>{action}</Text>
      </Pressable>
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
  // 468×53 at x=22, y=557 in the scroll area (y=693 on screen).
  orbClip: {
    position: 'absolute',
    top: 557,
    left: 0,
    right: 0,
    height: 53,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  orb: {
    position: 'absolute',
    left: 22,
    top: 0,
    width: 468,
    height: 53,
    mixBlendMode: 'difference',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  // Scrolling starts at y=136: 25.6pt below the 50.4pt header.
  scroll: {
    flex: 1,
    minHeight: 0,
    marginTop: 25.6,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  // 352×298 grid of 143pt rows at y=282 in the scroll area (the live card
  // is 258.4pt tall).
  stats: {
    width: '100%',
    maxWidth: 352,
    marginTop: 23.6,
    gap: 12,
  },
  statsRow: {
    height: 143,
    flexDirection: 'row',
    gap: 12,
  },
  statsSpacer: {
    flex: 1,
  },
  // Full-width panel 30pt below the stats, rounded at the top. Figma's 32pt
  // top padding minus the 1pt border; the bottom clears the tab bar.
  panel: {
    alignSelf: 'stretch',
    marginHorizontal: -20,
    marginTop: 30,
    paddingTop: 31,
    paddingBottom: 140,
    gap: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cardFill,
    boxShadow: 'inset 0px 0px 20px 6px rgba(241, 241, 241, 0.04)',
  },
  section: {
    alignItems: 'center',
    gap: 24,
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
    fontFamily: fonts.medium,
    fontSize: 14,
    letterSpacing: 0.42,
    color: colors.textOnLight,
  },
  upcomingList: {
    width: '100%',
    maxWidth: 353,
    gap: 4,
  },
  // Figma: 358pt cards in the 393pt panel (17.5pt each side, minus the border).
  previousList: {
    alignSelf: 'stretch',
    paddingHorizontal: 16.5,
    gap: 4,
  },
});
