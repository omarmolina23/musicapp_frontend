import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);

  return context;
};
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signUp = async (name, email, password) => {
    try {
      const response = await axios.post("/signup", { name, email, password });

      setUser({
        name: name,
        email: email,
      });
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error("Error de red. Por favor, inténtalo de nuevo.");
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await axios.post("/signin", { email, password });
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error("Error de red. Por favor, inténtalo de nuevo.");
    }
  };

  const signUpWithGoogle = async (token) => {
    try {
      const response = await axios.post("/google", { token: token.credential });
      const responseSignUp = await axios.post("/signup", {
        name: response.data.name,
        email: response.data.email,
        googleId: response.data.googleId,
      });
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error("Error de red. Por favor, inténtalo de nuevo.");
    }
  };

  const signInWithGoogle = async (token) => {
    try {
      const response = await axios.post("/google", { token: token.credential });
      const responseSignIn = await axios.post("/signin", {
        name: response.data.name,
        email: response.data.email,
        googleId: response.data.googleId,
      });
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error("Error de red. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <authContext.Provider
      value={{ signUp, signIn, signUpWithGoogle, signInWithGoogle }}
    >
      {children}
    </authContext.Provider>
  );
}
