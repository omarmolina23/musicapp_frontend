import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Alert } from "../components/alerts/Alert";
import { useNavigate } from "react-router-dom";
import { SignButton } from "../components/registration/SignButton";
import { GoogleButton } from "../components/google/GoogleButton";
import { AlertDown } from "../components/alerts/AlertDown";
import { Eye, EyeOff } from "lucide-react";

export function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [validUser, setValidUser] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [userFocus, setUserFocus] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp, signUpWithGoogle } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setValidUser((prev) => ({
      ...prev,
      name: validateName(user.name),
    }));
  }, [user.name]);

  useEffect(() => {
    setValidUser((prev) => ({
      ...prev,
      email: validateEmail(user.email),
    }));
  }, [user.email]);

  useEffect(() => {
    setValidUser((prev) => ({
      ...prev,
      password: validatePassword(user.password),
    }));
  }, [user.password]);

  useEffect(() => {
    setError("");
  }, [user]);

  const validateName = (name) => {
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]{3,50}$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleFocusOn = ({ target: { name } }) => {
    setUserFocus({ ...userFocus, [name]: true });
  };

  const handleFocusOff = ({ target: { name } }) => {
    setUserFocus({ ...userFocus, [name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(user.name, user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleGoogleSignInSuccess = async (response) => {
    setLoading(true);
    try {
      await signUpWithGoogle(response);
      navigate("/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleGoogleSignInFailure = () => {
    setError("Error al registrarse con Google");
    setLoading(false);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-900 text-white p-6">
      <div className="bg-white rounded w-full max-w-sm m-auto">
        {error && <Alert message={error} />}

        <h1 className="block text-black text-2xl text-center mt-6 mb-4 font-bold">
          Regístrate
        </h1>
        <hr className="border-gray-400 w-5/6 mx-auto border-t-2" />

        <form onSubmit={handleSubmit} className="px-6 pt-8 pb-2 mb-2">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              name="name"
              autoComplete="off"
              className={`text-black shadow appearance-none border rounded w-full py-3 px-3 leading-relaxed focus:outline-none focus:shadow-outline ${
                userFocus.name && !validUser.name ? "border-red-500" : ""
              }`}
              onChange={handleChange}
              onFocus={handleFocusOn}
              onBlur={handleFocusOff}
              disabled={loading}
            />
            <AlertDown
              params={userFocus.name && user.name && !validUser.name}
              message={
                "El nombre debe tener entre 3 y 50 caracteres y solo puede incluir letras y espacios."
              }
            />
          </div>

          <div className="mb-4">
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
                userFocus.email && !validUser.email ? "border-red-500" : ""
              }`}
              onChange={handleChange}
              onFocus={handleFocusOn}
              onBlur={handleFocusOff}
              disabled={loading}
            />
            <AlertDown
              params={userFocus.email && user.email && !validUser.email}
              message={"El correo no es válido."}
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
                  userFocus.password && !validUser.password
                    ? "border-red-500"
                    : ""
                }`}
                onChange={handleChange}
                onFocus={handleFocusOn}
                onBlur={handleFocusOff}
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
              params={
                userFocus.password && user.password && !validUser.password
              }
              message={
                "La contraseña debe tener al menos 8 caracteres, incluyendo una letra y un número."
              }
            />
          </div>

          <SignButton
            classNameProps="flex items-center justify-center mb-3"
            classNameButtonProps={
              validUser.name && validUser.email && validUser.password
            }
            disableButtonProps={
              !validUser.name || !validUser.email || !validUser.password
            }
            loading={loading}
            message="Registrarse"
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
