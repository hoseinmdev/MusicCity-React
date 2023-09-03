import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const getArtists = createAsyncThunk("artists/getArtists", async () => {
  try {
    const response = await axios.get(
      "https://musiccity-api.netlify.app/artists",
    );
    return response.data.data;
  } catch (error) {
    return [];
  }
});

const initialState: ArtistsState = {
  artists: [],
  loading: false,
};

export const ArtistsSlice = createSlice({
  name: "allArtists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArtists.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
      state.loading = false;
    });
  },
});
export default ArtistsSlice.reducer;
