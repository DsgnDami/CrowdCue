// TODO: replace with the signed-in DJ's real profile once there's a backend.
// Values from the Figma profile page (node 300:7405).

export type DjProfile = {
  /** Public DJ name, e.g. shown on Home and the profile page. */
  name: string;
  handle: string;
  bio: string;
  fullName: string;
  email: string;
  /** Local URI of a photo picked on the edit screen. */
  avatarUri: string | null;
};

export const initialProfile: DjProfile = {
  name: 'DJ Propane',
  handle: '@djpropane',
  bio: 'Open-format DJ. Clubs, weddings & festivals across the UK. Afrobeats · House · Hip-Hop. Booking below',
  fullName: '',
  email: '',
  avatarUri: null,
};
