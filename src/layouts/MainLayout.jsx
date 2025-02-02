import { Outlet } from "react-router-dom";
import { Navbar } from "../components/mainComponents/Navbar";
import { Sidebar } from "../components/mainComponents/Sidebar";
import { MusicPlayer } from "../components/mainComponents/MusicPlayer";
import { MusicProvider } from "../context/musicContext";
export function MainLayout() {
  return (
    <MusicProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw", // Asegura que ocupe todo el ancho
          overflow: "hidden", // Evita el desplazamiento por desbordamiento
        }}
      >
        {/* Navbar en la parte superior */}
        <div style={{ flexShrink: 0 }}>
          <Navbar />
        </div>

        {/* Contenedor principal con Sidebar y Outlet */}
        <div style={{ display: "flex", flex: 1 }}>
          {/* Sidebar en la parte izquierda */}
          <div
            style={{
              flexShrink: 0, // Evita que el Sidebar se encoja
            }}
          >
            <Sidebar />
          </div>

          {/* Contenido dinámico (Outlet) */}
          <div style={{ flex: 1 }}>
            <Outlet />
          </div>
        </div>

        {/* Music Player en la parte inferior */}
        <div style={{ flexShrink: 0 }}>
          <MusicPlayer />
        </div>
      </div>
    </MusicProvider>
  );
}
