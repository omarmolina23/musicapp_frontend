import { useEffect, useRef, useState } from "react";
import { useMusic } from "../../context/musicContext";
import { VolumeUp, VolumeDown, VolumeMute } from "react-bootstrap-icons";
import {
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
} from "react-icons/md";

export function MusicPlayer() {
  const {
    songTitle,
    songArtist,
    songCover,
    audioRef,
    togglePlay,
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    progress,
    setProgress,
  } = useMusic();

  useEffect(() => {
    console.log("Hola cambié de cancion");
  }, [currentSong]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleTimeUpdate = () => {
    console.log(
      "Tiempo actual:",
      audioRef.current.currentTime,
      "Duración total:",
      audioRef.current.duration
    );
    if (audioRef.current && audioRef.current.duration) {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    } else {
      setProgress(0); // Asegura que progress nunca sea NaN
    }
  };

  return (
    <div className="text-white w-screen h-[85px] flex ">
      <div className="flex justify-between items-center w-full px-4">
        {/* Izquierda: Card de la canción */}
        <div className="flex items-center space-x-4">
          <img
            src={songCover}
            alt={songTitle}
            className="w-14 h-14 mb-1 rounded-sm"
          />
          <div>
            <p className="text-sm font-semibold">{songTitle}</p>
            <p className="text-xs text-gray-400">{songArtist}</p>
          </div>
        </div>

        {/* Centro: Botón de reproducción y barra de progreso */}
        <div className="flex flex-col items-center w-[520px] mb-2">
          <button
            onClick={togglePlay}
            className="p-0 mb-3 rounded-full hover:bg-gray-600"
          >
            {isPlaying ? (
              <MdOutlinePauseCircleFilled size={36} />
            ) : (
              <MdOutlinePlayCircleFilled size={36} />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={() => {}}
            className="w-full h-1 bg-gray-600 rounded-xl appearance-none cursor-pointer"
          />
        </div>

        {/* Derecha: Control de volumen */}
        <div className="flex items-center space-x-2">
          {volume >= 0.5 ? (
            <VolumeUp size={20} />
          ) : volume === 0 ? (
            <VolumeMute size={20} />
          ) : (
            <VolumeDown size={20} />
          )}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-30 h-1 bg-gray-700 rounded-xl appearance-none cursor-pointer "
          />
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
}
