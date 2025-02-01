import { FaRegClock } from "react-icons/fa";

export function SongListHeader() {
  return (
    <div>
      {/* Contenedor del encabezado */}
      <div className="flex items-center p-2 rounded-t-lg">
        {/* Numeral a la izquierda que indica el número de la canción */}
        <div className="w-6 ml-5 text-white font-semibold">#</div>

        {/* Nombre de la canción */}
        <div className="ml-4 flex-1 text-white text-sm font-semibold">
          Título
        </div>

        {/* Álbum */}
        <div className="w-[500px] text-white text-sm font-semibold ml-2">
          Álbum
        </div>

        {/* Ícono de reloj alineado a la derecha */}
        <div className="w-16 flex justify-end mr-10 px-3">
          <FaRegClock className="text-white text-lg" />
        </div>
      </div>

      {/* Línea divisoria */}
      <hr className="border-gray-700 mb-1.5 w-full mx-auto border-t-1" />
    </div>
  );
}
