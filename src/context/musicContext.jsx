import { createContext, useState, useContext, useRef } from "react";

export const musicContext = createContext();

export const useMusic = () => {
  const context = useContext(musicContext);

  return context;
};

export function MusicProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(new Audio());

  const songTitle = currentSong ? currentSong.title : "";
  const songArtist = currentSong ? currentSong.artist : "";
  const songCover = currentSong ? currentSong.cover_url : "";

  const togglePlay = (song) => {
    try {
      if (song && song !== currentSong) {
        audioRef.current.pause();

        setCurrentSong(song);

        audioRef.current.src = song.file_url;

        audioRef.current.load();
        audioRef.current.play();

        setIsPlaying(true);
      } else {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    } catch (error) {
      console.error(error);
    }
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
        audioRef,
        togglePlay,
        progress,
        setProgress,
        songTitle,
        songArtist,
        songCover,
      }}
    >
      {children}
    </musicContext.Provider>
  );
}
