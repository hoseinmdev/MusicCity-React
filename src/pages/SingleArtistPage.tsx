import { TrackLine } from "@/components/common";
import SiteLayout from "@/layout/SiteLayout";
import { getArtists } from "@/redux/Artists/ArtistsSlice";
import { getTracks } from "@/redux/Tracks/TracksSlice";
import { AppDispatch, RootState } from "@/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleArtistPage: React.FC = () => {
  const { artist } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const allArtists = useSelector((state: RootState) => state.artists.artists);
  const tracks = useSelector((state: RootState) => state.tracks.tracks);
  const currentArtist = allArtists.find((a) => a.id === artist);
  useEffect(() => {
    dispatch(getArtists());
    dispatch(getTracks());
  }, []);
  return (
    <SiteLayout>
      <div className="flex h-full w-full  flex-col items-center justify-start gap-2 pb-24 lg:p-4">
        <div className="relative flex h-full w-full flex-col items-center justify-end gap-3 lg:flex-row lg:items-center lg:justify-start lg:gap-8">
          {/* Background image */}
          <div
            className=" absolute h-full w-full  bg-cover bg-no-repeat brightness-50 lg:blur-xl"
            style={{
              backgroundImage: "url(" + `${currentArtist?.imageUrl}` + ")",
            }}
          ></div>
          <img
            src={currentArtist?.imageUrl}
            className="z-40 hidden w-96 rounded-full lg:block"
          />
          <p className="z-40 text-center text-3xl lg:text-start lg:text-4xl lg:opacity-70">
            {currentArtist?.name}
          </p>
          <div className="z-40 flex w-full items-center justify-evenly pb-8 text-sm lg:h-1/6 lg:w-auto lg:justify-start lg:gap-4 lg:border-l lg:border-l-white lg:pb-0 lg:pl-5 lg:text-lg">
            <p>{currentArtist?.followers}</p>
            <p>65m plays</p>
            <p>166.3 likes</p>
          </div>
        </div>
        <div className="flex h-3/4 max-h-full w-full flex-col items-start justify-start gap-4 overflow-auto p-2  lg:h-full lg:max-h-none">
          <p className="opacity-70">Songs ...</p>
          <div className="flex h-full w-full flex-col items-center justify-start gap-3">
            {tracks.map((track) => {
              if (track.singer === currentArtist?.name) {
                return <TrackLine {...track} />;
              }
            })}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};
export default SingleArtistPage;
