import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { initialProfile, type DjProfile } from '@/data/profile';

type ProfileContextValue = {
  profile: DjProfile;
  updateProfile: (changes: Partial<DjProfile>) => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

/** The signed-in DJ's profile. TODO: load and save it via the backend. */
export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(initialProfile);
  const value = useMemo<ProfileContextValue>(
    () => ({
      profile,
      updateProfile: (changes) => setProfile((p) => ({ ...p, ...changes })),
    }),
    [profile],
  );
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const value = useContext(ProfileContext);
  if (!value) throw new Error('useProfile must be used inside <ProfileProvider>');
  return value;
}
