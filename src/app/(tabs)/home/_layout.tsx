import { Stack } from 'expo-router';

import { colors } from '@/constants/theme';

// Home tab: the dashboard, plus screens pushed on top of it (e.g. the
// enlarged session QR) that keep the tab bar and the Home tab selected.
export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
