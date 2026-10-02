import { Alert, Platform } from 'react-native';

/**
 * Asks the user to confirm a destructive action, then runs it. Uses a native
 * alert on iOS/Android and the browser's confirm dialog on web, where
 * Alert.alert does nothing.
 */
export function confirmAction(
  title: string,
  message: string,
  confirmLabel: string,
  onConfirm: () => void,
) {
  if (Platform.OS === 'web') {
    if (window.confirm(`${title}\n${message}`)) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: 'Cancel', style: 'cancel' },
    { text: confirmLabel, style: 'destructive', onPress: onConfirm },
  ]);
}
