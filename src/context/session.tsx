import type { ImageSource } from 'expo-image';
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type RequestRules = {
  allowTips: boolean;
  allowMessages: boolean;
  explicitOk: boolean;
  requireTip: boolean;
};

export type LiveSession = {
  eventName: string;
  venue: string;
  rules: RequestRules;
  startedAt: number;
  /** Audience join link, shown under the event name and encoded in the QR. */
  joinUrl: string;
};

export type RequestStatus = 'new' | 'queued' | 'played' | 'rejected';

export type SongRequest = {
  id: string;
  title: string;
  artist: string;
  artwork: ImageSource | number;
  requester: string;
  message?: string;
  /** Tip in whole pounds. */
  tip?: number;
  requestedAt: number;
  status: RequestStatus;
};

type SessionContextValue = {
  session: LiveSession | null;
  requests: SongRequest[];
  startSession: (details: Pick<LiveSession, 'eventName' | 'venue' | 'rules'>) => void;
  endSession: () => void;
  updateRequest: (id: string, action: 'accept' | 'playNext' | 'later' | 'reject') => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

// TODO: replace with the DJ's real join code and live requests from the backend.
const JOIN_URL = 'crowdcue.app/j/PROPANE';

function mockRequests(): SongRequest[] {
  const at = new Date();
  at.setHours(20, 59, 0, 0);
  const requestedAt = at.getTime();
  return [
    {
      id: '1',
      title: 'MMS',
      artist: 'Asake & Wizkid',
      artwork: require('../../assets/images/mock/art-mms.png'),
      requester: 'Chris',
      message: 'Pleeeeease  🙏',
      tip: 5,
      requestedAt,
      status: 'new',
    },
    {
      id: '2',
      title: 'Golibe',
      artist: 'Fola',
      artwork: require('../../assets/images/mock/art-golibe.png'),
      requester: 'Amara',
      message: 'This one goes hard !!',
      tip: 5,
      requestedAt,
      status: 'new',
    },
    {
      id: '3',
      title: 'Alive',
      artist: 'Jorja Smith ft Wizkid',
      artwork: require('../../assets/images/mock/art-alive.png'),
      requester: 'Tara',
      message: 'This would match the mood',
      tip: 5,
      requestedAt,
      status: 'new',
    },
  ];
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<LiveSession | null>(null);
  const [requests, setRequests] = useState<SongRequest[]>([]);

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      requests,
      startSession: (details) => {
        setSession({ ...details, startedAt: Date.now(), joinUrl: JOIN_URL });
        setRequests(mockRequests());
      },
      endSession: () => {
        setSession(null);
        setRequests([]);
      },
      updateRequest: (id, action) =>
        setRequests((list) => {
          const target = list.find((r) => r.id === id);
          if (!target) return list;
          const rest = list.filter((r) => r.id !== id);
          switch (action) {
            case 'accept':
              return list.map((r) => (r.id === id ? { ...r, status: 'queued' } : r));
            case 'playNext':
              return [{ ...target, status: 'queued' }, ...rest];
            case 'later':
              return [...rest, target];
            case 'reject':
              return list.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r));
          }
        }),
    }),
    [session, requests],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error('useSession must be used inside <SessionProvider>');
  return value;
}
