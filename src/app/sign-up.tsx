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
import { PrimaryButton } from '@/components/button';
import { EnvelopeIcon, HeadphonesIcon, PadlockIcon, PersonIcon } from '@/components/icons';
import { ProfileImagePicker } from '@/components/profile-image-picker';
import { ScreenHeader } from '@/components/screen-header';
import { SvgAsset } from '@/components/svg-asset';
import { TextField } from '@/components/text-field';
import { colors, fonts } from '@/constants/theme';

const goToSignIn = () => (router.canGoBack() ? router.back() : router.replace('/sign-in'));

// Figma frame: "iPhone 16 - 9" (node 155:1373), 393×852.
export default function SignUp() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [djName, setDjName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const djNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // TODO: create the account before entering the app; wire up password reset
  // once that screen exists.
  const handleCreateAccount = () => router.replace('/home');
  const handleForgotPassword = () => {};

  return (
    <View style={styles.screen}>
      {/* Blurred purple/blue glow anchored to the bottom of the screen. Clipped
          so it can't make the screen scrollable sideways. */}
      <View style={styles.glowClip} pointerEvents="none">
        <View style={styles.glow}>
          <SvgAsset source={require('../../assets/images/glow.svg')} width={418} height={326} />
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
            <ScreenHeader title="Create account" onBack={goToSignIn} />

            <AuthCard>
              <ProfileImagePicker uri={profileImage} onChange={setProfileImage} />

              <View style={styles.form}>
                <View style={styles.fields}>
                  <TextField
                    icon={<PersonIcon />}
                    placeholder="Full name"
                    value={fullName}
                    onChangeText={setFullName}
                    autoCapitalize="words"
                    autoComplete="name"
                    textContentType="name"
                    returnKeyType="next"
                    onSubmitEditing={() => djNameRef.current?.focus()}
                    submitBehavior="submit"
                  />
                  <TextField
                    ref={djNameRef}
                    icon={<HeadphonesIcon />}
                    placeholder="DJ name"
                    value={djName}
                    onChangeText={setDjName}
                    autoCapitalize="words"
                    autoComplete="nickname"
                    textContentType="nickname"
                    returnKeyType="next"
                    onSubmitEditing={() => emailRef.current?.focus()}
                    submitBehavior="submit"
                  />
                  <TextField
                    ref={emailRef}
                    icon={<EnvelopeIcon />}
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
                    icon={<PadlockIcon />}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="new-password"
                    textContentType="newPassword"
                    returnKeyType="done"
                    onSubmitEditing={handleCreateAccount}
                    accessory={
                      <Pressable
                        onPress={handleForgotPassword}
                        accessibilityRole="link"
                        hitSlop={8}
                      >
                        <Text style={styles.forgot}>Forgot password?</Text>
                      </Pressable>
                    }
                  />
                </View>
                <PrimaryButton label="Create Account" onPress={handleCreateAccount} />
              </View>

              <AuthSwitchPrompt
                prompt="Already have an account"
                action="Log in"
                onPress={goToSignIn}
              />
            </AuthCard>
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
  glowClip: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 230,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    bottom: -96,
    left: '50%',
    marginLeft: -136.5,
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
    gap: 40,
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
});
