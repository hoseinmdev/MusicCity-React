import SiteLayout from "@/layout/SiteLayout";
import React, { useEffect, useState } from "react";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import { useMediaPredicate } from "react-media-hook";
import Skeleton from "@/components/common/Skeleton";
import createEmptyArray from "@/utils/createEmptyArray";
import { useLocation, useParams } from "react-router-dom";
import MusicPlayerControllers from "@/components/TrackPage/MusicPlayerControllers";
import MoreMusics from "@/components/TrackPage/MoreMusics";
import FadeBackgroundImage from "@/components/common/FadeBackgroundImage";
import saveToLocal from "@/utils/saveToLocal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { ITrack, getTracks } from "@/redux/Tracks/TracksSlice";
import GetTrackFromUrl from "@/utils/getTrackFromUrl";

const TrackPage: React.FC = () => {
  const { loading } = useSelector((state: RootState) => state.tracks);
  const dispatch = useDispatch<AppDispatch>();
  const [playTrack, setPlayTrack] = useState(false);
  const getTrackFromUrl = GetTrackFromUrl();
  useEffect(() => {
    dispatch(getTracks());
    saveToLocal("musicPlayerSetting", { repeat: "all", shuffle: "off" });
  }, []);
  return (
    <SiteLayout>
      {!loading ? (
        <div className="relative flex h-full w-full flex-col">
          {playTrack ? (
            <TrackPlayer playTrack={playTrack} setPlayTrack={setPlayTrack} />
          ) : (
            ""
          )}
          <FadeBackgroundImage imageUrl={getTrackFromUrl?.imageUrl} />
          {/* Content */}
          <div className=" z-10 flex w-full flex-col gap-4 p-2 lg:p-9 dark:text-white text-white">
            <div className="flex w-full flex-col items-center justify-start gap-6 lg:flex-row lg:items-end">
              <img
                className="h-52 w-52 lg:h-64 lg:w-64 "
                src={getTrackFromUrl?.imageUrl}
                alt=""
              />
              <div className="order-1 flex flex-col items-center gap-3 lg:order-none lg:items-start">
                <p className="text-3xl font-bold lg:text-5xl">
                  {getTrackFromUrl?.musicName}
                </p>
                <p className="lg:text-2xl">{getTrackFromUrl?.singer}</p>
                <p className="">156.6k plays / 683 likes </p>
              </div>
            </div>
            <div className="flex w-full items-center justify-around gap-14  lg:justify-start lg:gap-9">
              <button
                onClick={() => setPlayTrack(!playTrack)}
                className="order-none text-6xl lg:order-1"
              >
                <AiFillPlayCircle />
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
  playTrack: boolean;
  setPlayTrack: (value: boolean) => void;
};

const TrackPlayer = ({ playTrack, setPlayTrack }: TrackPlayerProps) => {
  const location = useLocation();
  const { track } = useParams();
  const [show, setShow] = useState(false);
  const [song, setSong] = useState(new Audio(location.state.url));
  const [allTracks, setAllTracks] = useState<ITrack[]>([]);
  const params = useParams();
  const tracks = useSelector((state: RootState) => state.tracks.tracks);
  const playlists = useSelector(
    (state: RootState) => state.playlists.playlists,
  );
  useEffect(() => {
    setTimeout(() => setShow(true), 200);
    if (params.playlist) {
      const currentPlaylist = playlists.find((p) => p.id === params.playlist);
      setAllTracks(currentPlaylist ? currentPlaylist.tracks : []);
    } else {
      setAllTracks(tracks);
    }
  }, []);
  useEffect(() => {
    setSong(new Audio(location.state.url));
  }, [location]);

  const trackToPlay = tracks.find((t) => t.id === track);

  return (
    <div
      className={`absolute ${
        playTrack ? "flex" : "hidden"
      } z-20 flex h-full w-full  flex-col items-start justify-start gap-10 p-5 pb-16 lg:flex-row lg:justify-center ${
        show
          ? "translate-y-[0rem] opacity-100"
          : "translate-y-[-10rem] opacity-0"
      }`}
    >
      <FadeBackgroundImage imageUrl={trackToPlay?.imageUrl} />
      {/* Content */}
      <div className="z-50 flex h-full w-full flex-col items-start justify-start gap-8 lg:w-[35%]">
        <div className="flex h-full w-full flex-col items-center justify-between gap-2 lg:gap-14">
          <div
            onClick={() => {
              setShow(false);
              song.load();
              setTimeout(() => setPlayTrack(false), 300);
            }}
            className="flex w-full items-center justify-between text-3xl lg:cursor-pointer dark:text-gray-800 text-white"
          >
            <AiOutlineClose />
          </div>
          <img
            className="w-3/4 rounded-2xl hover:animate-pulse lg:w-[80%] lg:cursor-pointer"
            src={trackToPlay?.imageUrl}
            alt=""
          />
        </div>
        <MusicPlayerControllers allTracks={allTracks} song={song} />
      </div>
      <MoreMusics allTracks={allTracks} />
    </div>
  );
};

const TrackPageSkeleton = () => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");

  return (
    <div className="flex h-full w-full flex-col justify-start gap-12 p-4 lg:p-8">
      <div className="flex w-full items-center justify-center gap-3">
        {createEmptyArray(1).map((_, index) => {
          return (
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
          );
        })}
      </div>
      <div className="flex w-full items-center justify-between gap-3 lg:justify-start">
        {createEmptyArray(1).map((_, index) => {
          return (
            <div
              key={index}
              className="flex w-full flex-col items-center justify-center gap-2 lg:w-28"
            >
              <Skeleton className="h-4 w-8 rounded-full" />
              <Skeleton className="h-4 w-[30%] rounded-2xl" />
            </div>
          );
        })}
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-3 ">
        {createEmptyArray(isMobile ? 3 : 9).map((_, index) => {
          return (
            <div
              key={index}
              className="flex w-full flex-col items-center justify-center gap-2"
            >
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default TrackPage;
