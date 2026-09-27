import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type TextInput,
} from 'react-native';

import { PrimaryButton } from '@/components/button';
import { GlassCard } from '@/components/glass-card';
import { PencilIcon, VenueIcon } from '@/components/icons';
import { ScreenHeader } from '@/components/screen-header';
import { TextField } from '@/components/text-field';
import { ToggleChip } from '@/components/toggle-chip';
import { colors, fonts } from '@/constants/theme';
import { useSession } from '@/context/session';

const REQUEST_RULES = [
  { key: 'allowTips', label: 'Allow tips' },
  { key: 'allowMessages', label: 'Allow messages' },
  { key: 'explicitOk', label: 'Explicit songs OK' },
  { key: 'requireTip', label: 'Requests need tip' },
] as const;

type RuleKey = (typeof REQUEST_RULES)[number]['key'];

const goBack = () => (router.canGoBack() ? router.back() : router.replace('/home'));

// Figma frame: "iPhone 16 - 11" (node 157:1773), 393×852.
export default function NewSession() {
  const [eventName, setEventName] = useState('');
  const [venue, setVenue] = useState('');
  const [rules, setRules] = useState<Record<RuleKey, boolean>>({
    allowTips: true,
    allowMessages: true,
    explicitOk: false,
    requireTip: false,
  });
  const venueRef = useRef<TextInput>(null);
  const { startSession } = useSession();

  const toggleRule = (key: RuleKey) => setRules((r) => ({ ...r, [key]: !r[key] }));

  // TODO: create the session on the backend; this starts a local one.
  const handleGoLive = () => {
    startSession({ eventName: eventName.trim() || 'Live session', venue: venue.trim(), rules });
    goBack();
  };

  return (
    <View style={styles.screen}>
      {/* Decorative orb peeking up from the bottom edge. Clipped so it can't
          make the screen scrollable sideways. */}
      <View style={styles.orbClip} pointerEvents="none">
        <View style={styles.orb}>
          <Image
            source={require('../../assets/images/session-orb.png')}
            style={StyleSheet.absoluteFill}
            contentFit="fill"
            contentPosition="bottom"
          />
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.column}>
            <ScreenHeader title="New live session" onBack={goBack} />

            <GlassCard style={styles.card}>
              <View style={styles.settings}>
                <View style={styles.fields}>
                  <TextField
                    icon={<PencilIcon />}
                    placeholder="Event name"
                    value={eventName}
                    onChangeText={setEventName}
                    autoCapitalize="words"
                    returnKeyType="next"
                    onSubmitEditing={() => venueRef.current?.focus()}
                    submitBehavior="submit"
                  />
                  <TextField
                    ref={venueRef}
                    icon={<VenueIcon />}
                    placeholder="Venue"
                    placeholderHint="(optional)"
                    value={venue}
                    onChangeText={setVenue}
                    autoCapitalize="words"
                    returnKeyType="done"
                  />
                </View>

                <View style={styles.rules}>
                  <Text style={styles.rulesLabel}>Request rules</Text>
                  <View style={styles.chips}>
                    {REQUEST_RULES.map(({ key, label }) => (
                      <ToggleChip
                        key={key}
                        label={label}
                        selected={rules[key]}
                        onToggle={() => toggleRule(key)}
                      />
                    ))}
                  </View>
                </View>
              </View>

              <View style={styles.footer}>
                <View style={styles.note}>
                  <Image
                    source={require('../../assets/images/icon-info.svg')}
                    style={styles.noteIcon}
                  />
                  <Text style={styles.noteText}>
                    Your QR code is generated when the session starts. Put it on a screen or
                    print it near the booth.
                  </Text>
                </View>
                <PrimaryButton
                  label="Go Live"
                  onPress={handleGoLive}
                  icon={
                    <Image
                      source={require('../../assets/images/icon-play-small.svg')}
                      style={styles.playIcon}
                    />
                  }
                />
              </View>
            </GlassCard>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
  },
  // Has the screen background so the orb's blend mode has a backdrop even if
  // the clip becomes its own layer.
  orbClip: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 90,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  // 500×213 at y=762 in Figma, so it runs 123pt past the bottom edge.
  orb: {
    position: 'absolute',
    bottom: -123,
    left: '50%',
    marginLeft: -249.5,
    width: 500,
    height: 213,
    mixBlendMode: 'difference',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 72,
    paddingBottom: 40,
    paddingHorizontal: 17,
  },
  column: {
    width: '100%',
    maxWidth: 359,
    gap: 28,
  },
  // Figma: 48/40 padding, minus the 1pt border.
  card: {
    gap: 32,
    paddingTop: 47,
    paddingBottom: 39,
    paddingHorizontal: 39,
  },
  settings: {
    gap: 40,
  },
  fields: {
    gap: 32,
  },
  rules: {
    gap: 12,
  },
  rulesLabel: {
    fontFamily: fonts.medium,
    fontSize: 12,
    letterSpacing: 0.36,
    color: colors.textMuted,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  footer: {
    gap: 16,
  },
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#1b1c1d',
  },
  // Figma flips the info icon vertically.
  noteIcon: {
    width: 16,
    height: 16,
    transform: [{ scaleY: -1 }],
  },
  // Three 14pt lines = Figma's fixed 42pt text box.
  noteText: {
    width: 208,
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.36,
    color: colors.textMuted,
  },
  playIcon: {
    width: 16,
    height: 16,
  },
});
