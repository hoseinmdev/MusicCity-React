import { TrackLine } from "@/components/common";
import { allArtists } from "@/db/artists";
import { tracks } from "@/db/tracks";
import SiteLayout from "@/layout/SiteLayout";
import React from "react";
import { useParams } from "react-router-dom";

const SingleArtistPage: React.FC = () => {
  const { artist } = useParams();
  const currentArtist = allArtists.find((a) => a.name === artist);

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
                return (
                  <TrackLine
                    url={track.url}
                    imageUrl={track.imageUrl}
                    musicName={track.musicName}
                    singer={track.singer}
                    key={track.imageUrl}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
};
export default SingleArtistPage;
