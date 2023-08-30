import React from "react";
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
import { BiShuffle } from "react-icons/bi";
import { BsRepeat, BsRepeat1 } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import PlayedTrack from "@/utils/trackToPlay";
import { RiUserHeartLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import saveToLocal from "@/utils/saveToLocal";
import getFromLocal from "@/utils/getFromLocal";

interface Track {
  musicName: string;
  singer: string;
  imageUrl: string;
  url: string;
  genre?: string;
  state?: string;
}
const MusicPlayerControllers: React.FC<{
  song: HTMLAudioElement;
  setSong: React.Dispatch<React.SetStateAction<HTMLAudioElement>>;
  allTracks: Track[];
}> = ({ song, setSong, allTracks }) => {
  const musicPlayerSetting = getFromLocal("musicPlayerSetting");

  //States
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [repeatIcon, setRepeatIcon] = useState(musicPlayerSetting.repeat);
  const [shuffleIcon, setShuffleIcon] = useState(musicPlayerSetting.shuffle);
  // Refrenses
  const musicTimeLineRef = useRef<HTMLInputElement>(null);
  const musicTimer = useRef<HTMLParagraphElement>(null);
  const musicDuration = useRef<HTMLParagraphElement>(null);
  const interval = useRef<ReturnType<typeof setInterval>>();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const disabledLoading = () => {
      setIsLoading(false);
    };
    song.addEventListener("canplaythrough", disabledLoading);
    if (musicTimeLineRef.current) musicTimeLineRef.current.max = "0";
    return () => {
      song.removeEventListener("canplaythrough", disabledLoading);
    };
  }, []);

  useEffect(() => {
    playPauseHandler();
    return () => {
      song.pause();
    };
  }, [song]);

  useEffect(() => {
    setSong(new Audio(location.state.url));
    setIsPlaying(false);

    if (musicTimeLineRef.current) musicTimeLineRef.current.max = "0";
    if (musicTimer.current) musicTimer.current.innerText = "0:00";
  }, [location]);

  const renderPlayIcon = () => {
    if (!isLoading) {
      if (isPlaying) {
        return <AiOutlinePause />;
      } else {
        return (
          <div className="animate-bounce">
            <AiFillPlayCircle />
          </div>
        );
      }
    } else {
      return (
        <div className="animate-spin">
          <AiOutlineLoading3Quarters />
        </div>
      );
    }
  };
  const musicEnded = () => {
    if (musicTimeLineRef.current) {
      musicTimeLineRef.current.value = "0";
      setIsPlaying(false);
      clearInterval(interval.current);
    }
    if (musicTimer.current) musicTimer.current.innerText = `0:00`;

    //Start again
    if (repeatIcon === "one") {
      playPauseHandler();
    } else if (repeatIcon === "all") {
      const currentMusicIndex = allTracks.findIndex(
        (track) => track.url === location.state.url,
      );
      const musicToPlay = allTracks[currentMusicIndex + 1];
      navigate(
        { pathname: `/track/${musicToPlay.musicName}` },
        { state: { url: musicToPlay.url } },
      );
    } else if (shuffleIcon === "on") {
      const randomNumber = Math.floor(Math.random() * allTracks.length);
      const musicToPlay = allTracks[randomNumber];
      navigate(
        { pathname: `/track/${musicToPlay.musicName}` },
        { state: { url: musicToPlay.url } },
      );
    }
  };
  const musicCurrentTimeTimer = () => {
    if (musicTimer.current) {
      const mins = Math.floor(song.currentTime / 60);
      let secs: number | string = Math.floor(song.currentTime % 60);
      if (secs < 10) {
        secs = "0" + String(secs);
      }
      musicTimer.current.innerText = `${mins}:${secs}`;
    }
  };
  const playPauseHandler = () => {
    clearInterval(interval.current);
    if (isPlaying) {
      song.pause();
      setIsPlaying(false);
    } else {
      song.play();
      interval.current = setInterval(() => {
        if (musicTimeLineRef.current) {
          const value = Number(musicTimeLineRef.current.value);

          const mins = Math.floor(song.currentTime / 60);
          let secs: number | string = Math.floor(song.currentTime % 60);
          if (secs < 10) {
            secs = "0" + String(secs);
          }
          if (musicTimer.current) {
            musicTimer.current.innerText = `${mins}:${secs}`;
          }
          const songDuration = Math.floor(song.duration);
          const second = value + 1;
          musicTimeLineRef.current.value = `${second}`;

          const minutes = Math.floor(song.duration / 60);
          let seconds: string | number = Math.floor(
            song.duration - minutes * 60,
          );
          if (seconds < 10) {
            seconds = "0" + String(seconds);
          }
          if (musicTimeLineRef.current)
            musicTimeLineRef.current.max = String(song.duration);
          if (musicDuration.current)
            musicDuration.current.innerText = song.duration
              ? `${minutes}:${seconds}`
              : "00:00";

          if (value === songDuration) musicEnded();
        }
      }, 1000);
      setIsPlaying(true);
    }
  };
  const musicTimeLineHandler = (e: React.ChangeEvent) => {
    clearInterval(interval.current);
    const target = e.target as HTMLInputElement;
    song.currentTime = Number(target.value);

    if (isPlaying) {
      interval.current = setInterval(() => {
        if (musicTimeLineRef.current) {
          const value = Number(musicTimeLineRef.current.value);
          const songDuration = Math.floor(song.duration);
          const second = song.duration ? value + 1 : value;

          musicTimeLineRef.current.value = `${second}`;
          musicCurrentTimeTimer();
          console.log(song.duration);
          if (value === songDuration) musicEnded();
        }
      }, 1000);
    }
  };

  const changeMusic = (type: string) => {
    const musicPlayerSetting = getFromLocal("musicPlayerSetting");
    if (musicPlayerSetting.shuffle === "on") {
      console.log("object");
      const randomNumber = Math.floor(Math.random() * allTracks.length);
      const musicToPlay = allTracks[randomNumber];
      navigate(
        { pathname: `/track/${musicToPlay.musicName}` },
        { state: { url: musicToPlay.url } },
      );
    } else {
      const currentMusicIndex = allTracks.findIndex(
        (track) => track.url === location.state.url,
      );
      const musicToPlay =
        allTracks[
          type === "next" ? currentMusicIndex + 1 : currentMusicIndex - 1
        ];
      navigate(
        { pathname: `/track/${musicToPlay.musicName}` },
        { state: { url: musicToPlay.url } },
      );
    }
  };

  const repeatIconHandler = () => {
    const musicPlayerSetting = getFromLocal("musicPlayerSetting");

    if (musicPlayerSetting.repeat === "off")
      saveToLocal("musicPlayerSetting", {
        ...musicPlayerSetting,
        repeat: "all",
      });
    else if (musicPlayerSetting.repeat === "all")
      saveToLocal("musicPlayerSetting", {
        ...musicPlayerSetting,
        repeat: "one",
      });
    else if (musicPlayerSetting.repeat === "one")
      saveToLocal("musicPlayerSetting", {
        ...musicPlayerSetting,
        repeat: "off",
      });

    setRepeatIcon(musicPlayerSetting.repeat);
  };
  const renderRepeatIcon = () => {
    const musicPlayerSetting = getFromLocal("musicPlayerSetting");

    if (musicPlayerSetting.repeat === "off")
      return (
        <div className="opacity-20">
          <BsRepeat />
        </div>
      );
    else if (musicPlayerSetting.repeat === "all") return <BsRepeat />;
    else if (musicPlayerSetting.repeat === "one") return <BsRepeat1 />;
  };

  const shuffleIconHandler = () => {
    const musicPlayerSetting = getFromLocal("musicPlayerSetting");

    if (musicPlayerSetting.shuffle === "off")
      saveToLocal("musicPlayerSetting", {
        ...musicPlayerSetting,
        shuffle: "on",
      });
    else if (musicPlayerSetting.shuffle === "on")
      saveToLocal("musicPlayerSetting", {
        ...musicPlayerSetting,
        shuffle: "off",
      });

    setShuffleIcon(musicPlayerSetting.shuffle);
  };
  const renderShuffleIcon = () => {
    const musicPlayerSetting = getFromLocal("musicPlayerSetting");

    if (musicPlayerSetting.shuffle === "off")
      return (
        <div className="opacity-20">
          <BiShuffle />
        </div>
      );
    else if (musicPlayerSetting.shuffle === "on") return <BiShuffle />;
  };

  return (
    <div className="flex h-full w-full flex-col justify-between gap-6 lg:justify-center lg:gap-12 lg:pt-0">
      <MusicName />

      {/* TIME LINE */}
      <div className="flex w-full flex-col gap-4">
        <input
          onChange={musicTimeLineHandler}
          min={0}
          ref={musicTimeLineRef}
          step={1}
          className="w-full appearance-none bg-transparent outline-none lg:cursor-pointer [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:h-[8px] [&::-webkit-slider-thumb]:w-[7px] [&::-webkit-slider-thumb]:scale-150 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          type="range"
        />
        <div className="flex w-full justify-between">
          <p ref={musicTimer}>0:00</p>
          <p ref={musicDuration}>0:00</p>
        </div>
      </div>
      {/* PLAY & PAUSE */}
      <div className="flex w-full items-center justify-between text-2xl">
        <div onClick={repeatIconHandler}>{renderRepeatIcon()}</div>
        <div onClick={() => changeMusic("prev")} className="lg:cursor-pointer">
          <AiFillStepBackward />
        </div>
        <div onClick={playPauseHandler} className="text-3xl lg:cursor-pointer">
          {renderPlayIcon()}
        </div>
        <div onClick={() => changeMusic("next")} className="lg:cursor-pointer">
          <AiFillStepForward />
        </div>
        <div onClick={shuffleIconHandler}>{renderShuffleIcon()}</div>
      </div>

      <MusicOptions />
    </div>
  );
};

const MusicName = () => {
  const [liked, setLiked] = useState(false);
  const trackToPlay = PlayedTrack();
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
        className="flex flex-col items-center  justify-center gap-2 lg:cursor-pointer"
        onClick={() => setLiked(!liked)}
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
  return (
    <div className="flex w-full items-center justify-between text-2xl">
      <div>
        <RiUserHeartLine />
      </div>
      <div className="">
        <AiFillFolderAdd />
      </div>
      <Link className="" to={trackToPlay ? trackToPlay.url : ""}>
        <AiOutlineCloudDownload />
      </Link>
      <div className="">
        <AiOutlineShareAlt />
      </div>
    </div>
  );
};

export default MusicPlayerControllers;
