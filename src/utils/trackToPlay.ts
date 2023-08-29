import { tracks } from "@/db/tracks";
import { useParams } from "react-router-dom";

const PlayedTrack = () => {
  const { track } = useParams();
  const trackToPlay = tracks.find((t) => t.musicName === track);
  return trackToPlay
};
export default PlayedTrack;
