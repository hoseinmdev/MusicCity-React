# Music City

A Persian/international music streaming web app built with React and TypeScript. Streams live 30-second previews via the iTunes Search API — no API key required.

## Features

- **Live music data** — Fetches real tracks from the iTunes Search API (new releases + top hits)
- **30-second previews** — In-browser audio player with play/pause, seek timeline, and prev/next navigation
- **Favorites playlist** — Like any track to add it to a personal favorites playlist (persisted in localStorage)
- **Playlists** — Browse curated genre playlists (Pop, Rap, Rock, Chill, Romantic, and more)
- **Artists** — Artist directory with individual pages showing their tracks and follower count
- **Search** — Real-time search by song name or artist name; browse by Genre and Mood categories
- **Dark / Light mode** — Theme toggle, persisted across sessions
- **Fully responsive** — Mobile-first layout that adapts to desktop
- **Skeleton loading states** — Smooth placeholders on every page while data loads
- **PWA support** — Installable as a progressive web app

## Pages

| Route           | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `/`             | Home — featured slider, playlists grid, New Songs, Top Songs |
| `/artists`      | Artist directory                                             |
| `/artist/:id`   | Single artist page with their tracks                         |
| `/search`       | Search by track/artist; genre and mood browse                |
| `/browse`       | Browse by category                                           |
| `/track/:id`    | Track detail page with full audio player                     |
| `/playlist/:id` | Playlist page (including "Your Favorites")                   |

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool and dev server
- **Tailwind CSS** — utility-first styling
- **Redux Toolkit** — global state (tracks, playlists, artists)
- **React Router DOM v6** — client-side routing
- **Axios** — HTTP requests to iTunes API
- **MUI** — select UI components
- **Swiper** — home page slider
- **React Toastify** — toast notifications
- **vite-plugin-pwa** — PWA / service worker

## Project Structure

```
src/
├── assets/          # Images (Playlists, SearchCategories, Slider) + Vazir font
├── components/
│   ├── common/      # Shared: TrackBox, TrackLine, ArtistAvatar, Skeleton, ...
│   ├── HomePage/    # Slider, PlayLists, TracksList, ThemeChangerButton
│   ├── SearchPage/  # Genres grid
│   ├── TrackPage/   # MusicPlayerControllers, MoreMusics
│   └── ArtistsPage/ # ArtistsList
├── pages/           # One file per route
├── redux/           # TracksSlice, PlaylistsSlice, ArtistsSlice
├── layout/          # SiteLayout (Navbar + page wrapper)
├── utils/           # itunesApi, saveToLocal, getFromLocal, getTrackFromUrl, ...
└── db/              # genreMoods — static genre/mood category data
```

## Getting Started

```bash
npm install
npm run dev
```

The dev server proxies `/itunes/*` to `https://itunes.apple.com` (configured in `vite.config.ts`) to avoid CORS issues during development.

```bash
npm run build   # TypeScript compile + Vite production build
npm run preview # Preview the production build locally
```
