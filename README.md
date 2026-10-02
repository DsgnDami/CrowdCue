# CrowdCue

Expo (SDK 57) + Expo Router app for DJs to run live request sessions.

## Setup

```bash
npm install
```

### Fonts

The font files aren't committed because their licences don't allow
redistribution. Copy these into `assets/fonts/` before running the app:

- `Behind-The-Nineties-Rg.otf`
- `Behind-The-Nineties-Md.otf`
- `SF-Pro-Rounded-Regular.otf`
- `SF-Pro-Rounded-Medium.otf`
- `SF-Pro-Rounded-Semibold.otf`

They're loaded in `src/app/_layout.tsx` (sources listed in `src/constants/theme.ts`).

## Run

```bash
npx expo start
```

Scan the QR code with Expo Go, or press `w` for the web build.

## Screens

- `/` splash → `/sign-in` ↔ `/sign-up` → `/home` (tabs: home, live, profile) → `/new-session`
