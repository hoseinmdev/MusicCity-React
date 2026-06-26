import { configureStore } from "@reduxjs/toolkit";
import trackReducer from "@/redux/Tracks/TracksSlice";
import playlistsReducer from "@/redux/Playlists/PlaylistsSlice";
import artistsReducer from "@/redux/Artists/ArtistsSlice";
import playerReducer from "@/redux/Player/PlayerSlice";

export const store = configureStore({
  reducer: {
    tracks: trackReducer,
    playlists: playlistsReducer,
    artists: artistsReducer,
    player: playerReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
