import { Redirect } from 'expo-router';

import { LiveSession } from '@/components/live/live-session';
import { useSession } from '@/context/session';

/** The live request dashboard, opened from "Open Live Session" on Home. */
export default function SessionScreen() {
  const { session } = useSession();
  // Also covers ending the session: go back to Home.
  if (!session) return <Redirect href="/home" />;
  return <LiveSession session={session} />;
}
