import { Stack } from 'expo-router';

import { colors } from '@/constants/theme';

// Live tab: the session dashboard, plus screens pushed on top of it (the
// enlarged session QR) that keep the tab bar and the Live tab selected.
export default function LiveLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
