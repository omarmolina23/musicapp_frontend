import { createContext, useState, useContext, useRef, useEffect } from "react";

export const musicContext = createContext();

export const useMusic = () => {
  const context = useContext(musicContext);

  return context;
};

export function MusicProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(new Audio());

  const songTitle = currentSong ? currentSong.title : "";
  const songArtist = currentSong ? currentSong.artist : "";
  const songCover = currentSong ? currentSong.cover_url : "";

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.file_url;

      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  const togglePlay = (song) => {
    if (song && song !== currentSong) {
      // Cambiar la canción solo si es diferente
      setCurrentSong(song);
    } else if (currentSong) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleVolume = () => {
    if (volume === 0) {
      setVolume(prevVolume);
    } else {
      setPrevVolume(volume);
      setVolume(0);
    }

    audioRef.current.volume = volume;
  };

  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <musicContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        prevVolume,
        setPrevVolume,
        audioRef,
        togglePlay,
        toggleVolume,
        progress,
        setProgress,
        songTitle,
        songArtist,
        songCover,
        formatDuration,
      }}
    >
      {children}
    </musicContext.Provider>
  );
}
