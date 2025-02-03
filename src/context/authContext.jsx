import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);

  return context;
};
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isNewlyRegistered, setIsNewlyRegistered] = useState(() => {
    // Verificamos si el valor está en localStorage cuando cargue la página
    const savedIsNewlyRegistered = localStorage.getItem("isNewlyRegistered");
    return savedIsNewlyRegistered ? JSON.parse(savedIsNewlyRegistered) : false;
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedIsNewlyRegistered = localStorage.getItem("isNewlyRegistered");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    if (savedIsNewlyRegistered) {
      console.log("Holaa");
      setIsNewlyRegistered(JSON.parse(savedIsNewlyRegistered));
    }
  }, []);

  const signUp = async (name, email, password) => {
    try {
      const response = await axios.post("/signup", { name, email, password });

      setUser({
        name: name,
        email: email,
      });

      setIsNewlyRegistered(true);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: name,
          email: email,
        })
      );

      localStorage.setItem("isNewlyRegistered", "true");
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error("Error de red. Por favor, inténtalo de nuevo.");
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await axios.post("/signin", { email, password });

      setUser({
        name: response.data.name,
        email: response.data.email,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data.name,
          email: response.data.email,
        })
      );
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error("Error de red. Por favor, inténtalo de nuevo.");
    }
  };

  const signUpWithGoogle = async (token) => {
    try {
      const response = await axios.post("/google", { token: token.credential });
      await axios.post("/signup", {
        name: response.data.name,
        email: response.data.email,
        googleId: response.data.googleId,
      });

      setUser({
        name: response.data.name,
        email: response.data.email,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data.name,
          email: response.data.email,
        })
      );
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error("Error de red. Por favor, inténtalo de nuevo.");
    }
  };

  const signInWithGoogle = async (token) => {
    try {
      const response = await axios.post("/google", { token: token.credential });
      await axios.post("/signin", {
        name: response.data.name,
        email: response.data.email,
        googleId: response.data.googleId,
      });

      setUser({
        name: response.data.name,
        email: response.data.email,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data.name,
          email: response.data.email,
        })
      );
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error("Error de red. Por favor, inténtalo de nuevo.");
    }
  };

  const signOut = async () => {
    try {
      await axios.post("/signout");
      setUser(null);
      setIsNewlyRegistered(false);

      localStorage.removeItem("user");
      localStorage.removeItem("isNewlyRegistered");
    } catch (error) {
      if (error.response) throw new Error(error.response.data.message);
      else throw new Error("Error de red. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <authContext.Provider
      value={{
        signUp,
        signIn,
        signUpWithGoogle,
        signInWithGoogle,
        signOut,
        user,
        isNewlyRegistered,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
