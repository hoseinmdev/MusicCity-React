// import { ArtistAvatar } from "@/components/common";
import Skeleton from "@/components/common/Skeleton";
import SiteLayout from "@/layout/SiteLayout";
import createEmptyArray from "@/utils/createEmptyArray";
import React, { useEffect } from "react";
import { useMediaPredicate } from "react-media-hook";
import "swiper/css";
import ArtistsList from "@/components/ArtistsPage/ArtistsList";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { getArtists } from "@/redux/Artists/ArtistsSlice";
const ArtistsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { artists, loading } = useSelector((state: RootState) => state.artists);

  useEffect(() => {
    dispatch(getArtists());
  }, []);
  const renderArtistsPage = () => {
    if (loading) {
      return (
        <SiteLayout>
          <ArtistsPageSkeleton />
        </SiteLayout>
      );
    } else if (!loading && artists.length !== 0) {
      return (
        <SiteLayout>
          <div className="flex w-full flex-col items-end gap-8 p-4 pb-20 lg:gap-10 lg:p-9">
            <div className="fadeShow1 w-full">
              <ArtistsList artists={artists} title="Populer Pop" type="pop" />
            </div>
            <div className="fadeShow2 w-full">
              <ArtistsList artists={artists} title="Populer Rap" type="rap" />
            </div>
            <div className="fadeShow3 w-full">
              <ArtistsList
                artists={artists}
                title="Nostalgic"
                type="nostalgic"
              />
            </div>
            <div className="fadeShow5 w-full">
              <ArtistsList artists={artists} title="Sonnati" type="sonnati" />
            </div>
            <ArtistsList artists={artists} title="New Pop" type="newPop" />
          </div>
        </SiteLayout>
      );
    } else if (artists.length === 0) {
      return (
        <SiteLayout>
          <TryAgain />
        </SiteLayout>
      );
    }
  };
  return renderArtistsPage();
};

const TryAgain = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fetchData = () => {
    dispatch(getArtists());
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
const ArtistsPageSkeleton = () => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");

  return (
    <div className="flex h-full w-full flex-col justify-start gap-12 p-4 lg:gap-16 lg:p-8">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="flex w-full justify-start">
          <Skeleton className="h-3 w-32 rounded-md lg:h-6 lg:w-48" />
        </div>
        <div className="flex w-full justify-between">
          {createEmptyArray(isMobile ? 3 : 9).map((_, index) => {
            return (
              <div
                key={index}
                className="flex w-full flex-col items-center justify-center gap-2"
              >
                <Skeleton className="h-24 w-24 rounded-full lg:h-36 lg:w-36 " />
                <Skeleton className="h-2 w-[60%] rounded-2xl lg:h-4 " />
                <Skeleton className="h-2 w-[40%] rounded-2xl lg:h-4 " />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="flex w-full justify-start">
          <Skeleton className="h-3 w-32 rounded-md lg:h-6 lg:w-48" />
        </div>
        <div className="flex w-full justify-between">
          {createEmptyArray(isMobile ? 3 : 9).map((_, index) => {
            return (
              <div
                key={index}
                className="flex w-full flex-col items-center justify-center gap-2"
              >
                <Skeleton className="h-24 w-24 rounded-full lg:h-36 lg:w-36 " />
                <Skeleton className="h-2 w-[60%] rounded-2xl lg:h-4 " />
                <Skeleton className="h-2 w-[40%] rounded-2xl lg:h-4 " />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <div className="flex w-full justify-start">
          <Skeleton className="h-3 w-32 rounded-md lg:h-6 lg:w-48" />
        </div>
        <div className="flex w-full justify-between">
          {createEmptyArray(isMobile ? 3 : 9).map((_, index) => {
            return (
              <div
                key={index}
                className="flex w-full flex-col items-center justify-center gap-2"
              >
                <Skeleton className="h-24 w-24 rounded-full lg:h-36 lg:w-36 " />
                <Skeleton className="h-2 w-[60%] rounded-2xl lg:h-4 " />
                <Skeleton className="h-2 w-[40%] rounded-2xl lg:h-4 " />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ArtistsPage;
