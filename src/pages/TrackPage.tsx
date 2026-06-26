import SiteLayout from "@/layout/SiteLayout";
import React, { useEffect, useState } from "react";
import { AiFillPlayCircle, AiOutlineClose, AiOutlinePause } from "react-icons/ai";
import { useMediaPredicate } from "react-media-hook";
import Skeleton from "@/components/common/Skeleton";
import createEmptyArray from "@/utils/createEmptyArray";
import MusicPlayerControllers from "@/components/TrackPage/MusicPlayerControllers";
import MoreMusics from "@/components/TrackPage/MoreMusics";
import FadeBackgroundImage from "@/components/common/FadeBackgroundImage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { ITrack, getTracks } from "@/redux/Tracks/TracksSlice";
import GetTrackFromUrl from "@/utils/getTrackFromUrl";
import {
  setCurrentTrack,
  setQueue,
  togglePlay,
} from "@/redux/Player/PlayerSlice";

const TrackPage: React.FC = () => {
  const { tracks, loading } = useSelector((state: RootState) => state.tracks);
  const { currentTrack, isPlaying, queue } = useSelector(
    (state: RootState) => state.player,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [showPlayer, setShowPlayer] = useState(false);
  const getTrackFromUrl = GetTrackFromUrl();

  useEffect(() => {
    if (tracks.length === 0) dispatch(getTracks());
  }, [dispatch, tracks.length]);

  // When the track page loads, seed the queue if it's empty
  useEffect(() => {
    if (tracks.length > 0 && queue.length === 0) {
      dispatch(setQueue(tracks));
    }
  }, [dispatch, tracks, queue.length]);

  const handlePlay = () => {
    if (!getTrackFromUrl) return;
    const isThisTrack = currentTrack?.id === getTrackFromUrl.id;
    if (isThisTrack) {
      dispatch(togglePlay());
    } else {
      dispatch(setCurrentTrack(getTrackFromUrl));
      dispatch(setQueue(tracks));
    }
    setShowPlayer(true);
  };

  const isThisTrackPlaying =
    currentTrack?.id === getTrackFromUrl?.id && isPlaying;

  return (
    <SiteLayout>
      {/* Player renders independently — never unmounted by loading state */}
      {showPlayer && currentTrack && (
        <TrackPlayer onClose={() => setShowPlayer(false)} />
      )}

      {!loading ? (
        <div className="relative flex h-full w-full flex-col">
          <FadeBackgroundImage imageUrl={getTrackFromUrl?.imageUrl} />
          <div className="z-10 flex w-full flex-col gap-4 p-2 text-white dark:text-white lg:p-9">
            <div className="flex w-full flex-col items-center justify-start gap-6 lg:flex-row lg:items-end">
              <img
                className="fadeShow1 h-52 w-52 lg:h-64 lg:w-64"
                src={getTrackFromUrl?.imageUrl}
                alt=""
              />
              <div className="fadeShow2 order-1 flex flex-col items-center gap-3 lg:order-none lg:items-start">
                <p className="text-3xl font-bold lg:text-5xl">
                  {getTrackFromUrl?.musicName}
                </p>
                <p className="lg:text-2xl">{getTrackFromUrl?.singer}</p>
                <p className="text-sm opacity-60">30-second preview</p>
              </div>
            </div>
            <div className="fadeShow4 flex w-full items-center justify-around gap-14 lg:justify-start lg:gap-9">
              <button
                onClick={handlePlay}
                className="order-none text-6xl lg:order-1 transition-transform hover:scale-110"
              >
                {isThisTrackPlaying ? <AiOutlinePause /> : <AiFillPlayCircle />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <TrackPageSkeleton />
      )}
    </SiteLayout>
  );
};

type TrackPlayerProps = {
  onClose: () => void;
};

const TrackPlayer = ({ onClose }: TrackPlayerProps) => {
  const { currentTrack, queue } = useSelector((state: RootState) => state.player);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 50);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  const displayTrack: ITrack | undefined = currentTrack ?? undefined;

  return (
    <div
      className={`absolute z-20 flex h-full w-full flex-col items-start justify-start gap-10 p-5 pb-16 transition-all duration-300 lg:flex-row lg:justify-center ${
        show ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
    >
      <FadeBackgroundImage imageUrl={displayTrack?.imageUrl} />

      <div className="z-50 flex h-full w-full flex-col items-start justify-start gap-8 lg:w-[35%]">
        <div className="flex h-full w-full flex-col items-center justify-between gap-2 lg:gap-14">
          <button
            onClick={handleClose}
            className="flex w-full items-center justify-between text-3xl text-white lg:cursor-pointer"
          >
            <AiOutlineClose />
          </button>
          <img
            className="fadeShow1 w-3/4 rounded-2xl lg:w-[80%]"
            src={displayTrack?.imageUrl}
            alt=""
          />
        </div>
        <MusicPlayerControllers />
      </div>

      <MoreMusics allTracks={queue.length > 0 ? queue : []} />
    </div>
  );
};

const TrackPageSkeleton = () => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");
  return (
    <div className="flex h-full w-full flex-col justify-start gap-12 p-4 lg:p-8">
      <div className="flex w-full items-center justify-center gap-3">
        {createEmptyArray(1).map((_, index) => (
          <div
            key={index}
            className="flex w-full flex-col items-center justify-center gap-2 lg:h-full lg:flex-row"
          >
            <Skeleton className="h-44 w-1/2 rounded-xl lg:order-none lg:h-64 lg:w-64" />
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 lg:items-start lg:justify-end lg:gap-4">
              <Skeleton className="h-4 w-[30%] rounded-xl lg:h-6 lg:w-[20%]" />
              <Skeleton className="h-4 w-[20%] rounded-xl lg:h-6 lg:w-[15%]" />
              <Skeleton className="h-4 w-[60%] rounded-xl lg:h-6 lg:w-[30%]" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full items-center justify-between gap-3 lg:justify-start">
        {createEmptyArray(1).map((_, index) => (
          <div
            key={index}
            className="flex w-full flex-col items-center justify-center gap-2 lg:w-28"
          >
            <Skeleton className="h-4 w-8 rounded-full" />
            <Skeleton className="h-4 w-[30%] rounded-2xl" />
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-3">
        {createEmptyArray(isMobile ? 3 : 9).map((_, index) => (
          <div
            key={index}
            className="flex w-full flex-col items-center justify-center gap-2"
          >
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackPage;
