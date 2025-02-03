import { useEffect, useRef, useState } from "react";
import { useMusic } from "../../context/musicContext";
import { VolumeUp, VolumeDown, VolumeMute } from "react-bootstrap-icons";
import {
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
} from "react-icons/md";
import { TimeCounter } from "./TimeCounter";

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

  const [isSeeking, setIsSeeking] = useState(false);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleTimeUpdate = () => {
    if (isSeeking) return;
    if (audioRef.current && audioRef.current.duration) {
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
    } else {
      setProgress(0);
    }
  };

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
  };

  const handleProgressMouseDown = () => {
    setIsSeeking(true);
  };

  const handleProgressMouseUp = () => {
    setIsSeeking(false);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime =
        (progress / 100) * audioRef.current.duration;
    }
  };

  const handlePlayPause = () => {
    togglePlay();
  };

  return (
    <div className="text-white w-screen h-[85px] flex ">
      <div className="flex justify-between items-center w-full px-4">
        <div className="flex items-center w-[400px] space-x-3">
          {currentSong ? (
            <>
              <img
                src={songCover}
                alt={songTitle}
                className="w-14 h-14 mb-1 rounded-sm"
              />
              <div className="flex flex-col overflow-hidden">
                <p className="text-sm font-semibold truncate">{songTitle}</p>
                <p className="text-xs text-gray-400 truncate">{songArtist}</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-14 h-14 mb-1 rounded-sm bg-gray-600"></div>
              <div className="flex-1">
                <div className="w-32 h-4 mb-1 rounded-sm bg-gray-500"></div>
                <div className="w-20 h-3 mb-1 rounded-sm bg-gray-500"></div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col w-[580px] items-center ml-2 mr-2 mb-2">
          <button
            onClick={handlePlayPause}
            className="p-0 mb-2 rounded-full transition hover:scale-105 "
          >
            {isPlaying ? (
              <MdOutlinePauseCircleFilled size={36} />
            ) : (
              <MdOutlinePlayCircleFilled size={36} />
            )}
          </button>
          <div className="flex items-center w-full">
            <TimeCounter
              currentSong={currentSong}
              audioRef={audioRef}
              propTime={audioRef.current.currentTime}
            />

            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              onMouseDown={handleProgressMouseDown} // Detecta cuando empieza a cambiar la barra
              onMouseUp={handleProgressMouseUp} // Detecta cuando termina de cambiar
              className="w-full h-1 bg-gray-600 rounded-xl appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, white ${progress}%, gray ${progress}%)`,
              }}
            />

            <TimeCounter
              currentSong={currentSong}
              audioRef={audioRef}
              propTime={audioRef.current.duration}
            />
          </div>
        </div>

        <div className="flex justify-end items-center w-[400px] space-x-2">
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
            className="w-30 h-1  rounded-xl appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, white ${
                volume * 100
              }%, #333 ${volume * 100}%)`,
            }}
          />
        </div>

        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
}
