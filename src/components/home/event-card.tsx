import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/constants/theme';

import { statPalettes } from './stat-tile';

type Props = {
  date: Date;
  title: string;
  subtitle: string;
  /** Right-hand figure, e.g. tips earned on a past session. */
  trailing?: { value: string; label: string };
  onPress?: () => void;
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Event row with a date badge (Figma node 264:823 and 266:1106). */
export function EventCard({ date, title, subtitle, trailing, onPress }: Props) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = MONTHS[date.getMonth()];

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      role={onPress ? 'button' : undefined}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.badge}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.month}>{month}</Text>
      </View>
      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      {trailing && (
        <View style={styles.trailing}>
          <Text style={styles.trailingValue}>{trailing.value}</Text>
          <Text style={styles.trailingLabel}>{trailing.label}</Text>
        </View>
      )}
    </Pressable>
  );
}

const badge = statPalettes.purple;

const styles = StyleSheet.create({
  // Figma: 24pt padding, minus the 1pt border.
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 23,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.tileBorder,
    backgroundColor: colors.tileFill,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.8,
  },
  badge: {
    width: 51,
    height: 71,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: badge.border,
    backgroundColor: badge.fill,
    boxShadow: `inset 0px 0px 20px 6px ${badge.glow}`,
    overflow: 'hidden',
  },
  day: {
    fontFamily: fonts.medium,
    fontSize: 24,
    letterSpacing: 0.72,
    color: badge.number,
    textAlign: 'center',
  },
  month: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: badge.number,
    textAlign: 'center',
  },
  text: {
    flex: 1,
    minWidth: 0,
    height: 41,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 16,
    letterSpacing: 0.48,
    color: colors.white,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 18.2,
    letterSpacing: 0.42,
    color: colors.textSubtle,
  },
  trailing: {
    width: 50,
    height: 37,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  trailingValue: {
    fontFamily: fonts.medium,
    fontSize: 14,
    letterSpacing: 0.42,
    color: '#009543',
    textAlign: 'right',
  },
  trailingLabel: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 15.6,
    letterSpacing: 0.36,
    color: colors.textSubtle,
    textAlign: 'right',
  },
});
