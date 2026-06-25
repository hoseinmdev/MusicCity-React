export const itunesSearch = (params: string) => `/itunes/search?${params}`;

export const proxyAudioUrl = (url: string): string => {
  if (!url) return "";
  return url.replace(/^https:\/\/audio-ssl\.itunes\.apple\.com/, "/audio");
};

export const proxyImageUrl = (url: string): string => {
  if (!url) return "";
  return url.replace(/^https:\/\/is\d+-ssl\.mzstatic\.com/, "/imagecdn");
};
