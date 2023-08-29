import { createSlice } from "@reduxjs/toolkit";
import { tracks } from "@/db/tracks";

interface Track {
  musicName: string;
  singer: string;
  imageUrl: string;
  url: string;
}
export interface TracksState {
  tracks: Track[];
}
const initialState: TracksState = {
  tracks: tracks,
};

export const TrackSlice = createSlice({
  name: "Tracks",
  initialState,
  reducers: {
    logger: (state) => {
      console.log(state);
    },
    //     incrementByAmount: (state, action: PayloadAction<number>) => {
    //       state.value += action.payload;
    //     },
  },
});

export const { logger } = TrackSlice.actions;

export default TrackSlice.reducer;
