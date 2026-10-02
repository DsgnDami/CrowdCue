import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ReadyHeroCard } from '@/components/home/hero-cards';
import { LiveSession } from '@/components/live/live-session';
import { colors } from '@/constants/theme';
import { useSession } from '@/context/session';

/** Live tab: the request dashboard while live, otherwise a prompt to start. */
export default function LiveTab() {
  const { session } = useSession();
  if (session) return <LiveSession session={session} />;

  // Not designed yet: reuses Home's "Ready to go live?" card.
  return (
    <View style={styles.idle}>
      <ReadyHeroCard onStart={() => router.push('/new-session')} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Centred in the space above the floating tab bar.
  idle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 90,
    backgroundColor: colors.background,
  },
});
