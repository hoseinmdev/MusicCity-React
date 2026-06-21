import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface IArtist {
  id: string;
  name: string;
  followers: number;
  imageUrl: string;
  genre?: string;
}

export interface ArtistsState {
  artists: IArtist[];
  loading: boolean;
}

interface ItunesArtistItem {
  artistId: number;
  artistName: string;
  artworkUrl100: string;
}

interface ItunesSearchResponse {
  results: ItunesArtistItem[];
}

const GENRE_SEARCHES: { term: string; genre: string }[] = [
  { term: "pop music", genre: "pop" },
  { term: "rock music", genre: "rock" },
  { term: "hip hop rap", genre: "hipHop" },
  { term: "r&b soul", genre: "rb" },
  { term: "electronic dance", genre: "electronic" },
];

export const getArtists = createAsyncThunk<IArtist[]>(
  "artists/getArtists",
  async (): Promise<IArtist[]> => {
    try {
      const responses = await Promise.all(
        GENRE_SEARCHES.map(({ term }) =>
          axios.get<ItunesSearchResponse>(
            `https://itunes.apple.com/search?term=${encodeURIComponent(
              term,
            )}&media=music&limit=12&country=us`,
          ),
        ),
      );

      const artists: IArtist[] = [];
      const seen = new Set<string>();

      responses.forEach((res, i) => {
        res.data.results.forEach((item) => {
          const artistId = String(item.artistId);
          if (!seen.has(artistId) && item.artworkUrl100 && item.artistId) {
            seen.add(artistId);
            artists.push({
              id: artistId,
              name: item.artistName,
              followers: parseFloat((Math.random() * 90 + 0.5).toFixed(1)),
              imageUrl: item.artworkUrl100.replace("100x100bb", "500x500bb"),
              genre: GENRE_SEARCHES[i].genre,
            });
          }
        });
      });

      return artists;
    } catch {
      return [];
    }
  },
);

const initialState: ArtistsState = {
  artists: [],
  loading: false,
};

export const ArtistsSlice = createSlice({
  name: "allArtists",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<ArtistsState>) => {
    builder.addCase(getArtists.pending, (state: ArtistsState) => {
      state.loading = true;
    });
    builder.addCase(
      getArtists.fulfilled,
      (state: ArtistsState, action: PayloadAction<IArtist[]>) => {
        state.artists = action.payload;
        state.loading = false;
      },
    );
  },
});

export default ArtistsSlice.reducer;
