import { createContext, useContext, useEffect, useState } from "react";
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

            try{
                const response = await axios.post("/signup", {name, email, password});

                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
            }
            catch(error){
                if(error.response) throw new Error(error.response.data.message);
                else throw new Error("Error de red. Por favor, inténtalo de nuevo.");
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

    const signInWithGoogle = async (response) =>{
        try{
            const {credential} = response;
            console.log("Token de Google", credential);
        }
        catch(error){
            console.log("Error", error);
        }
    }

    return (
        <authContext.Provider value={{signUp, signIn, signInWithGoogle}}>
            {children}
        </authContext.Provider>
    )
}

