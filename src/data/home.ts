// TODO: replace with the signed-in DJ's real profile, stats and events once
// there's a backend. These match the Figma home page (node 260:226).

export const homeStats = {
  requests: 37,
  tipsThisWeek: 248.5,
};

export type HomeEvent = {
  id: string;
  date: Date;
  title: string;
  subtitle: string;
  /** Tips earned, for past sessions. */
  tips?: number;
};

const aug1 = new Date(2026, 7, 1);

export const upcomingEvents: HomeEvent[] = [
  { id: 'u1', date: aug1, title: 'Neon Nights - Club Vertigo', subtitle: 'Sat · 22:00 – 03:00 · Manchester' },
  { id: 'u2', date: aug1, title: 'Neon Nights - Club Vertigo', subtitle: 'Sat · 22:00 – 03:00 · Manchester' },
  { id: 'u3', date: aug1, title: 'Neon Nights - Club Vertigo', subtitle: 'Sat · 22:00 – 03:00 · Manchester' },
];

export const previousSessions: HomeEvent[] = [
  { id: 'p1', date: aug1, title: 'Neon Nights - Club Vertigo', subtitle: 'Sat · 22:00 – 03:00 · Manchester', tips: 86 },
  { id: 'p2', date: aug1, title: 'Neon Nights - Club Vertigo', subtitle: 'Sat · 22:00 – 03:00 · Manchester', tips: 86 },
  { id: 'p3', date: aug1, title: 'Neon Nights - Club Vertigo', subtitle: 'Sat · 22:00 – 03:00 · Manchester', tips: 86 },
];

export const formatPounds = (amount: number) => `£${amount.toFixed(2)}`;
