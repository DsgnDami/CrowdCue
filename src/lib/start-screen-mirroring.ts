import { Alert, Linking, Platform } from 'react-native';

/**
 * Gets the big-screen QR onto a TV or projector using the phone's built-in
 * screen mirroring, then shows the full-screen preview.
 *
 * Starting a Chromecast/AirPlay session from inside the app needs native
 * casting libraries that Expo Go can't load, so this uses the system UI:
 * Android's Cast settings, iOS Control Center's Screen Mirroring, and the
 * browser's own Cast menu on web.
 */
export function startScreenMirroring(showPreview: () => void) {
  if (Platform.OS === 'android') {
    showPreview();
    Linking.sendIntent('android.settings.CAST_SETTINGS').catch(() =>
      Alert.alert(
        'Cast your screen',
        'Swipe down from the top of the screen, tap Cast or Screen cast, and choose your TV.',
      ),
    );
    return;
  }

  if (Platform.OS === 'ios') {
    Alert.alert(
      'Mirror to a TV',
      'Open Control Center, tap Screen Mirroring and choose your Apple TV or AirPlay display. The QR code will show full screen.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Show QR full screen', onPress: showPreview },
      ],
    );
    return;
  }

  // Web: Chrome and Edge can cast a tab from their own menu.
  window.alert('To show this on a TV, use your browser\'s Cast option (⋮ menu → Cast…).');
  showPreview();
}
