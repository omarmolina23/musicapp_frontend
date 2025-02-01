import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Music } from "./pages/Music";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { SuccessfulRegister } from "./pages/SuccessfulRegister";
import { AuthProvider } from "./context/authContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { PublicRoute } from "./components/routing/PublicRoute";
import { MainLayout } from "./layouts/MainLayout";

import "./styles.css";
function App() {
  return (
    <div className="bg-slate-950 h-screen text-black flex">
      <GoogleOAuthProvider clientId="443406548073-mb6e76fdeq18d09e3r2pdq9ioq23euuo.apps.googleusercontent.com">
        <AuthProvider>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/music" element={<Music />} />
              </Route>
            </Route>

            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/register/success"
                element={<SuccessfulRegister />}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
