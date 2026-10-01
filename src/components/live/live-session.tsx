import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomFade } from '@/components/bottom-fade';
import { EmptyRequests } from '@/components/live/empty-requests';
import { LiveHeader } from '@/components/live/live-header';
import { QrCard } from '@/components/live/qr-card';
import { RequestCard } from '@/components/live/request-card';
import { RequestFilters, type RequestFilter } from '@/components/live/request-filters';
import { RequestSearchBar } from '@/components/live/request-search-bar';
import { RequestsSheet, type RequestsSheetHandle } from '@/components/live/requests-sheet';
import { colors, fonts } from '@/constants/theme';
import { useSession, type LiveSession as Session, type SongRequest } from '@/context/session';

function matchesQuery(request: SongRequest, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [request.title, request.artist, request.requester, request.message ?? ''].some((field) =>
    field.toLowerCase().includes(q),
  );
}

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

// Figma frames: "iPhone 16 - 12" (node 170:1917) with the requests sheet
// collapsed, "iPhone 16 - 15" (node 300:6105) with it dragged up.
export function LiveSession({ session }: { session: Session }) {
  const insets = useSafeAreaInsets();
  const { requests, endSession, updateRequest } = useSession();
  const [filter, setFilter] = useState<RequestFilter>('all');
  // Sheet top when collapsed: 24pt below the dashboard, measured on layout.
  const [collapsedTop, setCollapsedTop] = useState<number | null>(null);
  // Figma's expanded sheet starts at y=63 on an iPhone 16 (59pt status bar).
  const expandedTop = Math.max(insets.top + 4, 63);
  const [offset] = useState(() => new Animated.Value(0));
  const range = Math.max(1, (collapsedTop ?? 0) - expandedTop);
  // The dashboard fades out as the sheet covers it.
  const dashboardOpacity = offset.interpolate({
    inputRange: [0, range * 0.6, range],
    outputRange: [0, 0.3, 1],
    extrapolate: 'clamp',
  });

  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState('');
  const sheetRef = useRef<RequestsSheetHandle>(null);

  // Search looks across every request, whatever filter was selected.
  const visible = searching
    ? requests.filter((r) => matchesQuery(r, query))
    : filter === 'all'
      ? requests
      : requests.filter((r) => r.status === filter);

  const openSearch = () => {
    setSearching(true);
    // Give the results room above the keyboard.
    sheetRef.current?.expand();
  };
  const closeSearch = () => {
    Keyboard.dismiss();
    setSearching(false);
    setQuery('');
  };

  // TODO: wire up once the audience preview is designed.
  const handlePreview = () => {};
  const handleEnlarge = () => router.push('/home/session-qr');

  return (
    <View style={styles.screen}>
      <Animated.View
        style={[styles.top, { paddingTop: Math.max(insets.top, 70), opacity: dashboardOpacity }]}
        onLayout={(e) => {
          const { y, height } = e.nativeEvent.layout;
          const top = y + height + 24;
          // Start collapsed in the same frame the sheet first appears.
          if (collapsedTop === null) offset.setValue(top - expandedTop);
          setCollapsedTop(top);
        }}
      >
        <LiveHeader
          eventName={session.eventName}
          joinUrl={session.joinUrl}
          startedAt={session.startedAt}
          onEnd={() => confirmEnd(endSession)}
        />
        <QrCard
          joinLink={`https://${session.joinUrl}`}
          onPreview={handlePreview}
          onEnlarge={handleEnlarge}
        />
      </Animated.View>

      {collapsedTop !== null && (
        <RequestsSheet
          ref={sheetRef}
          collapsedTop={collapsedTop}
          expandedTop={expandedTop}
          offset={offset}
          header={(titleA11y) => (
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle} {...titleA11y} accessibilityLabel="Song Requests">
                Song Requests
              </Text>
              {searching ? (
                <RequestSearchBar value={query} onChange={setQuery} onClose={closeSearch} />
              ) : (
                <RequestFilters value={filter} onChange={setFilter} onSearch={openSearch} />
              )}
            </View>
          )}
        >
          {(hiddenBelow) => (
            <ScrollView
              style={styles.list}
              // Extra bottom space for the part of the sheet pushed off-screen
              // while collapsed, so the last card can still scroll into view.
              contentContainerStyle={[styles.listContent, { paddingBottom: 120 + hiddenBelow }]}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
            >
              {visible.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onAction={(action) => updateRequest(request.id, action)}
                />
              ))}
              {visible.length === 0 && (
                <EmptyRequests
                  message={
                    searching && query.trim()
                      ? `No requests match “${query.trim()}”.`
                      : 'Nothing here yet.'
                  }
                />
              )}
            </ScrollView>
          )}
        </RequestsSheet>
      )}

      <BottomFade />
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
  // Cards are inset 20pt from the screen edge (minus the sheet border); the
  // bottom padding (set inline) keeps them clear of the floating tab bar.
  listContent: {
    // Lets the empty state fill and centre itself in the list.
    flexGrow: 1,
    paddingHorizontal: 19,
    gap: 4,
  },
});
