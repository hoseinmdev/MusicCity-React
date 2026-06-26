let _audio: HTMLAudioElement | null = null;

export const getAudio = (): HTMLAudioElement => {
  if (!_audio) _audio = new Audio();
  return _audio;
};

export const seekAudio = (seconds: number): void => {
  if (_audio) _audio.currentTime = seconds;
};
