import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { House, Search, PersonFill } from "react-bootstrap-icons";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para manejar el menú desplegable

  const { signOut } = useAuth();

  const navigate = useNavigate();
  // Función para alternar el estado del menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className=" text-white w-screen h-16 flex">
      <div className="flex justify-between items-center w-full px-4">
        {/* Logo */}
        <div className="flex items-center w-[300px]">
        <Link to="/" className="text-2xl font-bold absolute left-6">
          Musicapp
        </Link>
        </div>
        

        {/* Barra de búsqueda con los íconos */}
        <div className="flex justify-center items-center w-[460px]  mx-auto relative">
          {/* Ícono de la casa dentro de un círculo */}
          <Link to="/" className="mr-2">
            <div className="flex justify-center items-center bg-gray-700 w-11 h-11 rounded-full hover:scale-105 transition">
              <House className="w-6 h-6 text-white" />
            </div>
          </Link>

          {/* Barra de búsqueda con ícono de lupa dentro */}
          <div className="relative w-full">
            {/* Ícono de lupa dentro de la barra */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5 text-white" />
            </div>

            {/* Barra de búsqueda */}
            <input
              type="text"
              placeholder="¿Qué quieres reproducir?"
              className="w-full pl-12 py-2.5 px-4 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 truncate"
            />
          </div>
        </div>

        {/* Ícono de usuario a la derecha */}
        <div className="relative flex justify-end w-[300px]">
          <button
            onClick={toggleMenu}
            className="flex justify-center items-center bg-gray-700 w-11 h-11 rounded-full hover:scale-105 transition"
          >
            <PersonFill className="w-6 h-6 text-white" />
          </button>

          {/* Menú desplegable */}
          {menuOpen && (
            <div className="absolute right-[-11px] top-[54px] w-48 bg-gray-700 text-white text-sm rounded-md shadow-lg z-30">
              <ul>
                <li className="px-4 py-2 rounded-t-md hover:bg-gray-600">
                  <Link to="/profile">Perfil</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-600">
                  <Link to="/settings">Configuración</Link>
                </li>
                <hr className="border-gray-600 w-full mx-auto border-t-1" />
                <li className="px-4 py-2 rounded-b-md hover:bg-gray-600">
                  <button onClick={handleSignOut}>Cerrar Sesión</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
