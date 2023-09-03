import Slider from "@/components/HomePage/Slider";
import React, { useEffect } from "react";
import SiteLayout from "@/layout/SiteLayout";
import Skeleton from "@/components/common/Skeleton";
import createEmptyArray from "@/utils/createEmptyArray";
import { useMediaPredicate } from "react-media-hook";
import PlayLists from "@/components/HomePage/PlayLists";
import TracksList from "@/components/HomePage/TracksList";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Footer from "@/components/Footer";
import { getTracks } from "@/redux/Tracks/TracksSlice";
import { getPlaylists } from "@/redux/Playlists/PlaylistsSlice";
const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tracks, loading } = useSelector((state: RootState) => state.tracks);
  const playlists = useSelector(
    (state: RootState) => state.playlists.playlists,
  );
  console.log(tracks);
  useEffect(() => {
    dispatch(getTracks());
    dispatch(getPlaylists());
    toast("🍕 Welcome To Music City :)", {
      autoClose: 2000,
      theme: "dark",
    });
  }, []);

  const renderHomePage = () => {
    if (loading) {
      return (
        <SiteLayout>
          <HomePageSkeleton />
        </SiteLayout>
      );
    } else if (!loading && tracks.length !== 0) {
      return (
        <SiteLayout>
          <div className="flex w-full flex-col items-center justify-center gap-8 p-4 pb-14 lg:gap-10">
            <Slider />
            <PlayLists playListsTitle="All Playlists" playLists={playlists} />
            <TracksList tracks={tracks} musicsState="new" title="New Songs" />
            <TracksList tracks={tracks} musicsState="top" title="Top Songs" />
            <div className="w-full lg:hidden">
              <Footer />
            </div>
          </div>
        </SiteLayout>
      );
    } else if (tracks.length === 0) {
      return (
        <SiteLayout>
          <TryAgain />
        </SiteLayout>
      );
    }
  };
  return renderHomePage();
};
const TryAgain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fetchData = () => {
    dispatch(getTracks());
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <p>We have some problems...</p>
      <button
        onClick={fetchData}
        className="rounded-xl bg-neutral-700 px-10 py-2"
      >
        Try Again
      </button>
    </div>
  );
};

const HomePageSkeleton = () => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");

  return (
    <div className=" flex h-full w-full flex-col justify-start gap-10 p-4 lg:justify-between lg:gap-4">
      <div className="flex w-full justify-start lg:hidden">
        <Skeleton className="h-8 w-32 rounded-[6rem]" />
      </div>
      <div className="flex w-full items-center justify-center gap-3">
        {createEmptyArray(isMobile ? 1 : 4).map((_, index) => {
          return (
            <div
              key={index}
              className="flex w-full flex-col items-start justify-center gap-2"
            >
              <Skeleton className="h-44 w-full rounded-2xl" />
              <Skeleton className="h-4 w-[30%] rounded-2xl" />
              <Skeleton className="h-4 w-[20%] rounded-2xl" />
            </div>
          );
        })}
      </div>
      <div className="flex w-full items-center justify-center gap-3">
        {createEmptyArray(isMobile ? 3 : 9).map((_, index) => {
          return (
            <div
              key={index}
              className="flex w-full flex-col items-center justify-center gap-2 pt-10 lg:pt-0"
            >
              <Skeleton className="h-[6.5rem] w-[6.5rem] rounded-2xl lg:h-44 lg:w-full" />
              <Skeleton className="h-4 w-[60%] rounded-2xl" />
              <Skeleton className="h-4 w-[30%] rounded-2xl" />
            </div>
          );
        })}
      </div>
      <div className="hidden w-full items-center justify-center gap-3 lg:flex">
        {createEmptyArray(isMobile ? 3 : 9).map((_, index) => {
          return (
            <div
              key={index}
              className="flex w-full flex-col items-center justify-center gap-2"
            >
              <Skeleton className="h-[6.5rem] w-[6.5rem] rounded-2xl lg:h-44 lg:w-full" />
              <Skeleton className="h-4 w-[60%] rounded-2xl" />
              <Skeleton className="h-4 w-[20%] rounded-2xl" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HomePage;
