import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArtistsPage from "./pages/ArtistsPage";
import TrackPage from "./pages/TrackPage";
import SearchPage from "./pages/SearchPage";
import BrowsePage from "./pages/BrowsePage";
import SingleArtistPage from "./pages/SingleArtistPage";
import PlaylistPage from "./pages/PlaylistPage";
import {
  ARTISTS_PAGE,
  BROWSE_PAGE,
  PLAYLIST_PAGE,
  SEARCH_PAGE,
  SINGLE_ARTIST_PAGE,
  TRACK_PAGE,
} from "./pathes";

const Router = () => (
  <Routes>
    <Route path="*" element={<HomePage />} />
    <Route path={`/${ARTISTS_PAGE}`} element={<ArtistsPage />} />
    <Route path={`/${SEARCH_PAGE}`} element={<SearchPage />} />
    <Route path={`/${BROWSE_PAGE}`} element={<BrowsePage />} />
    <Route path={`/${TRACK_PAGE}/:track/:playlist?`} element={<TrackPage />} />
    <Route
      path={`/${SINGLE_ARTIST_PAGE}/:artist`}
      element={<SingleArtistPage />}
    />
    <Route path={`/${PLAYLIST_PAGE}/:playlist`} element={<PlaylistPage />} />
  </Routes>
);
export default Router;
