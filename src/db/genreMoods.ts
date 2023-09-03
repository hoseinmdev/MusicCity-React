import Pop from "@/assets/SearchCategories/Pop.jpg";
import Rap from "@/assets/SearchCategories/Rap.jpg";
import Romance from "@/assets/SearchCategories/Romance.jpg";
import Sad from "@/assets/SearchCategories/Sad.jpg";
import Nostalgic from "@/assets/SearchCategories/Nostalgic.jpg";
import { PLAYLIST_PAGE } from "@/pathes";
export const genres = [
  {
    title: "Pop",
    path: `/${PLAYLIST_PAGE}/e52a5568e17699c19dd55818ebd49500`,
    imageUrl: Pop,
  },
  {
    title: "Rap",
    path: `/${PLAYLIST_PAGE}/c47f803da3186f5b98397a641d79ba86`,
    imageUrl: Rap,
  },
];
export const moods = [
  {
    title: "Romantic",
    path: `/${PLAYLIST_PAGE}/d5ded8664c9411bb4190136f7bb0e892`,
    imageUrl: Romance,
  },
  {
    title: "Sad",
    path: `/${PLAYLIST_PAGE}/a41f720b9093682735763fb6e5dfce09`,
    imageUrl: Sad,
  },
  {
    title: "Nostalgia",
    path: `/${PLAYLIST_PAGE}/68357c8a8be073b4588e65cc32c1e522`,
    imageUrl: Nostalgic,
  },
];
