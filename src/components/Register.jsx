import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/authContext";
import { Alert } from "./Alert";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

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

  const [error, setError] = useState("");
  const { signUp, signInWithGoogle } = useAuth();

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
    console.log("result", passwordRegex.test(password));
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

    try {
      await signUp(user.name, user.email, user.password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignInSuccess = (response) => {
    signInWithGoogle(response);
  };

  const handleGoogleSignInFailure = () => {
    setError("Error al registrarse con Google");
  };

  return (
    <div className="bg-white rounded w-full max-w-sm m-auto">
      {error && <Alert message={error} />}

      <h1 className="block text-black text-2xl text-center mt-6 mb-4 font-bold">
        Regístrate
      </h1>
      <hr className="border-gray-400 w-5/6 mx-auto border-t-2"></hr>

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
          />
          {userFocus.name && user.name && !validUser.name && (
            <p className="text-red-500 text-xs mt-1">
              El nombre debe tener entre 3 y 50 caracteres y solo puede incluir
              letras y espacios.
            </p>
          )}
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
          />
          {userFocus.email && user.email && !validUser.email && (
            <p className="text-red-500 text-xs mt-1">El correo no es válido.</p>
          )}
        </div>

        <div className="mb-8">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            placeholder="*********"
            name="password"
            className={`text-black shadow appearance-none border rounded w-full py-3 px-3 leading-relaxed focus:outline-none focus:shadow-outline ${
              userFocus.password && !validUser.password ? "border-red-500" : ""
            }`}
            onChange={handleChange}
            onFocus={handleFocusOn}
            onBlur={handleFocusOff}
          />
          {userFocus.password && user.password && !validUser.password && (
            <p className="text-red-500 text-xs mt-1">
              La contraseña debe tener al menos 8 caracteres, incluyendo una
              letra y un número.
            </p>
          )}
        </div>

        <div className="flex items-center justify-center mb-2">
          <button
            className={`${
              validUser.email && validUser.password
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-400"
            } text-white text-sm font-bold py-3 px-3 rounded-full focus:outline-none focus:shadow-outline w-full`}
            disabled={!validUser.email || !validUser.password}
          >
            Registrarse
          </button>
        </div>

        <div>
          <GoogleLogin
            onSuccess={handleGoogleSignInSuccess}
            onError={handleGoogleSignInFailure}
          />
        </div>
      </form>
    </div>
  );
}
