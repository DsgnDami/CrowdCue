import { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { LiveHeader } from '@/components/live/live-header';
import { QrCard } from '@/components/live/qr-card';
import { RequestCard } from '@/components/live/request-card';
import { RequestFilters, type RequestFilter } from '@/components/live/request-filters';
import { colors, fonts } from '@/constants/theme';
import { useSession, type LiveSession as Session } from '@/context/session';

function confirmEnd(onConfirm: () => void) {
  const title = 'End session?';
  const body = 'The QR code will stop taking requests.';
  // Alert.alert is a no-op on web.
  if (Platform.OS === 'web') {
    if (window.confirm(`${title}\n${body}`)) onConfirm();
    return;
  }
  Alert.alert(title, body, [
    { text: 'Cancel', style: 'cancel' },
    { text: 'End session', style: 'destructive', onPress: onConfirm },
  ]);
}

// Figma frame: "iPhone 16 - 12" (node 170:1917), 393×852.
export function LiveSession({ session }: { session: Session }) {
  const insets = useSafeAreaInsets();
  const { requests, endSession, updateRequest } = useSession();
  const [filter, setFilter] = useState<RequestFilter>('all');

  const visible = filter === 'all' ? requests : requests.filter((r) => r.status === filter);

  // TODO: wire these up once the audience preview, full-screen QR and search are designed.
  const handlePreview = () => {};
  const handleEnlarge = () => {};
  const handleSearch = () => {};

  return (
    <View style={styles.screen}>
      <View style={[styles.top, { paddingTop: Math.max(insets.top, 70) }]}>
        <LiveHeader
          eventName={session.eventName}
          joinUrl={session.joinUrl}
          startedAt={session.startedAt}
          onEnd={() => confirmEnd(endSession)}
        />
        <QrCard onPreview={handlePreview} onEnlarge={handleEnlarge} />
      </View>

      <View style={styles.sheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle} role="heading">
            Song Requests
          </Text>
          <RequestFilters value={filter} onChange={setFilter} onSearch={handleSearch} />
        </View>

        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {visible.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onAction={(action) => updateRequest(request.id, action)}
            />
          ))}
          {visible.length === 0 && <Text style={styles.empty}>No requests here yet.</Text>}
        </ScrollView>
      </View>

      {/* Fades the list out behind the floating tab bar. Figma also blurs this
          layer by 30pt, which React Native can't do without extra native code. */}
      <Svg style={styles.fade} width="100%" height="108" pointerEvents="none">
        <Defs>
          <LinearGradient id="live-fade" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0.0179" stopColor={colors.tileFill} stopOpacity={0} />
            <Stop offset="0.40741" stopColor={colors.tileFill} stopOpacity={1} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#live-fade)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  // minHeight: 0 lets these flex children shrink to the screen so the request
  // list scrolls, instead of the screen growing to fit every card.
  screen: {
    flex: 1,
    minHeight: 0,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  top: {
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 32,
  },
  // Figma: 24pt below the QR card, full width, rounded top corners.
  sheet: {
    flex: 1,
    minHeight: 0,
    marginTop: 24,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: colors.cardBorder,
    backgroundColor: colors.cardFill,
    boxShadow: 'inset 0px 0px 20px 6px rgba(241, 241, 241, 0.04)',
  },
  // Title block is inset 44pt (20 + 24) from the screen edge; minus the border.
  sheetHeader: {
    paddingTop: 31,
    paddingHorizontal: 43,
    gap: 12,
  },
  sheetTitle: {
    height: 22,
    fontFamily: fonts.display,
    fontSize: 20,
    lineHeight: 24,
    color: colors.textMuted,
  },
  list: {
    flex: 1,
    minHeight: 0,
    marginTop: 24,
  },
  // Cards are inset 20pt from the screen edge (minus the sheet border) and
  // the list scrolls clear of the floating tab bar.
  listContent: {
    paddingHorizontal: 19,
    gap: 4,
    paddingBottom: 120,
  },
  empty: {
    paddingTop: 24,
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textSubtle,
    textAlign: 'center',
  },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -37,
  },
});
