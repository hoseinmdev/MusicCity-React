const BASE = import.meta.env.DEV ? "/itunes" : "https://itunes.apple.com";

export const itunesSearch = (params: string) => `${BASE}/search?${params}`;
