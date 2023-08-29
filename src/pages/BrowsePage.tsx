import { TrackLine } from "@/components/common";
import Skeleton from "@/components/common/Skeleton";
import SiteLayout from "@/layout/SiteLayout";
import { RootState } from "@/store";
import createEmptyArray from "@/utils/createEmptyArray";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const BrowsePage: React.FC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 1500);
  });
  const tracks = useSelector((state: RootState) => state.tracks.tracks);
  return (
    <SiteLayout>
      {show ? (
        <div className=" flex w-full flex-col items-start justify-start gap-5 p-4 pb-24 pt-14">
          <p className="fixed left-0 top-0 z-30 flex w-full items-center justify-center rounded-b-2xl bg-neutral-800 p-2 text-lg lg:relative lg:justify-start lg:bg-transparent">
            Songs for you :)
          </p>
          {tracks.map((track) => {
            return (
              <TrackLine
                imageUrl={track.imageUrl}
                musicName={track.musicName}
                singer={track.singer}
                key={track.imageUrl}
              />
            );
          })}
        </div>
      ) : (
        <BrosePageSkeleton />
      )}
    </SiteLayout>
  );
};
const BrosePageSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-5 p-4 lg:gap-7 lg:pt-16">
      {createEmptyArray(11).map((index) => {
        return <Skeleton key={index} className="h-14 w-full rounded-lg" />;
      })}
    </div>
  );
};
export default BrowsePage;
