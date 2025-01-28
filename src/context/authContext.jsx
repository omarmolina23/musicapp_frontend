import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";

export const authContext = createContext();

export const useAuth = () =>{
    const context = useContext(authContext);

    return context;
} 
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    
    const signUp = async (name, email, password) =>{

            try{
                const response = await axios.post("/signup", {name, email, password});
                
                setUser({
                    name: name,
                    email: email
                })
            }
            catch(error){
                if(error.response) throw new Error(error.response.data.message);
                else throw new Error("Error de red. Por favor, inténtalo de nuevo.");
            }
            
    }

    const signIn = async (email, password) =>{
        try {
            const response = await axios.post("/signin", {email, password});

            console.log("Login exitoso", response);

            

        } catch (error) {
            if(error.response) throw new Error(error.response.data.message);
            else throw new Error("Error de red. Por favor, inténtalo de nuevo.");
        }
    }

    const signInWithGoogle = async (token) =>{
        try{

            console.log("token", token.credential);
            const response = await axios.post("/google", {token: token.credential});
            console.log("response", response);
            const responseSignUp = await axios.post("/signup", {name: response.data.name, email: response.data.email, googleId: response.data.googleId});

            console.log("responseSignUp", responseSignUp);
            
        }
        catch(error){
            if(error.response) throw new Error(error.response.data.message);
            else throw new Error("Error de red. Por favor, inténtalo de nuevo.");
        }
    }

    return (
        <authContext.Provider value={{signUp, signIn, signInWithGoogle}}>
            {children}
        </authContext.Provider>
    )
}

