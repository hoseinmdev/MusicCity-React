import { ITrack } from "@/redux/Tracks/TracksSlice";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const GetTrackFromUrl = (): ITrack | undefined => {
  const { tracks } = useSelector((state: RootState) => state.tracks);
  const { track } = useParams();
  const location = useLocation();

  const fromRedux = tracks.find((t) => t.id === track);
  if (fromRedux) return fromRedux;

  // Fallback: use data passed through navigation state
  const s = location.state;
  if (s?.url && s?.musicName && track) {
    return {
      id: track,
      url: s.url,
      imageUrl: s.imageUrl ?? "",
      musicName: s.musicName,
      singer: s.singer ?? "",
    };
  }

  return undefined;
};
export default GetTrackFromUrl;
