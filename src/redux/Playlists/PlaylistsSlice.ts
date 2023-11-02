import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ITrack } from "../Tracks/TracksSlice";

export interface IPlaylist {
  id: string;
  title: string;
  followers: number;
  imageUrl: string;
  tracks?:ITrack[]
}
export interface PlaylistsState {
  playlists: IPlaylist[];
  loading: boolean;
}

export const getPlaylists = createAsyncThunk("playlists/getPlaylists", async () => {
  try {
    const response = await axios.get(
      "https://musiccity-api.netlify.app/playlists",
    );
    return response.data.data;
  } catch (error) {
    return [];
  }
});

const initialState: PlaylistsState = {
  playlists: [],
  loading: false,
};

export const PlaylistSlice = createSlice({
  name: "allPlaylists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPlaylists.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPlaylists.fulfilled, (state, action) => {
      state.playlists = action.payload;
      state.loading = false;
    });
  },
});
export default PlaylistSlice.reducer;
