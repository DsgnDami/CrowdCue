import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { GlassCard } from '@/components/glass-card';
import { colors, fonts } from '@/constants/theme';

/** Frosted card that holds the auth forms. */
export function AuthCard({ children }: { children: ReactNode }) {
  return <GlassCard style={styles.card}>{children}</GlassCard>;
}

type SwitchPromptProps = {
  prompt: string;
  action: string;
  onPress: () => void;
};

/** "New to CrowdCue? Create account"-style line linking between auth screens. */
export function AuthSwitchPrompt({ prompt, action, onPress }: SwitchPromptProps) {
  return (
    <View style={styles.prompt}>
      <Text style={styles.promptText}>{prompt}</Text>
      <Pressable onPress={onPress} accessibilityRole="link" hitSlop={8}>
        <Text style={[styles.promptText, styles.promptAction]}>{action}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // Figma: 48/40 padding, minus the 1pt border.
  card: {
    gap: 24,
    paddingTop: 47,
    paddingBottom: 39,
    paddingHorizontal: 39,
  },
  prompt: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8,
  },
  promptText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.textMuted,
  },
  promptAction: {
    color: colors.white,
  },
});
