import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { itunesSearch } from "@/utils/itunesApi";
import { ITrack } from "../Tracks/TracksSlice";

export interface IPlaylist {
  id: string;
  title: string;
  followers: number;
  imageUrl: string;
  tracks: ITrack[];
}

export interface PlaylistsState {
  playlists: IPlaylist[];
  loading: boolean;
}

interface ItunesTrackItem {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  previewUrl: string | null;
}

interface ItunesSearchResponse {
  results: ItunesTrackItem[];
}

interface PlaylistConfig {
  id: string;
  title: string;
  term: string;
  genre: string;
}

const PLAYLIST_CONFIGS: PlaylistConfig[] = [
  {
    id: "playlist_pop",
    title: "Pop Hits",
    term: "pop hits 2024",
    genre: "pop",
  },
  {
    id: "playlist_rock",
    title: "Rock Classics",
    term: "rock classic hits",
    genre: "rock",
  },
  {
    id: "playlist_hipHop",
    title: "Hip Hop",
    term: "hip hop rap 2024",
    genre: "hipHop",
  },
  { id: "playlist_rb", title: "R&B Soul", term: "r&b soul music", genre: "rb" },
  {
    id: "playlist_electronic",
    title: "Electronic",
    term: "electronic dance music",
    genre: "electronic",
  },
  {
    id: "playlist_jazz",
    title: "Jazz",
    term: "jazz music classics",
    genre: "jazz",
  },
  {
    id: "playlist_chill",
    title: "Chill Vibes",
    term: "chill ambient music",
    genre: "chill",
  },
  {
    id: "playlist_workout",
    title: "Workout",
    term: "workout gym music",
    genre: "workout",
  },
];

export const getPlaylists = createAsyncThunk<IPlaylist[]>(
  "playlists/getPlaylists",
  async (): Promise<IPlaylist[]> => {
    try {
      const responses = await Promise.all(
        PLAYLIST_CONFIGS.map(({ term }) =>
          axios.get<ItunesSearchResponse>(
            itunesSearch(
              `term=${encodeURIComponent(
                term,
              )}&media=music&limit=20&country=us`,
            ),
          ),
        ),
      );

      return PLAYLIST_CONFIGS.map((config, i) => {
        const tracks: ITrack[] = responses[i].data.results
          .filter(
            (item) => item.previewUrl && item.artworkUrl100 && item.trackId,
          )
          .map(
            (item): ITrack => ({
              id: String(item.trackId),
              musicName: item.trackName,
              singer: item.artistName,
              imageUrl: item.artworkUrl100.replace("100x100bb", "500x500bb"),
              url: item.previewUrl ?? "",
              genre: config.genre,
              state: "playlist",
            }),
          );

        return {
          id: config.id,
          title: config.title,
          followers: parseFloat((Math.random() * 900 + 10).toFixed(1)),
          imageUrl: tracks[0]?.imageUrl ?? "",
          tracks,
        };
      });
    } catch {
      return [];
    }
  },
);

const initialState: PlaylistsState = {
  playlists: [],
  loading: false,
};

export const PlaylistSlice = createSlice({
  name: "allPlaylists",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<PlaylistsState>) => {
    builder.addCase(getPlaylists.pending, (state: PlaylistsState) => {
      state.loading = true;
    });
    builder.addCase(
      getPlaylists.fulfilled,
      (state: PlaylistsState, action: PayloadAction<IPlaylist[]>) => {
        state.playlists = action.payload;
        state.loading = false;
      },
    );
  },
});

export default PlaylistSlice.reducer;
