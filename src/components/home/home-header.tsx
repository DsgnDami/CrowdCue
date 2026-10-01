import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BellIcon, ImageIcon } from '@/components/icons';
import { colors, fonts } from '@/constants/theme';

function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

type Props = {
  name: string;
  onNotifications: () => void;
};

/** Avatar, time-of-day greeting and notifications bell (Figma node 260:241). */
export function HomeHeader({ name, onNotifications }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <ImageIcon size={26.4} />
        </View>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>{greeting()}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <Pressable onPress={onNotifications} role="button" aria-label="Notifications" hitSlop={10}>
        <BellIcon />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    maxWidth: 353,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  // 50.4pt tile: Figma's 12pt padding minus the 1pt border.
  avatar: {
    padding: 11,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.tileBorder,
    backgroundColor: colors.tileFill,
  },
  greeting: {
    gap: 4,
  },
  greetingText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    letterSpacing: 0.36,
    color: colors.white,
  },
  name: {
    fontFamily: fonts.medium,
    fontSize: 16,
    letterSpacing: 0.48,
    color: colors.white,
  },
});
