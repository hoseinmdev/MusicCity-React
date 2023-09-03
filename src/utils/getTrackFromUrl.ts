import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const GetTrackFromUrl = () => {
  const { tracks } = useSelector((state: RootState) => state.tracks);
  const { track } = useParams();
  const trackToPlay = tracks.find((t) => t.id === track);
  return trackToPlay;
};
export default GetTrackFromUrl;
