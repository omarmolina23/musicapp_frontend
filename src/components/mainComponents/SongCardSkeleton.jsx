export function SongCardSkeleton() {
  return (
    <div className="flex items-center rounded-lg px-3 py-2 bg-gray-700/50 animate-pulse">
      {/* Número de la canción (simulado como un rectángulo) */}
      <div className="w-10 ml-4">
        <div className="w-4 h-4 bg-gray-500 rounded"></div>
      </div>

      {/* Imagen (simulada como un cuadro gris) */}
      <div className="w-10 h-10 rounded-lg bg-gray-500"></div>

      {/* Información de la canción */}
      <div className="ml-4 flex-1">
        <div className="w-32 h-4 bg-gray-500 rounded mb-1"></div>
        <div className="w-20 h-3 bg-gray-600 rounded"></div>
      </div>

      {/* Álbum */}
      <div className="w-[495px] ml-2">
        <div className="w-32 h-3 bg-gray-600 rounded"></div>
      </div>

      {/* Duración */}
      <div className="w-16 flex justify-end mr-8">
        <div className="w-10 h-3 bg-gray-600 rounded"></div>
      </div>
    </div>
  )
}
