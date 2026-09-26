export const colors = {
  background: '#0e0f0f',
  white: '#ffffff',
  textMuted: '#818486',
  textSubtle: '#555759',
  textOnLight: '#383a3b',
  border: '#3a3a3c',
  cardBorder: 'rgba(255, 255, 255, 0.05)',
  cardFill: 'rgba(255, 255, 255, 0.02)',
} as const;

// Keys must match the names registered with useFonts in src/app/_layout.tsx.
export const fonts = {
  display: 'BehindTheNineties-Regular',
  medium: 'SFProRounded-Medium',
  semibold: 'SFProRounded-Semibold',
} as const;

export const fontSources = {
  [fonts.display]: require('../../assets/fonts/Behind-The-Nineties-Rg.otf'),
  [fonts.medium]: require('../../assets/fonts/SF-Pro-Rounded-Medium.otf'),
  [fonts.semibold]: require('../../assets/fonts/SF-Pro-Rounded-Semibold.otf'),
};
