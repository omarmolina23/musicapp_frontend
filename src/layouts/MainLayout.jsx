import { Outlet } from "react-router-dom";
import { Navbar } from "../components/mainComponents/Navbar";
import { Sidebar } from "../components/mainComponents/Sidebar";
import { MusicPlayer } from "../components/mainComponents/MusicPlayer";
import { Login } from "../pages/Login";
export function MainLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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
      <div style={{ position: "fixed", bottom: 0 }}>
        <MusicPlayer />
      </div>
    </div>
  );
}
