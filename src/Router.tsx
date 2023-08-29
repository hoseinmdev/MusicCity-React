import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArtistsPage from "./pages/ArtistsPage";
import TrackPage from "./pages/TrackPage";
import SearchPage from "./pages/SearchPage";
import BrowsePage from "./pages/BrowsePage";
import SingleArtistPage from "./pages/SingleArtistPage";
import PlaylistPage from "./pages/PlaylistPage";

const Router = () => (
  <Routes>
    <Route path="*" element={<HomePage />} />
    <Route path="/Artists" element={<ArtistsPage />} />
    <Route path="/Search" element={<SearchPage />} />
    <Route path="/Browse" element={<BrowsePage />} />
    <Route path="/Track/:track/:playlist?" element={<TrackPage />} />
    <Route path="/SingleArtist/:artist" element={<SingleArtistPage />} />
    <Route path="/Playlist/:playlist" element={<PlaylistPage />} />
  </Routes>
);
export default Router;
