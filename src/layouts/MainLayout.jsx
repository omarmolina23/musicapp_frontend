import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/mainComponents/Navbar';
import { Login } from '../components/registration/Login';
export function MainLayout() {
  return (
    <div style={{ display: "flex" }}>

        <Navbar />
        <Outlet />

    </div>
  );
}

