import { useState } from "react";
import { useMusic } from "../../context/musicContext";
import { IoPlaySharp } from "react-icons/io5";

export function SongCard({ song, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const { togglePlay, formatDuration } = useMusic();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePlay = () => {
    togglePlay(song);
  };

  return (
    <div
  className="grid grid-cols-[60px_40px_400px_450px_1fr] items-center rounded-lg px-3 py-1.5 hover:bg-gray-700/70 transition min-w-[350px]"
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  {/* Número de la canción */}
  <div className="text-white font-semibold text-center">
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
    className="w-10 h-10 rounded-md object-cover"
  />

  {/* Información de la canción */}
  <div className="ml-4 min-w-[120px]">
    <h3 className="text-white text-[15px] font-medium">{song.title}</h3>
    <p className="text-gray-400 text-sm">{song.artist}</p>
  </div>

  {/* Álbum (Colocado antes de la duración en la grilla) */}
  <div className="text-gray-400 text-sm truncate">
    {song.album}
  </div>

  {/* Duración */}
  <div className="text-gray-400 text-sm text-center">
    {formatDuration(song.duration)}
  </div>
</div>
  );
}
