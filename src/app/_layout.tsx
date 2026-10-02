import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors, fontSources } from '@/constants/theme';
import { ProfileProvider } from '@/context/profile';
import { SessionProvider } from '@/context/session';

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontSources);

  if (!fontsLoaded && !fontError) return null;

  return (
    <ProfileProvider>
      <SessionProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: 'fade',
          }}
        />
        <StatusBar style="light" />
      </SessionProvider>
    </ProfileProvider>
  );
}
