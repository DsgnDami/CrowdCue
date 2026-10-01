import { useAssets } from 'expo-asset';
import { View } from 'react-native';
import { SvgUri } from 'react-native-svg';

type Props = {
  source: number;
  width: number;
  height: number;
};

/**
 * Renders a bundled SVG file with react-native-svg's runtime parser.
 * Use this for SVGs with <filter> effects (blurs, drop shadows): expo-image's
 * native decoders and SVGR both drop filters. Plain SVGs can use expo-image.
 */
export function SvgAsset({ source, width, height }: Props) {
  const [assets] = useAssets(source);
  const asset = assets?.[0];
  // Reserve the space while loading so the layout doesn't shift.
  if (!asset) return <View style={{ width, height }} />;
  return <SvgUri uri={asset.localUri ?? asset.uri} width={width} height={height} />;
}
