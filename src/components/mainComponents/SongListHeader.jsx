import { FaRegClock } from "react-icons/fa";

export function SongListHeader() {
  return (
    <div>
  {/* Contenedor del encabezado */}
  <div className="grid grid-cols-[60px_440px_505px_1fr] items-center px-3 py-2 rounded-t-lg">
    {/* Numeral a la izquierda */}
    <div className="text-white font-semibold text-center">#</div>

    {/* Nombre de la canción */}
    <div className="text-white text-sm font-semibold">Título</div>

    {/* Álbum */}
    <div className="text-white text-sm font-semibold">Álbum</div>

    {/* Ícono de reloj alineado a la derecha */}
    <div className="text-white text-lg text-center">
      <FaRegClock />
    </div>
  </div>

  {/* Línea divisoria */}
  <hr className="border-gray-700 mb-1.5 w-full mx-auto border-t-1" />
</div>

  );
}
