import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { GlassCard } from '@/components/glass-card';
import { SvgAsset } from '@/components/svg-asset';
import { Vignette } from '@/components/vignette';
import { colors, fonts } from '@/constants/theme';

type Props = {
  onPreview: () => void;
  onEnlarge: () => void;
};

export function QrCard({ onPreview, onEnlarge }: Props) {
  return (
    <GlassCard style={styles.card}>
      {/* Faint DJ photos blended into the card. */}
      <View style={styles.tropical} pointerEvents="none">
        <Image
          source={require('../../../assets/images/dj-tropical.png')}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />
      </View>

      <View style={styles.content}>
        {/* TODO: generate the QR from the session's join URL; this is the
            placeholder QR from the design. */}
        <Pressable
          onPress={onPreview}
          role="button"
          aria-label="Session QR code. Tap to preview the audience view"
        >
          <SvgAsset
            source={require('../../../assets/images/qr-placeholder.svg')}
            width={60}
            height={60}
          />
        </Pressable>
        <View style={styles.side}>
          <View style={styles.text}>
            <Text style={styles.title}>Scan to request a song</Text>
            <Text style={styles.caption}>Tap the QR to preview the audience view</Text>
          </View>
          <Pressable
            onPress={onEnlarge}
            role="button"
            style={({ pressed }) => [styles.enlarge, pressed && styles.pressed]}
          >
            <Image
              source={require('../../../assets/images/icon-enlarge.svg')}
              style={styles.enlargeIcon}
            />
            <Text style={styles.enlargeLabel}>Enlarge</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.scene} pointerEvents="none">
        <Image
          source={require('../../../assets/images/dj-performance.png')}
          style={StyleSheet.absoluteFill}
          contentFit="fill"
          contentPosition="bottom"
        />
        <Vignette />
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  // Figma: 353×194 with 32pt padding, minus the 1pt border.
  card: {
    maxWidth: 353,
    height: 194,
    flexDirection: 'row',
    padding: 31,
  },
  tropical: {
    position: 'absolute',
    left: -11,
    top: 95,
    width: 193,
    height: 129,
    opacity: 0.1,
    mixBlendMode: 'color-dodge',
  },
  scene: {
    position: 'absolute',
    left: 181,
    top: -126,
    width: 302,
    height: 459,
    opacity: 0.22,
    mixBlendMode: 'color-dodge',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 24,
  },
  side: {
    gap: 24,
  },
  text: {
    width: 194,
    gap: 8,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 16,
    letterSpacing: 0.48,
    color: colors.white,
  },
  caption: {
    width: 141,
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 18.2,
    letterSpacing: 0.42,
    color: colors.textMuted,
  },
  enlarge: {
    width: 134,
    height: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 22,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.white,
    boxShadow: 'inset 0px 0px 4px 0px rgba(0, 0, 0, 0.09)',
  },
  pressed: {
    opacity: 0.8,
  },
  enlargeIcon: {
    width: 16,
    height: 16,
  },
  enlargeLabel: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
});
