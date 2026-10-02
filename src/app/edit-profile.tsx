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

import { AuthCard } from '@/components/auth-card';
import { PrimaryButton } from '@/components/button';
import { EnvelopeIcon, HeadphonesIcon, PadlockIcon, PersonIcon } from '@/components/icons';
import { ProfileImagePicker } from '@/components/profile-image-picker';
import { ScreenHeader } from '@/components/screen-header';
import { SvgAsset } from '@/components/svg-asset';
import { TextField } from '@/components/text-field';
import { colors, fonts } from '@/constants/theme';
import { useProfile } from '@/context/profile';

const goBack = () => (router.canGoBack() ? router.back() : router.replace('/profile'));

// Figma frame: "iPhone 16 - 19" (node 308:7534), 393×852.
export default function EditProfile() {
  const { profile, updateProfile } = useProfile();
  const [avatarUri, setAvatarUri] = useState(profile.avatarUri);
  const [fullName, setFullName] = useState(profile.fullName);
  const [djName, setDjName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState('');
  const djNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // TODO: save to the backend, and change the password through the auth
  // provider (the new password isn't stored anywhere yet).
  const handleSave = () => {
    updateProfile({
      avatarUri,
      fullName: fullName.trim(),
      // The DJ name is shown everywhere, so keep the old one if it's cleared.
      name: djName.trim() || profile.name,
      email: email.trim(),
    });
    goBack();
  };
  // TODO: wire up once the password-reset screen exists.
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
            <ScreenHeader title="Edit Profile" onBack={goBack} />

            <AuthCard>
              <ProfileImagePicker uri={avatarUri} onChange={setAvatarUri} />

              <View style={styles.form}>
                <View style={styles.fields}>
                  <TextField
                    icon={<PersonIcon />}
                    placeholder="Full name"
                    placeholderTextColor={colors.white}
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
                    placeholderTextColor={colors.white}
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
                    placeholderTextColor={colors.white}
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
                    placeholderTextColor={colors.white}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="new-password"
                    textContentType="newPassword"
                    returnKeyType="done"
                    onSubmitEditing={handleSave}
                    accessory={
                      <Pressable onPress={handleForgotPassword} role="link" hitSlop={8}>
                        <Text style={styles.forgot}>Forgot password?</Text>
                      </Pressable>
                    }
                  />
                </View>
                <PrimaryButton label="Save Changes" onPress={handleSave} />
              </View>
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
  // 318×226 glow box at x=110, y=672; the SVG adds 50pt of blur bleed.
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
