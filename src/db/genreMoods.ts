import Pop from "@/assets/SearchCategories/Pop.jpg";
import Rap from "@/assets/SearchCategories/Rap.jpg";
import Romance from "@/assets/SearchCategories/Romance.jpg";
import Sad from "@/assets/SearchCategories/Sad.jpg";
import Nostalgic from "@/assets/SearchCategories/Nostalgic.jpg";
import { PLAYLIST_PAGE } from "@/pathes";

export const genres = [
  {
    title: "Pop",
    path: `/${PLAYLIST_PAGE}/playlist_pop`,
    imageUrl: Pop,
  },
  {
    title: "Hip Hop",
    path: `/${PLAYLIST_PAGE}/playlist_hipHop`,
    imageUrl: Rap,
  },
];
export const moods = [
  {
    title: "Romantic",
    path: `/${PLAYLIST_PAGE}/playlist_rb`,
    imageUrl: Romance,
  },
  {
    title: "Chill",
    path: `/${PLAYLIST_PAGE}/playlist_chill`,
    imageUrl: Nostalgic,
  },
  {
    title: "Electronic",
    path: `/${PLAYLIST_PAGE}/playlist_electronic`,
    imageUrl: Sad,
  },
];
