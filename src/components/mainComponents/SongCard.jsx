import { useState } from "react";
import { useMusic } from "../../context/musicContext";
import { IoPlaySharp } from "react-icons/io5";

export function SongCard({ song, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const { togglePlay } = useMusic();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePlay = () => {
    console.log("song", song);
    togglePlay(song);
  };

  return (
    <div
      className="flex items-center  rounded-lg px-3 py-2 hover:bg-gray-700/70 transition"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Número de la canción */}
      <div className="w-10 ml-4 text-white font-semibold">
        {isHovered ? (
          <button className="mt-1.5" onClick={handlePlay}>
            <IoPlaySharp className="w-4 h-4 text-white" />
          </button>
        ) : (
          index + 1
        )}
      </div>

      {/* Imagen más pequeña */}
      <img
        src={song.cover_url}
        alt={song.title}
        className="w-10 h-10 rounded-lg object-cover"
      />

      {/* Información de la canción */}
      <div className="ml-4 flex-1">
        <h3 className="text-white text-[15px] font-medium">{song.title}</h3>
        <p className="text-gray-400 text-sm">{song.artist}</p>
      </div>

      {/* Álbum */}
      <div className="w-[495px] text-gray-400 text-sm ml-2">{song.album}</div>

      {/* Duración */}
      <div className="w-16 flex justify-end mr-6 text-gray-400 text-sm">
        {formatDuration(song.duration)}
      </div>
    </div>
  );
}
