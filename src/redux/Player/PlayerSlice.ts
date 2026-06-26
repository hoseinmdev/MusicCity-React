import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ITrack } from "../Tracks/TracksSlice";

interface PlayerState {
  currentTrack: ITrack | null;
  isPlaying: boolean;
  queue: ITrack[];
  volume: number;
  currentTime: number;
  duration: number;
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  queue: [],
  volume: 0.8,
  currentTime: 0,
  duration: 0,
};

const PlayerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentTrack(state, action: PayloadAction<ITrack>) {
      state.currentTrack = action.payload;
      state.isPlaying = true;
      state.currentTime = 0;
      state.duration = 0;
    },
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    togglePlay(state) {
      if (state.currentTrack) state.isPlaying = !state.isPlaying;
    },
    setQueue(state, action: PayloadAction<ITrack[]>) {
      state.queue = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    playNext(state) {
      if (!state.currentTrack || state.queue.length === 0) return;
      const idx = state.queue.findIndex((t) => t.id === state.currentTrack!.id);
      const next = state.queue[idx + 1] ?? state.queue[0];
      state.currentTrack = next;
      state.isPlaying = true;
      state.currentTime = 0;
      state.duration = 0;
    },
    playPrev(state) {
      if (!state.currentTrack || state.queue.length === 0) return;
      const idx = state.queue.findIndex((t) => t.id === state.currentTrack!.id);
      const prev = state.queue[idx - 1] ?? state.queue[state.queue.length - 1];
      state.currentTrack = prev;
      state.isPlaying = true;
      state.currentTime = 0;
      state.duration = 0;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  togglePlay,
  setQueue,
  setVolume,
  setCurrentTime,
  setDuration,
  playNext,
  playPrev,
} = PlayerSlice.actions;

export default PlayerSlice.reducer;
