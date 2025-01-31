import { Link } from "react-router-dom";
import { SideButton } from "./SideButton";
export function Sidebar() {
  return (
      <div className="bg-slate-900 h-[575px] w-[400px] ml-2 mr-3 rounded-md">
        <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
        <SideButton label="Listas" active={false} />
        <SideButton label="Artistas" active={false} />
        <SideButton label="Álbumes" active={false} />
        <SideButton label="Álbumes" active={false} />
        </div>
      </div>
    );
  
}
