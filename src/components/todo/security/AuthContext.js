import { createContext, useContext } from "react";
import { useState } from "react";
import {executeBasicAuth} from "../api/HelloWorldApiService";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);



export default function AuthProvider({ children }) {


    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);


    // function login(username, password) {
    //     if (username === 'pranjal' && password === 'pass') {
    //         setAuthenticated(true);
    //         setUsername(username)
    //         return true
    //     }
    //     else {
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }

    async function login(username, password) {
        const baToken = 'Basic '+ window.btoa(username+":"+password)

        try {
            const response = await executeBasicAuth(baToken)
            if (response.status === 200){
                setAuthenticated(true)
                setUsername(username)
                setToken(baToken)
                return true;
            }
            else {
                logOut()
                return false
            }
        }
        catch (error){
            setAuthenticated(false)
            setUsername(null)
            setToken(null)
            return false
        }




        // if (username === 'pranjal' && password === 'pass') {
        //     setAuthenticated(true);
        //     setUsername(username)
        //     return true
        // }
        // else {
        //     setAuthenticated(false)
        //     setUsername(null)
        //     return false
        // }
    }

    function logOut(){
        setAuthenticated(false);
        setUsername(null)
        setToken(null);
    }

    return (
        // Below block provides the context object that we created AuthContext to 
        // all the children of AuthProvider.
        <AuthContext.Provider value={{  isAuthenticated, login, logOut, username,token }}>
            {children}
        </AuthContext.Provider>
        // Now, we can provide the context, through the AuthProvider to all the children of AuthProvider.
    )
}