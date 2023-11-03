import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { PlaylistBox } from "../common";
import { useMediaPredicate } from "react-media-hook";
import { IPlaylist } from "@/redux/Playlists/PlaylistsSlice";
import FavoriteMusicsImage from "@/assets/Playlists/YourFavorite.jpg";
const PlayLists: React.FC<{
  playLists: IPlaylist[];
  playListsTitle: string;
}> = ({ playListsTitle, playLists }) => {
  const isMobile = useMediaPredicate("(max-width: 1024px)");
  const favoriteMusics = localStorage.getItem(`favorite`) || "";
  const renderFavorites = () => {
    if (favoriteMusics && favoriteMusics.length > 2) {
      return (
        <SwiperSlide key={"Favorites playlist"}>
          <PlaylistBox
            followers={1}
            id="yourFavoritesMusics"
            imageUrl={FavoriteMusicsImage}
            title="Your Favorites"
            tracks={JSON.parse(favoriteMusics)}
            key={"dasas"}
          />
        </SwiperSlide>
      );
    }
    // {
    //   favoriteMusics && (
    //     <SwiperSlide key={"Favorites playlist"}>
    //       <PlaylistBox
    //         followers={1}
    //         id="yourFavoritesMusics"
    //         imageUrl={FavoriteMusicsImage}
    //         title="Your Favorites"
    //         // tracks={favoriteMusics}
    //         key={"dasas"}
    //       />
    //     </SwiperSlide>
    //   );
    // }
  };
  return (
    <div className="flex w-full flex-col items-start gap-4 fadeShow2">
      <p className="text-lg italic dark:text-white dark:opacity-70 lg:text-2xl">
        • {playListsTitle}
      </p>
      <Swiper
        className=" w-full lg:h-60"
        spaceBetween={20}
        slidesPerView={isMobile ? 2.5 : 8.5}
      >
        <div className="flex w-full justify-between gap-4">
          {renderFavorites()}
          {playLists.map((playList) => {
            return (
              <SwiperSlide key={playList.title}>
                <PlaylistBox {...playList} />
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </div>
  );
};
export default PlayLists;
