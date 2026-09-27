import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LayeredIcon } from '@/components/layered-icon';
import { colors, fonts } from '@/constants/theme';

function formatElapsed(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

function useElapsed(startedAt: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  return formatElapsed(now - startedAt);
}

type Props = {
  eventName: string;
  joinUrl: string;
  startedAt: number;
  onEnd: () => void;
};

export function LiveHeader({ eventName, joinUrl, startedAt, onEnd }: Props) {
  const elapsed = useElapsed(startedAt);

  return (
    <View style={styles.header}>
      <View style={styles.info}>
        <View style={styles.livePill}>
          {/* The dot SVG carries its drop shadow, so it overflows the 12pt slot. */}
          <View style={styles.dotSlot}>
            <Image source={require('../../../assets/images/live-dot.svg')} style={styles.dot} />
          </View>
          <Text style={styles.liveText}>LIVE</Text>
        </View>
        <View style={styles.titles}>
          <Text style={styles.eventName} numberOfLines={1}>
            {eventName}
          </Text>
          <View style={styles.meta}>
            <Text style={styles.metaText} aria-label={`Live for ${elapsed}`}>
              {elapsed}
            </Text>
            <Text style={styles.metaText} numberOfLines={1}>
              {joinUrl}
            </Text>
          </View>
        </View>
      </View>
      <Pressable onPress={onEnd} role="button" aria-label="End session" hitSlop={10}>
        <LayeredIcon
          size={24}
          layers={[
            {
              source: require('../../../assets/images/icon-stop.png'),
              inset: ['8.33%', '8.33%', '8.33%', '8.33%'],
            },
          ]}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    maxWidth: 353,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 37,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  // Figma: 7/12/4 padding, minus the 0.5pt border.
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 6.5,
    paddingRight: 11.5,
    paddingVertical: 3.5,
    borderRadius: 48,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  dotSlot: {
    width: 12,
    height: 12,
    overflow: 'visible',
  },
  dot: {
    position: 'absolute',
    left: -23,
    top: -19,
    width: 58,
    height: 58,
  },
  liveText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    letterSpacing: 0.42,
    color: colors.white,
  },
  titles: {
    flex: 1,
    gap: 4,
  },
  eventName: {
    fontFamily: fonts.medium,
    fontSize: 16,
    letterSpacing: 0.48,
    color: colors.white,
  },
  meta: {
    flexDirection: 'row',
    gap: 10,
  },
  metaText: {
    flexShrink: 1,
    fontFamily: fonts.medium,
    fontSize: 12,
    letterSpacing: 0.36,
    color: colors.textMuted,
  },
});
