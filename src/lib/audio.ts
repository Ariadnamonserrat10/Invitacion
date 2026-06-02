let audio: HTMLAudioElement | null = null;

export function getAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio("/music/Fondo.mp3");
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
  }
  return audio;
}

export function resetAudio() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  audio = null;
  getAudio();
}

export function playAudio(): Promise<void> {
  return getAudio().play().catch(() => {});
}

export function pauseAudio() {
  getAudio().pause();
}

export function isAudioPlaying(): boolean {
  return audio ? !audio.paused : false;
}

let autoplayCleanup: (() => void) | null = null;

export function setupAutoplay() {
  let playing = false;
  const handler = () => {
    if (playing) return;
    const a = audio;
    if (a && a.paused) {
      a.play().then(() => { playing = true; }).catch(() => {});
    }
  };
  document.addEventListener("click", handler);
  document.addEventListener("touchstart", handler);
  document.addEventListener("keydown", handler, { once: true });
  autoplayCleanup = () => {
    document.removeEventListener("click", handler);
    document.removeEventListener("touchstart", handler);
    document.removeEventListener("keydown", handler);
  };
  return autoplayCleanup;
}
