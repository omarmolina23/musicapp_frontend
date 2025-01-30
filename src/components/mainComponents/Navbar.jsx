import { Link } from "react-router-dom";
import { useState } from "react";
import { HomeIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/solid";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar el menú desplegable

  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return(
    <nav className="bg-gray-800 text-white w-screen h-16 shadow-xl flex items-center">
      <div className="flex justify-between items-center w-full px-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold absolute left-6">
          Musicapp
        </Link>

        {/* Barra de búsqueda con los íconos */}
        <div className="flex justify-center items-center w-[450px] mx-auto relative">
          {/* Ícono de la casa dentro de un círculo */}
          <Link to="/" className="mr-2">
            <div className="flex justify-center items-center bg-gray-700 w-11 h-11 rounded-full">
              <HomeIcon className="w-6 h-6 text-white" />
            </div>
          </Link>

          {/* Barra de búsqueda con ícono de lupa dentro */}
          <div className="relative w-full">
            {/* Ícono de lupa dentro de la barra */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <MagnifyingGlassIcon className="w-6 h-6 text-white" />
            </div>

            {/* Barra de búsqueda */}
            <input
              type="text"
              placeholder="¿Qué quieres reproducir?"
              className="w-full pl-12 py-2.5 px-4 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Ícono de usuario a la derecha */}
        <div className="relative">
          <button onClick={toggleMenu} className="flex justify-center items-center bg-gray-700 w-11 h-11 rounded-full">
            <UserIcon className="w-6 h-6 text-white" />
          </button>

          {/* Menú desplegable */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-700 text-white rounded-md shadow-lg">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-600"><Link to="/profile">Perfil</Link></li>
                <li className="px-4 py-2 hover:bg-gray-600"><Link to="/settings">Configuración</Link></li>
                <li className="px-4 py-2 hover:bg-gray-600"><Link to="/logout">Cerrar sesión</Link></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
