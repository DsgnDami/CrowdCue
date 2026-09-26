import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type TextInput,
} from 'react-native';

import { AuthCard, AuthSwitchPrompt } from '@/components/auth-card';
import { OutlineButton, PrimaryButton } from '@/components/button';
import { LockIcon, MailIcon } from '@/components/icons';
import { SvgAsset } from '@/components/svg-asset';
import { TextField } from '@/components/text-field';
import { colors, fonts } from '@/constants/theme';

// Figma frame: "iPhone 16 - 8" (node 155:1316), 393×852.
export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef<TextInput>(null);

  // TODO: authenticate before entering the app; wire up the rest once auth and
  // the password-reset screen exist.
  const handleLogIn = () => router.replace('/home');
  const handleForgotPassword = () => {};
  const handleAppleSignIn = () => {};
  const handleGoogleSignIn = () => {};
  const handleCreateAccount = () => router.push('/sign-up');

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Blurred purple/blue glow behind the logo (includes its blur bleed).
            Clipped so it can't widen the scroll area past the screen edge. */}
        <View style={styles.glowClip} pointerEvents="none">
          <View style={styles.glow}>
            <SvgAsset source={require('../../assets/images/glow.svg')} width={418} height={326} />
          </View>
        </View>

        {/* The SVG includes its drop shadow, so it overflows the 166×84.375 logo slot. */}
        <View style={styles.logo}>
          <SvgAsset
            source={require('../../assets/images/crowdcue-logo.svg')}
            width={170.869}
            height={95.9853}
          />
        </View>

        <View style={styles.column}>
          <View style={styles.heading}>
            <Text style={styles.title} accessibilityRole="header">
              Welcome back
            </Text>
            <Text style={styles.subtitle}>Log in to run your next session.</Text>
          </View>

          <AuthCard>
            <View style={styles.form}>
              <View style={styles.fields}>
                <TextField
                  icon={<MailIcon />}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  submitBehavior="submit"
                />
                <TextField
                  ref={passwordRef}
                  icon={<LockIcon />}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="current-password"
                  textContentType="password"
                  returnKeyType="done"
                  onSubmitEditing={handleLogIn}
                  accessory={
                    <Pressable onPress={handleForgotPassword} accessibilityRole="link" hitSlop={8}>
                      <Text style={styles.forgot}>Forgot password?</Text>
                    </Pressable>
                  }
                />
              </View>
              <PrimaryButton label="Log In" onPress={handleLogIn} />
            </View>

            <View style={styles.alternatives}>
              <View style={styles.socialButtons}>
                <OutlineButton
                  label="Continue with Apple"
                  icon={require('../../assets/images/icon-apple.svg')}
                  onPress={handleAppleSignIn}
                />
                <OutlineButton
                  label="Continue with Google"
                  icon={require('../../assets/images/icon-google.svg')}
                  onPress={handleGoogleSignIn}
                />
              </View>
              <AuthSwitchPrompt
                prompt="New to CrowdCue?"
                action="Create account"
                onPress={handleCreateAccount}
              />
            </View>
          </AuthCard>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 105,
    paddingBottom: 40,
    paddingHorizontal: 17,
  },
  glowClip: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 228,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: -98,
    left: '50%',
    marginLeft: -136.5,
  },
  logo: {
    width: 166,
    height: 84.375,
    overflow: 'visible',
  },
  column: {
    width: '100%',
    maxWidth: 359,
    marginTop: 77.625,
    alignItems: 'center',
    gap: 40,
  },
  heading: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 38.4,
    color: colors.white,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.textSubtle,
    textAlign: 'center',
  },
  form: {
    gap: 32,
  },
  fields: {
    gap: 32,
  },
  forgot: {
    flexShrink: 0,
    fontFamily: fonts.medium,
    fontSize: 14,
    letterSpacing: 0.42,
    color: colors.textSubtle,
    textAlign: 'right',
  },
  alternatives: {
    alignItems: 'center',
    gap: 24,
  },
  socialButtons: {
    width: '100%',
    gap: 12,
  },
});
