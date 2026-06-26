import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import {
  togglePlay,
  playNext,
  playPrev,
  setCurrentTime,
  setVolume,
} from "@/redux/Player/PlayerSlice";
import { seekAudio } from "@/utils/audioSingleton";
import { Link } from "react-router-dom";
import { TRACK_PAGE } from "@/pathes";
import {
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdSkipPrevious,
  MdVolumeUp,
  MdVolumeOff,
} from "react-icons/md";

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? "0" : ""}${sec}`;
};

const MiniPlayer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentTrack, isPlaying, currentTime, duration, volume } =
    useSelector((state: RootState) => state.player);

  if (!currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seconds = Number(e.target.value);
    seekAudio(seconds);
    dispatch(setCurrentTime(seconds));
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setVolume(Number(e.target.value)));
  };

  return (
    // Mobile: sits above the bottom nav (bottom-14 ≈ 56px = nav height)
    // Desktop: sits at the very bottom, offset by the sidebar width (2/12 = 16.67%)
    <div className="fixed bottom-14 left-0 right-0 z-[900] lg:bottom-0 lg:left-[16.67%]">
      {/* thin progress bar on top */}
      <div className="h-[3px] w-full bg-white/10">
        <div
          className="h-full bg-white transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-3 bg-neutral-900/95 px-3 py-2 backdrop-blur-md lg:gap-5 lg:px-6 lg:py-3">
        {/* Album art + track info — clicking navigates to track page */}
        <Link
          to={`/${TRACK_PAGE}/${currentTrack.id}`}
          state={{
            url: currentTrack.url,
            imageUrl: currentTrack.imageUrl,
            musicName: currentTrack.musicName,
            singer: currentTrack.singer,
          }}
          className="flex min-w-0 flex-1 items-center gap-3"
        >
          <img
            src={currentTrack.imageUrl}
            alt={currentTrack.musicName}
            className="h-11 w-11 flex-shrink-0 rounded-lg object-cover shadow-lg"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {currentTrack.musicName}
            </p>
            <p className="truncate text-xs text-white/50">{currentTrack.singer}</p>
          </div>
        </Link>

        {/* Playback controls */}
        <div className="flex flex-shrink-0 items-center gap-2 text-white">
          <button
            onClick={() => dispatch(playPrev())}
            className="rounded-full p-1.5 text-xl text-white/70 transition hover:text-white"
            aria-label="Previous"
          >
            <MdSkipPrevious />
          </button>
          <button
            onClick={() => dispatch(togglePlay())}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-md transition-transform hover:scale-105"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <MdPause className="text-lg" />
            ) : (
              <MdPlayArrow className="text-lg" />
            )}
          </button>
          <button
            onClick={() => dispatch(playNext())}
            className="rounded-full p-1.5 text-xl text-white/70 transition hover:text-white"
            aria-label="Next"
          >
            <MdSkipNext />
          </button>
        </div>

        {/* Desktop-only: seek bar + timestamps */}
        <div className="hidden flex-1 items-center gap-2 lg:flex">
          <span className="w-9 text-right text-xs tabular-nums text-white/40">
            {fmt(currentTime)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="h-[3px] flex-1 cursor-pointer appearance-none rounded-full bg-white/20
              [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white"
          />
          <span className="w-9 text-xs tabular-nums text-white/40">{fmt(duration)}</span>
        </div>

        {/* Desktop-only: volume */}
        <div className="hidden items-center gap-2 lg:flex">
          <button
            onClick={() => dispatch(setVolume(volume > 0 ? 0 : 0.8))}
            className="text-lg text-white/60 transition hover:text-white"
            aria-label={volume > 0 ? "Mute" : "Unmute"}
          >
            {volume > 0 ? <MdVolumeUp /> : <MdVolumeOff />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={volume}
            onChange={handleVolume}
            className="h-[3px] w-24 cursor-pointer appearance-none rounded-full bg-white/20
              [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
