import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/registration/Login";
import { Register } from "./components/registration/Register";
import { SuccessfulRegister } from "./components/registration/SuccessfulRegister";
import { AuthProvider } from "./context/authContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ProtectedRoute } from "./components/ProtectedRoute";
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
              </Route>
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/success" element={<SuccessfulRegister />} />
          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
