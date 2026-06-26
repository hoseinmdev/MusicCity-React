import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import {
  setCurrentTime,
  setDuration,
  setIsPlaying,
  playNext,
} from "@/redux/Player/PlayerSlice";
import { getAudio } from "@/utils/audioSingleton";
import { addToRecentlyPlayed } from "@/utils/recentlyPlayed";

const AudioManager = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentTrack, isPlaying, volume } = useSelector(
    (state: RootState) => state.player,
  );
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audio = getAudio();

  const clearTick = () => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  };

  const startTick = () => {
    clearTick();
    tickRef.current = setInterval(() => {
      dispatch(setCurrentTime(audio.currentTime));
    }, 500);
  };

  // New track: load + play
  useEffect(() => {
    if (!currentTrack) return;
    clearTick();
    addToRecentlyPlayed(currentTrack);

    audio.src = currentTrack.url;
    audio.volume = volume;
    audio.load();

    audio.onloadedmetadata = () => dispatch(setDuration(audio.duration));
    audio.onended = () => {
      clearTick();
      dispatch(playNext());
    };

    audio.play().catch(() => dispatch(setIsPlaying(false)));
    startTick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack?.id]);

  // Play / pause toggled
  useEffect(() => {
    if (isPlaying) {
      audio.play().catch(() => dispatch(setIsPlaying(false)));
      startTick();
    } else {
      audio.pause();
      clearTick();
    }
    return clearTick;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  // Volume changed
  useEffect(() => {
    audio.volume = volume;
  }, [audio, volume]);

  return null;
};

export default AudioManager;
