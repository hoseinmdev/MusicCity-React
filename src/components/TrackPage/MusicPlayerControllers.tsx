import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  AiFillFolderAdd,
  AiFillHeart,
  AiFillPlayCircle,
  AiFillStepBackward,
  AiFillStepForward,
  AiOutlineCloudDownload,
  AiOutlineHeart,
  AiOutlineLoading3Quarters,
  AiOutlinePause,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { RiUserHeartLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import {
  togglePlay,
  playNext,
  playPrev,
  setCurrentTime,
} from "@/redux/Player/PlayerSlice";
import { seekAudio } from "@/utils/audioSingleton";
import PlayedTrack from "@/utils/getTrackFromUrl";
import type { ITrack } from "@/redux/Tracks/TracksSlice";

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? "0" : ""}${sec}`;
};

const MusicPlayerControllers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isPlaying, currentTime, duration } = useSelector(
    (state: RootState) => state.player,
  );

  const isLoading = duration === 0;
  const fillPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seconds = Number(e.target.value);
    seekAudio(seconds);
    dispatch(setCurrentTime(seconds));
  };

  const renderPlayIcon = () => {
    if (isLoading) {
      return (
        <div className="animate-spin">
          <AiOutlineLoading3Quarters />
        </div>
      );
    }
    if (isPlaying) return <AiOutlinePause />;
    return (
      <div className="animate-bounce">
        <AiFillPlayCircle />
      </div>
    );
  };

  return (
    <div className="fadeShow2 flex h-full w-full flex-col justify-between gap-8 text-white lg:justify-center lg:gap-10 lg:pt-0">
      <MusicName />

      {/* Progress bar */}
      <div className="flex w-full flex-col gap-2">
        <input
          onChange={handleSeek}
          min={0}
          max={duration || 100}
          value={currentTime}
          type="range"
          style={{
            background: `linear-gradient(to right, white ${fillPct}%, rgba(255,255,255,0.25) ${fillPct}%)`,
          }}
          className="h-[4px] w-full cursor-pointer appearance-none rounded-full outline-none
            [&::-webkit-slider-runnable-track]:h-[4px] [&::-webkit-slider-runnable-track]:rounded-full
            [&::-webkit-slider-runnable-track]:bg-transparent
            [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:h-[16px]
            [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:shadow-md"
        />
        <div className="flex w-full justify-between text-xs text-white/60">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex w-full items-center justify-between">
        <button
          onClick={() => dispatch(playPrev())}
          className="rounded-full p-3 text-2xl text-white/70 transition-all hover:text-white lg:cursor-pointer"
          aria-label="Previous"
        >
          <AiFillStepBackward />
        </button>

        <button
          onClick={() => dispatch(togglePlay())}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl text-black shadow-lg transition-transform hover:scale-105 lg:cursor-pointer"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {renderPlayIcon()}
        </button>

        <button
          onClick={() => dispatch(playNext())}
          className="rounded-full p-3 text-2xl text-white/70 transition-all hover:text-white lg:cursor-pointer"
          aria-label="Next"
        >
          <AiFillStepForward />
        </button>
      </div>

      <MusicOptions />
    </div>
  );
};

const MusicName = () => {
  const [liked, setLiked] = useState(false);
  const trackToPlay = PlayedTrack();

  useEffect(() => {
    const stored = localStorage.getItem("favorite") || "";
    const isInFavorites = stored
      ? JSON.parse(stored).find((t: ITrack) => t.id === trackToPlay?.id)
      : null;
    setLiked(!!isInFavorites);
  }, [trackToPlay?.id]);

  const addToFavoritesHandler = () => {
    const stored = localStorage.getItem("favorite") || "";
    const isInFavorites = stored
      ? JSON.parse(stored).find((t: ITrack) => t.id === trackToPlay?.id)
      : null;

    if (!isInFavorites) {
      localStorage.setItem(
        "favorite",
        JSON.stringify(
          [stored && JSON.parse(stored), trackToPlay]
            .flat(1)
            .filter((e) => e !== ""),
        ),
      );
      toast("Add to favorites playlist 🌟", {
        autoClose: 2000,
        position: "top-center",
        theme: "dark",
      });
      setLiked(true);
    } else {
      const updated = stored
        ? JSON.parse(stored).filter((t: ITrack) => t.id !== trackToPlay?.id)
        : [];
      toast("Delete from favorites playlist 💔", {
        autoClose: 2000,
        position: "top-center",
        theme: "dark",
      });
      localStorage.setItem("favorite", JSON.stringify(updated));
      setLiked(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-xl">
          <AiFillPlayCircle />
        </div>
        <p className="text-sm">21k</p>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-lg">{trackToPlay?.musicName}</p>
        <p className="text-sm opacity-70">{trackToPlay?.singer}</p>
      </div>
      <div
        className="flex flex-col items-center justify-center gap-2 lg:cursor-pointer"
        onClick={addToFavoritesHandler}
      >
        <div className="text-2xl">
          {liked ? <AiFillHeart /> : <AiOutlineHeart />}
        </div>
        <p className="text-sm">21k</p>
      </div>
    </div>
  );
};

const MusicOptions = () => {
  const trackToPlay = PlayedTrack();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!trackToPlay?.url || downloading) return;
    setDownloading(true);
    try {
      const res = await fetch(trackToPlay.url);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `${trackToPlay.musicName} - ${trackToPlay.singer}.m4a`;
      a.click();
      URL.revokeObjectURL(objectUrl);
      toast(`Downloaded: ${trackToPlay.musicName} ⬇️`, {
        autoClose: 2000,
        position: "top-center",
        theme: "dark",
      });
    } catch {
      toast("Download failed", {
        autoClose: 2000,
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-between text-2xl text-white">
      <div>
        <RiUserHeartLine />
      </div>
      <div>
        <AiFillFolderAdd />
      </div>
      <button
        onClick={handleDownload}
        disabled={downloading}
        title="Download 30s preview"
        className={`transition-opacity ${downloading ? "opacity-40" : "hover:opacity-70"}`}
      >
        {downloading ? (
          <div className="animate-spin text-xl">
            <AiOutlineLoading3Quarters />
          </div>
        ) : (
          <AiOutlineCloudDownload />
        )}
      </button>
      <div>
        <AiOutlineShareAlt />
      </div>
    </div>
  );
};

export default MusicPlayerControllers;
