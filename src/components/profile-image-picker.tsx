import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { ImageIcon } from '@/components/icons';
import { colors, fonts } from '@/constants/theme';

type Props = {
  uri: string | null;
  onChange: (uri: string) => void;
};

export function ProfileImagePicker({ uri, onChange }: Props) {
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Allow photo access to choose a profile image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) onChange(result.assets[0].uri);
  };

  return (
    <Pressable
      style={styles.row}
      onPress={pickImage}
      accessibilityRole="button"
      accessibilityLabel={uri ? 'Change profile image' : 'Choose profile image'}
    >
      <View style={styles.tile}>
        <ImageIcon />
        {uri && <Image source={{ uri }} style={StyleSheet.absoluteFill} contentFit="cover" />}
      </View>
      <View style={styles.text}>
        <Text style={styles.title}>Profile Image</Text>
        <Text style={styles.caption}>Shown to your audience when they join</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  // 60×60 tile: Figma's 14.286 padding is measured from the outer edge, so
  // subtract the 1.19 border.
  tile: {
    padding: 13.096,
    borderRadius: 19.048,
    borderWidth: 1.19,
    borderColor: 'rgba(30, 30, 31, 0.52)',
    backgroundColor: '#101111',
    overflow: 'hidden',
  },
  text: {
    flex: 1,
    gap: 8,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 16,
    letterSpacing: 0.48,
    color: colors.white,
  },
  caption: {
    maxWidth: 141,
    fontFamily: fonts.medium,
    fontSize: 12,
    letterSpacing: 0.36,
    color: colors.textMuted,
  },
});
