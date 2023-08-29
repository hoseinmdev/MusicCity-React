import Genres from "@/components/SearchPage/Genres";
import { TrackLine } from "@/components/common";
import Skeleton from "@/components/common/Skeleton";
import { genres, moods } from "@/db/genreMoods";
import SiteLayout from "@/layout/SiteLayout";
import { RootState } from "@/sote";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";

const SearchPage: React.FC = () => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  interface Track {
    musicName: string;
    singer: string;
    imageUrl: string;
    url: string;
  }
  const [foundTracks, setFoundTracks] = useState<Track[]>();
  const tracks = useSelector((state: RootState) => state.tracks.tracks);

  useEffect(() => {
    setTimeout(() => setShow(true), 1500);
  }, []);

  const searchTracksHandler = (e: string) => {
    setValue(e);
    const foundTracks = tracks.filter((track) =>
      track.musicName.toLowerCase().includes(e),
    );
    setFoundTracks(foundTracks);
  };

  return (
    <SiteLayout>
      {show ? (
        <div className="flex w-full flex-col items-start justify-start gap-16 p-4 pb-28">
          <div className="flex w-full items-center justify-start overflow-hidden rounded-3xl bg-neutral-700 lg:w-96">
            <div className="pl-4 text-xl">
              <AiOutlineSearch />
            </div>
            <input
              value={value}
              className="w-full bg-transparent p-4 text-sm outline-none"
              type="text"
              placeholder="Search Your Song ..."
              onChange={(e) =>
                searchTracksHandler(e.target.value.toLowerCase())
              }
            />
            <button
              onClick={() => setValue("")}
              className={`pr-4 ${
                value ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            >
              <AiOutlineClose />
            </button>
          </div>
          {value ? (
            <div className="flex w-full flex-col items-center justify-center gap-5">
              {foundTracks?.map((track) => {
                return (
                  <TrackLine
                  url={track.url}
                    imageUrl={track.imageUrl}
                    musicName={track.musicName}
                    singer={track.singer}
                    key={track.imageUrl}
                  />
                );
              })}
            </div>
          ) : (
            <>
              <Genres genres={genres} title="Genres" />
              <Genres genres={moods} title="Mood" />
            </>
          )}
        </div>
      ) : (
        <SearchPageSkeleton />
      )}
    </SiteLayout>
  );
};
const SearchPageSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-8 p-4 lg:justify-start">
      <Skeleton className="h-12 w-full rounded-3xl lg:w-1/4" />
      <Skeleton className="h-6 w-2/4 rounded-3xl lg:w-1/6" />

      <div className="grid w-full grid-cols-2 grid-rows-1 gap-3 lg:w-3/4 lg:grid-cols-6 lg:grid-rows-2">
        <Skeleton className="h-20 w-full rounded-md lg:h-32" />
        <Skeleton className="h-20 w-full rounded-md lg:h-32" />
      </div>
      <Skeleton className="h-6 w-2/4 rounded-3xl lg:w-1/6" />
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-3 lg:grid-cols-6">
        <Skeleton className="h-20 w-full rounded-md lg:h-32" />
        <Skeleton className="h-20 w-full rounded-md lg:h-32" />
        <Skeleton className="h-20 w-full rounded-md lg:h-32" />
      </div>
    </div>
  );
};
export default SearchPage;
