// import { ArtistAvatar } from "@/components/common";
import Skeleton from "@/components/common/Skeleton";
import SiteLayout from "@/layout/SiteLayout";
import createEmptyArray from "@/utils/createEmptyArray";
import React, { useEffect, useState } from "react";
import { useMediaPredicate } from "react-media-hook";
import "swiper/css";
import {
  allArtists,
} from "@/db/artists";
import ArtistsList from "@/components/ArtistsPage/ArtistsList";
const ArtistsPage: React.FC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 1500);
  }, []);
  return (
    <SiteLayout>
      {show ? (
        <div className="flex w-full flex-col items-end gap-8 p-4 pb-20 lg:gap-10 lg:p-9">
          <ArtistsList artists={allArtists} title="Populer Pop" type="pop" />
          <ArtistsList artists={allArtists} title="Populer Rap" type="rap" />
          <ArtistsList
            artists={allArtists}
            title="Nostalgic"
            type="nostalgic"
          />
          <ArtistsList artists={allArtists} title="Sonnati" type="sonnati" />
          <ArtistsList artists={allArtists} title="New Pop" type="newPop" />
        </div>
      ) : (
        <ArtistsPageSkeleton />
      )}
    </SiteLayout>
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
          {createEmptyArray(isMobile ? 3 : 9).map((index) => {
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
          {createEmptyArray(isMobile ? 3 : 9).map((index) => {
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
          {createEmptyArray(isMobile ? 3 : 9).map((index) => {
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
