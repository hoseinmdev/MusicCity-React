import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const getTracks = createAsyncThunk("tracks/getTracks", async () => {
  try {
    const response = await axios.get(
      "https://musiccity-api.netlify.app/tracks",
    );
    return response.data.data;
  } catch (error) {
    return [];
  }
});

const initialState: TracksState = {
  tracks: [],
  loading: false,
};

export const TrackSlice = createSlice({
  name: "allTracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTracks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTracks.fulfilled, (state, action) => {
      state.tracks = action.payload;
      state.loading = false;
    });
  },
});
export default TrackSlice.reducer;
