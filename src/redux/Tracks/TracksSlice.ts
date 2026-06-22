import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { itunesSearch } from "@/utils/itunesApi";

export interface ITrack {
  id: string;
  musicName: string;
  singer: string;
  imageUrl: string;
  url: string;
  state?: string;
  genre?: string;
}

export interface TracksState {
  tracks: ITrack[];
  loading: boolean;
}

interface ItunesTrackItem {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl: string | null;
  primaryGenreName: string;
}

interface ItunesSearchResponse {
  results: ItunesTrackItem[];
}

const mapItunesTrack = (item: ItunesTrackItem, state: string): ITrack => ({
  id: String(item.trackId),
  musicName: item.trackName,
  singer: item.artistName,
  imageUrl: item.artworkUrl100.replace("100x100bb", "500x500bb"),
  url: item.previewUrl ?? "",
  state,
  genre: item.primaryGenreName.toLowerCase().replace(/[\s&/]/g, "") || "pop",
});

export const getTracks = createAsyncThunk<ITrack[]>(
  "tracks/getTracks",
  async (): Promise<ITrack[]> => {
    try {
      const [newRes, topRes] = await Promise.all([
        axios.get<ItunesSearchResponse>(
          itunesSearch(
            "term=pop+rnb+new+releases&media=music&limit=30&country=us",
          ),
        ),
        axios.get<ItunesSearchResponse>(
          itunesSearch(
            "term=top+hits+chart+2024&media=music&limit=30&country=us",
          ),
        ),
      ]);

      const seenIds = new Set<string>();

      const newTracks: ITrack[] = newRes.data.results
        .filter((item) => item.previewUrl && item.artworkUrl100 && item.trackId)
        .map((item) => mapItunesTrack(item, "new"))
        .filter((t) => {
          if (seenIds.has(t.id)) return false;
          seenIds.add(t.id);
          return true;
        });

      const topTracks: ITrack[] = topRes.data.results
        .filter((item) => item.previewUrl && item.artworkUrl100 && item.trackId)
        .map((item) => mapItunesTrack(item, "top"))
        .filter((t) => {
          if (seenIds.has(t.id)) return false;
          seenIds.add(t.id);
          return true;
        });

      return [...newTracks, ...topTracks];
    } catch {
      return [];
    }
  },
);

const initialState: TracksState = {
  tracks: [],
  loading: false,
};

export const TrackSlice = createSlice({
  name: "allTracks",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<TracksState>) => {
    builder.addCase(getTracks.pending, (state: TracksState) => {
      state.loading = true;
    });
    builder.addCase(
      getTracks.fulfilled,
      (state: TracksState, action: PayloadAction<ITrack[]>) => {
        state.tracks = action.payload;
        state.loading = false;
      },
    );
  },
});

export default TrackSlice.reducer;
