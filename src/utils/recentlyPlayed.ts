import type { ITrack } from "@/redux/Tracks/TracksSlice";

const KEY = "recentlyPlayed";
const MAX = 10;

export const addToRecentlyPlayed = (track: ITrack): void => {
  const stored = localStorage.getItem(KEY);
  const recent: ITrack[] = stored ? (JSON.parse(stored) as ITrack[]) : [];
  const filtered = recent.filter((t) => t.id !== track.id);
  localStorage.setItem(KEY, JSON.stringify([track, ...filtered].slice(0, MAX)));
};

export const getRecentlyPlayed = (): ITrack[] => {
  const stored = localStorage.getItem(KEY);
  return stored ? (JSON.parse(stored) as ITrack[]) : [];
};
