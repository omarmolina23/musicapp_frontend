import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Alert } from "../alerts/Alert";
import { useNavigate } from "react-router-dom";
import { SignButton } from "./SignButton";
import { GoogleButton } from "../google/GoogleButton";
import { AlertDown } from "../alerts/AlertDown";
import { Eye, EyeOff } from "lucide-react";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [isTouched, setIsTouched] = useState({
    email: false,
    password: false,
  });

  const [isTrimmed, setIsTrimmed] = useState({
    email: true,
    password: true,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, signInWithGoogle } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [user]);

  const handleChange = ({ target: { name, value } }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
    setIsTrimmed((prev) => ({ ...prev, [name]: !value.trim() }));

    if (!isTouched[name]) {
      setIsTouched((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar estado de carga

    try {
      await signIn(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  const handleGoogleSignInSuccess = async (response) => {
    setLoading(true);
    try {
      await signInWithGoogle(response);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignInFailure = () => {
    setError("Error al iniciar sesión con Google");
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-900 text-white p-6">

      <div className="bg-white rounded w-full max-w-sm m-auto">
        {error && <Alert message={error} />}

        <h1 className="block text-black text-2xl text-center mt-6 mb-4 font-bold">
          Inicia sesión
        </h1>
        <hr className="border-gray-400 w-5/6 mx-auto border-t-2" />

        <form onSubmit={handleSubmit} className="px-6 pt-8 pb-2 mb-2">
          <div className="mb-6">
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
              className={`text-black shadow appearance-none border rounded w-full py-3 px-3 leading-relaxed focus:outline-none focus:shadow-outline ${
                isTouched.email && isTrimmed.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onChange={handleChange}
              disabled={loading}
            />
            <AlertDown
              params={isTrimmed.email && isTouched.email}
              message={"El correo no puede estar vacío."}
            />
          </div>

          <div className="mb-8 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="*********"
                name="password"
                className={`text-black shadow appearance-none border rounded w-full py-3 pr-12 pl-3 leading-relaxed focus:outline-none focus:shadow-outline ${
                  isTouched.password && isTrimmed.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                onChange={handleChange}
                disabled={loading}
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center text-gray-500 focus:outline-none"
                onClick={toggleShowPassword}
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <AlertDown
              params={isTrimmed.password && isTouched.password}
              message={"La contraseña no puede estar vacía."}
            />
          </div>
          
          <SignButton
            classNameProps={"flex items-center justify-center mb-3"}
            classNameButtonProps={
              user.email.trim() && user.password.trim()
            }
            disableButtonProps={!user.email.trim() || !user.password.trim()}
            loading={loading}
            message={"Iniciar sesión"}
          />

          <GoogleButton
            loading={loading}
            handleGoogleSignInSuccess={handleGoogleSignInSuccess}
            handleGoogleSignInFailure={handleGoogleSignInFailure}
          />
        </form>
      </div>
    </div>
  );
}
