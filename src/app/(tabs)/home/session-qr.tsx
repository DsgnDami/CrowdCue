import * as Clipboard from 'expo-clipboard';
import { Image, type ImageSource } from 'expo-image';
import { Redirect, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomFade } from '@/components/bottom-fade';
import { GlassCard } from '@/components/glass-card';
import { JoinQrCode } from '@/components/join-qr-code';
import { ScreenHeader } from '@/components/screen-header';
import { colors, fonts } from '@/constants/theme';
import { useSession } from '@/context/session';
import { saveQrPng } from '@/lib/save-qr-png';
import { startScreenMirroring } from '@/lib/start-screen-mirroring';

const goBack = () => (router.canGoBack() ? router.back() : router.replace('/home'));
const showPreview = () => router.push('/present');

// nativeID of the QR wrapper, used to find the rendered <svg> on web.
const QR_CONTAINER_ID = 'session-qr-code';

type Tile = 'download' | 'copy' | 'share';

// Figma frame: "iPhone 16 - 16" (node 300:6703), 393×852.
export default function SessionQr() {
  const insets = useSafeAreaInsets();
  const { session } = useSession();
  // Short confirmation shown in place of a tile's label, e.g. "Copied".
  const [flash, setFlash] = useState<{ tile: Tile; label: string } | null>(null);
  const qrSvg = useRef<unknown>(null);

  useEffect(() => {
    if (!flash) return;
    const timer = setTimeout(() => setFlash(null), 1800);
    return () => clearTimeout(timer);
  }, [flash]);

  // Only reachable while live; e.g. a reload drops the in-memory session.
  if (!session) return <Redirect href="/home" />;

  const link = `https://${session.joinUrl}`;
  const code = session.joinUrl.split('/').pop() ?? 'session';
  const labelFor = (tile: Tile, label: string) => (flash?.tile === tile ? flash.label : label);

  const copyLink = async () => {
    await Clipboard.setStringAsync(link);
    setFlash({ tile: 'copy', label: 'Copied' });
  };

  const handleShare = async () => {
    // Desktop browsers often lack a share sheet; copy the link instead.
    if (Platform.OS === 'web' && !navigator.share) {
      await Clipboard.setStringAsync(link);
      setFlash({ tile: 'share', label: 'Link copied' });
      return;
    }
    try {
      await Share.share({ message: `Request a song at ${session.eventName}: ${link}` });
    } catch {
      // Dismissed by the user.
    }
  };

  const handleDownload = async () => {
    try {
      const result = await saveQrPng(qrSvg.current, QR_CONTAINER_ID, `crowdcue-qr-${code}.png`);
      if (result === 'denied') {
        Alert.alert('Allow photo access', 'CrowdCue needs permission to save the QR code to Photos.');
        return;
      }
      setFlash({ tile: 'download', label: result === 'saved' ? 'Saved to Photos' : 'Downloaded' });
    } catch {
      Alert.alert('Couldn\'t save the QR code', 'Please try again.');
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: Math.max(insets.top, 70) }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ScreenHeader title="Session QR code" onBack={goBack} />
        </View>

        <View style={styles.qr} nativeID={QR_CONTAINER_ID}>
          <JoinQrCode
            value={link}
            size={195}
            getRef={(svg) => {
              qrSvg.current = svg;
            }}
          />
        </View>

        <View style={styles.details}>
          <Text style={styles.link}>{session.joinUrl}</Text>
          <Text style={styles.event}>{session.eventName}</Text>
        </View>

        <GlassCard style={styles.panel}>
          <Pressable
            onPress={showPreview}
            role="button"
            aria-label="Present on big screen. Full-screen display for projectors, TVs and venue screens"
            style={({ pressed }) => [styles.present, pressed && styles.pressed]}
          >
            <View style={styles.presentText}>
              <ScreenIcon />
              <View style={styles.presentCopy}>
                <Text style={styles.presentTitle}>Present on big screen</Text>
                <Text style={styles.presentCaption}>
                  Full-screen display for projectors, TVs & venue screen
                </Text>
              </View>
            </View>
            <View style={styles.preview}>
              <Text style={styles.previewText}>Preview</Text>
              <Image
                source={require('../../../../assets/images/icon-arrow-right.svg')}
                style={styles.previewIcon}
              />
            </View>
          </Pressable>

          <View style={styles.grid}>
            <View style={styles.gridRow}>
              <ActionTile
                label={labelFor('download', 'Download PNG')}
                icon={require('../../../../assets/images/icon-download.svg')}
                iconSize={32}
                onPress={handleDownload}
              />
              <ActionTile
                label={labelFor('copy', 'Copy link')}
                icon={require('../../../../assets/images/icon-link.svg')}
                iconSize={32}
                onPress={copyLink}
                badge={require('../../../../assets/images/icon-copy.svg')}
              />
            </View>
            <View style={styles.gridRow}>
              <ActionTile
                label={labelFor('share', 'Share')}
                icon={require('../../../../assets/images/icon-share.svg')}
                iconSize={36}
                onPress={handleShare}
              />
              <ActionTile
                label="Cast/Airplay"
                icon={require('../../../../assets/images/icon-cast.svg')}
                iconSize={36}
                onPress={() => startScreenMirroring(showPreview)}
              />
            </View>
          </View>
        </GlassCard>
      </ScrollView>
      <BottomFade />
    </View>
  );
}

/** Screen-with-stand icon, layered from the design's two vector parts. */
function ScreenIcon() {
  return (
    <View style={styles.screenIcon}>
      <Image
        source={require('../../../../assets/images/icon-screen-base.png')}
        style={[styles.layer, { top: '7.14%', right: '3.33%', bottom: '19.46%', left: '4.17%' }]}
      />
      <Image
        source={require('../../../../assets/images/icon-screen-stand.svg')}
        style={[styles.layer, { top: '58.57%', right: '31.8%', bottom: '7.14%', left: '30.98%' }]}
      />
    </View>
  );
}

type ActionTileProps = {
  label: string;
  icon: ImageSource | number;
  iconSize: number;
  onPress: () => void;
  /** Small icon in the top-right corner (Copy link). */
  badge?: ImageSource | number;
};

function ActionTile({ label, icon, iconSize, onPress, badge }: ActionTileProps) {
  return (
    <Pressable
      onPress={onPress}
      role="button"
      aria-label={label}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <Image source={icon} style={{ width: iconSize, height: iconSize }} />
      <Text style={styles.tileLabel}>{label}</Text>
      {badge && <Image source={badge} style={styles.badge} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    minHeight: 0,
    backgroundColor: colors.background,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    // Clear the floating tab bar.
    paddingBottom: 120,
  },
  // Figma: 359pt wide from x=20, so it starts at the left padding and runs
  // 6pt past the right one.
  header: {
    alignSelf: 'flex-start',
    width: '100%',
    maxWidth: 359,
  },
  // QR at y=140; the header ends at 70 + 38.4.
  qr: {
    marginTop: 31.6,
  },
  details: {
    width: 194,
    marginTop: 24,
    alignItems: 'center',
    gap: 4,
  },
  link: {
    fontFamily: fonts.medium,
    fontSize: 16,
    letterSpacing: 0.48,
    color: colors.white,
    textAlign: 'center',
  },
  event: {
    fontFamily: fonts.medium,
    fontSize: 14,
    lineHeight: 18.2,
    letterSpacing: 0.42,
    color: colors.textMuted,
    textAlign: 'center',
  },
  // Figma: 353pt wide at y=432, 32/20/24 padding minus the 1pt border.
  panel: {
    maxWidth: 353,
    marginTop: 31.8,
    borderRadius: 40,
    paddingTop: 31,
    paddingBottom: 23,
    paddingHorizontal: 19,
    gap: 24,
  },
  present: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
  },
  presentText: {
    flex: 1,
    gap: 12,
  },
  screenIcon: {
    width: 24,
    height: 18.667,
    overflow: 'hidden',
  },
  layer: {
    position: 'absolute',
  },
  presentCopy: {
    gap: 4,
  },
  presentTitle: {
    fontFamily: fonts.medium,
    fontSize: 16,
    letterSpacing: 0.48,
    color: colors.white,
  },
  presentCaption: {
    width: 182,
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.textMuted,
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  previewText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textMuted,
  },
  previewIcon: {
    width: 16,
    height: 16,
  },
  // 2×2 grid, 230pt tall with 8pt gaps.
  grid: {
    height: 230,
    gap: 8,
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  // Figma: 24pt padding, minus the 1pt border.
  tile: {
    flex: 1,
    gap: 12,
    padding: 23,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.tileBorder,
    backgroundColor: colors.tileFill,
    overflow: 'hidden',
  },
  tileLabel: {
    fontFamily: fonts.medium,
    fontSize: 14,
    letterSpacing: 0.42,
    color: colors.white,
  },
  // Figma: 16pt icon at x=115.5, y=23 in a 152.5pt-wide tile.
  badge: {
    position: 'absolute',
    top: 22,
    right: 20,
    width: 16,
    height: 16,
  },
  pressed: {
    opacity: 0.8,
  },
});
