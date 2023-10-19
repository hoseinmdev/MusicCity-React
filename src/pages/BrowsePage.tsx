import { TrackLine } from "@/components/common";
import Skeleton from "@/components/common/Skeleton";
import SiteLayout from "@/layout/SiteLayout";
import { AppDispatch, RootState } from "@/store";
import createEmptyArray from "@/utils/createEmptyArray";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ITrack, getTracks } from "@/redux/Tracks/TracksSlice";
import InfiniteScroll from "react-infinite-scroll-component";

const BrowsePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tracks, loading } = useSelector((state: RootState) => state.tracks);
  const [items, setItems] = useState<ITrack[]>([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    dispatch(getTracks());
  }, []);
  useEffect(() => {
    setItems(tracks.slice(0, 15));
  }, [tracks]);

  const fetchMoreData = () => {
    if (items.length >= tracks.length) {
      setHasMore(false);
    } else {
      setTimeout(() => {
        setItems([...items, ...tracks.slice(items.length, items.length + 10)]);
      }, 1000);
    }
  };
  return (
    <SiteLayout>
      {!loading ? (
        <div className=" flex w-full  flex-col items-start justify-start gap-5 p-4 pb-24 pt-14">
          <p className="fixed left-0 top-0 z-30 flex w-full items-center justify-center rounded-b-2xl bg-zinc-300 p-2 text-lg text-gray-800 dark:bg-neutral-800 dark:text-white lg:relative lg:justify-start lg:bg-transparent">
            Songs for you :)
          </p>
          <div className="w-full">
            <InfiniteScroll
              className="hideScrollbar flex flex-col gap-4"
              dataLength={items.length}
              next={fetchMoreData}
              loader={<TracksLoading />}
              hasMore={hasMore}
              height={800}
            >
              {items.map((track) => {
                return <TrackLine {...track} key={track.imageUrl} />;
              })}
            </InfiniteScroll>
          </div>
        </div>
      ) : (
        <BrosePageSkeleton />
      )}
    </SiteLayout>
  );
};
const TracksLoading = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      {createEmptyArray(5).map((_, index) => {
        return <Skeleton key={index} className="h-14 w-full rounded-lg" />;
      })}
    </div>
  );
};
const BrosePageSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-5 p-4 lg:gap-7 lg:pt-16">
      {createEmptyArray(11).map((_, index) => {
        return <Skeleton key={index} className="h-14 w-full rounded-lg" />;
      })}
    </div>
  );
};
export default BrowsePage;
