import { tracks } from "./tracks";
import Nostalgia from "@/assets/Playlists/Nostalgia.jpg";
export const playLists = [
  {
    title: "Persian Rap",
    imageUrl: "https://cdnmrtehran.ir/media/genremood/6401bbedb2974.jpg",
    followers: 15.2,
    tracks: tracks.filter((t) => t.genre === "rap"),
  },
  {
    title: "Persian Nostalgia",
    imageUrl: Nostalgia,
    followers: 11.2,
    tracks: tracks.filter((t) => t.genre === "nostalgia"),
  },
  {
    title: "Persian Motivation",
    imageUrl: "https://cdnmrtehran.ir/media/genremood/648a8e82cb9d9.jpg",
    followers: 4.3,
    tracks: tracks.filter((t) => t.genre === "motivation"),
  },
  {
    title: "Persian Pop",
    imageUrl: "https://cdnmrtehran.ir/media/genremood/648d75da33e9f.jpg",
    followers: 10.2,
    tracks: tracks.filter((t) => t.genre === "pop"),
  },
  {
    title: "Persian Chill",
    imageUrl: "https://cdnmrtehran.ir/media/genremood/648aa1b38f635.jpg",
    followers: 1.6,
    tracks: tracks.filter((t) => t.genre === "chill"),
  },
  {
    title: "Romantic",
    imageUrl: "https://cdnmrtehran.ir/media/genremood/648d5b24317b7.jpg",
    followers: 13.2,
    tracks: tracks.filter((t) => t.genre === "romantic"),
  },
  {
    title: "Persian Credit",
    imageUrl: "https://cdnmrtehran.ir/media/genremood/648a8ac1aa221.jpg",
    followers: 3.2,
    tracks: tracks.filter((t) => t.genre === "credit"),
  },
  {
    title: "Concert Live",
    imageUrl: "https://cdnmrtehran.ir/media/genremood/63ecfc207dabc.jpg",
    followers: 3.4,
    tracks: tracks.filter((t) => t.genre === "live"),
  },
  {
    title: "New Artists",
    imageUrl: "https://cdnmrtehran.ir/media/genremood/63ee3c7751510.jpg",
    followers: 1.1,
    tracks: tracks.filter((t) => t.genre === "newArtist"),
  },
  {
    title: "Sad Songs",
    imageUrl: "https://cdnmrtehran.ir/media/genremood/648e816dcfb2e.jpg ",
    followers: 10.3,
    tracks: tracks.filter((t) => t.genre === "sad"),
  },
  {
    title: "Sonnati",
    imageUrl: "https://cdnmrtehran.ir/media/genremood/63ecfbecd41d5.jpg",
    followers: 1.8,
    tracks: tracks.filter((t) => t.genre === "sonnati"),
  },
  {
    title: "Persian Viral",
    imageUrl: "https://cdnmrtehran.ir/media/genremood/648acf47f26e3.jpg",
    followers: 1.6,
    tracks: tracks.filter((t) => t.genre === "viral"),
  },
];
