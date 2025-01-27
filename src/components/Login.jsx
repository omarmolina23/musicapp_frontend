import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Alert } from "./Alert";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const { signIn, signInWithGoogle } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
  };

  const handleGoogleSignInSuccess = async (response) => {
    try {
      await signInWithGoogle(response);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignInFailure = () => {
    setError("Error al inicar sesión con Google");
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="bg-white rounded w-full max-w-sm m-auto">
      <h1 className="block text-black text-2xl text-center mt-6 mb-4 font-bold">
        Inicia sesión
      </h1>
      <hr className="border-gray-400 w-5/6 mx-auto border-t-2"></hr>

      <form onSubmit={handleSubmit} className="px-6 pt-8 pb-2 mb-2">
        <div className="mb-8">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            placeholder="correo@gmail.com"
            name="email"
            className="text-black shadow appearance-none border rounded w-full py-3 px-3 leading-relaxed focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
        </div>

        <div className="mb-10 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="*********"
            name="password"
            className="text-black shadow appearance-none border rounded w-full py-3 px-3 leading-relaxed focus:outline-none focus:shadow-outline"
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform translate-y-1  flex items-center text-gray-500 focus:outline-none"
            onClick={toggleShowPassword}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="flex items-center justify-center mb-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-3 px-3 rounded-full focus:outline-none focus:shadow-outline w-full"
          >
            Registrarse
          </button>
        </div>

        <div className="flex items-center justify-center flex-grow">
          <GoogleLogin
            onSuccess={handleGoogleSignInSuccess}
            onError={handleGoogleSignInFailure}
            size="large"
            shape="pill"
            logo_alignment="center"
            theme="filled_blue"
            width={"335px"}
          />
        </div>


      </form>
    </div>
  );
}
