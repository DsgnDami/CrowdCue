import { Image, type ImageSource } from 'expo-image';
import { StyleSheet, View } from 'react-native';

type Percent = `${number}%`;

export type IconLayer = {
  source: ImageSource | number;
  /** [top, right, bottom, left] insets within the icon box, as in Figma. */
  inset?: [Percent, Percent, Percent, Percent];
};

type Props = {
  size: number;
  layers: IconLayer[];
};

/** Icon composed of stacked Figma vector layers, each placed at its inset. */
export function LayeredIcon({ size, layers }: Props) {
  return (
    <View style={[styles.box, { width: size, height: size }]}>
      {layers.map(({ source, inset = ['0%', '0%', '0%', '0%'] }, i) => (
        <Image
          key={i}
          source={source}
          contentFit="fill"
          style={[
            styles.layer,
            { top: inset[0], right: inset[1], bottom: inset[2], left: inset[3] },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    overflow: 'hidden',
  },
  layer: {
    position: 'absolute',
  },
});
