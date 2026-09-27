import { Image, type ImageSource } from 'expo-image';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { colors, fonts } from '@/constants/theme';
import type { SongRequest } from '@/context/session';

type Action = 'accept' | 'playNext' | 'later' | 'reject';

type Props = {
  request: SongRequest;
  onAction: (action: Action) => void;
};

function formatTime(timestamp: number) {
  const d = new Date(timestamp);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function RequestCard({ request, onAction }: Props) {
  const { title, artist, artwork, requester, message, tip, requestedAt, status } = request;
  const isNew = status === 'new';

  return (
    <View style={styles.card}>
      <View style={styles.song}>
        <Image source={artwork} style={styles.artwork} contentFit="cover" />
        <View style={styles.songText}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {isNew && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>New</Text>
              </View>
            )}
          </View>
          <Text style={styles.artist} numberOfLines={1}>
            {artist}
          </Text>
        </View>
        <View style={styles.meta}>
          {tip !== undefined && <Text style={styles.tip}>+£{tip}</Text>}
          <Text style={styles.time}>{formatTime(requestedAt)}</Text>
        </View>
      </View>

      <View style={styles.messageRow}>
        <View style={styles.requester}>
          <Image
            source={require('../../../assets/images/icon-requester.png')}
            style={styles.requesterIcon}
          />
          <Text style={styles.messageText}>{requester}</Text>
        </View>
        {message && (
          <Text style={[styles.messageText, styles.message]}>“{message}”</Text>
        )}
      </View>

      {/* Actions are only designed for new requests. */}
      {isNew && (
        <View style={styles.actions}>
          <ActionButton
            label="Accept"
            icon={require('../../../assets/images/icon-accept.svg')}
            variant="accent"
            onPress={() => onAction('accept')}
          />
          <ActionButton
            label="Play Next"
            icon={require('../../../assets/images/icon-play-next.svg')}
            onPress={() => onAction('playNext')}
          />
          <ActionButton label="Later" onPress={() => onAction('later')} />
          <ActionButton
            accessibilityLabel="Reject"
            icon={require('../../../assets/images/icon-dismiss.svg')}
            onPress={() => onAction('reject')}
          />
        </View>
      )}
    </View>
  );
}

type ActionButtonProps = {
  label?: string;
  accessibilityLabel?: string;
  icon?: ImageSource | number;
  variant?: 'accent' | 'muted';
  onPress: () => void;
};

function ActionButton({
  label,
  accessibilityLabel,
  icon,
  variant = 'muted',
  onPress,
}: ActionButtonProps) {
  const accent = variant === 'accent';
  const padding: ViewStyle = label
    ? { paddingHorizontal: 13, paddingVertical: 11 }
    : { padding: 11 };
  return (
    <Pressable
      onPress={onPress}
      role="button"
      aria-label={accessibilityLabel ?? label}
      style={({ pressed }) => [
        styles.action,
        padding,
        accent ? styles.actionAccent : styles.actionMuted,
        pressed && styles.pressed,
      ]}
    >
      {icon && <Image source={icon} style={styles.actionIcon} />}
      {label && (
        <Text style={[styles.actionLabel, accent && styles.actionLabelAccent]}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Figma: 24pt padding, minus the 1pt border.
  card: {
    width: '100%',
    gap: 12,
    padding: 23,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.tileBorder,
    backgroundColor: colors.tileFill,
    overflow: 'hidden',
  },
  song: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  songText: {
    flex: 1,
    height: 41,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flexShrink: 1,
    fontFamily: fonts.medium,
    fontSize: 16,
    letterSpacing: 0.48,
    color: colors.white,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 48,
    backgroundColor: '#009543',
  },
  badgeText: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    letterSpacing: 0.3,
    color: colors.white,
    textAlign: 'center',
  },
  artist: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 18.2,
    letterSpacing: 0.42,
    color: '#393b3c',
  },
  meta: {
    height: 37,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  tip: {
    fontFamily: fonts.medium,
    fontSize: 14,
    letterSpacing: 0.42,
    color: colors.white,
    textAlign: 'right',
  },
  time: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 15.6,
    letterSpacing: 0.36,
    color: colors.textSubtle,
    textAlign: 'right',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
  },
  requester: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 4,
  },
  requesterIcon: {
    width: 12,
    height: 13.333,
  },
  messageText: {
    fontFamily: fonts.regular,
    fontSize: 14,
    letterSpacing: 0.42,
    color: colors.textMuted,
  },
  message: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Figma: 14/12 padding (12 for icon-only), minus the 1pt border.
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderRadius: 48,
    borderWidth: 1,
    overflow: 'hidden',
  },
  actionAccent: {
    borderColor: 'rgba(245, 0, 253, 0.05)',
    backgroundColor: 'rgba(146, 0, 151, 0.13)',
    boxShadow: 'inset 0px 0px 10px 0px rgba(192, 4, 198, 0.54)',
  },
  actionMuted: {
    borderColor: '#1e1e1e',
    backgroundColor: '#141414',
    boxShadow: 'inset 0px 0px 10px 0px rgba(132, 132, 132, 0.25)',
  },
  pressed: {
    opacity: 0.8,
  },
  actionIcon: {
    width: 16,
    height: 16,
  },
  actionLabel: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: '#5f5f5f',
    textAlign: 'center',
  },
  actionLabelAccent: {
    color: '#b200ba',
  },
});
