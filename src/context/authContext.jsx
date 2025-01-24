import { createContext, useContext, useState } from "react";
import axios from "../api/axios";

export const authContext = createContext();

export const useAuth = () =>{
    const context = useContext(authContext);

    return context;
} 
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    const signUp = async (name, email, password) =>{
        try {
            const response = await axios.post("/signup", {name, email, password});

            console.log("Registro exitoso", response);

            setToken(response.data.token);

        } catch (error) {
            console.log("Error", error);
        }
    }

    const signIn = async (email, password) =>{
        try {
            const response = await axios.post("/login", {email, password});

            console.log("Login exitoso", response);

            setToken(response.data.token);

        } catch (error) {
            console.log("Error", error);
        }
    }

    

    return (
        <authContext.Provider value={{signUp, signIn}}>
            {children}
        </authContext.Provider>
    )
}

