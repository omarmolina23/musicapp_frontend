import { useMusic } from "../../context/musicContext";

export function TimeCounter({ currentSong, audioRef, propTime }) {
  const { formatDuration } = useMusic();

  return (
    <>
      {currentSong && audioRef.current && audioRef.current.duration ? (
        <span className="text-xs ml-2 mr-2">{formatDuration(propTime)}</span>
      ) : (
        <span className="text-xs ml-2 mr-2">-:-</span>
      )}
    </>
  );
}
