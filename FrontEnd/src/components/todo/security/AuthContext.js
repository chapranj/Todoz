import { createContext, useContext } from "react";
import { useState } from "react";
import {executeBasicAuth, executeJWTAuthenticationService} from "./AuthenticationApiService";
import {apiClient} from "../api/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {


    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    async function login(username, password) {
        // const baToken = 'Basic '+ window.btoa(username+":"+password)
        // console.log(baToken)
        try {
            const response = await executeJWTAuthenticationService(username,password)
            // console.log(baToken)
            if (response.status === 200){
                const jwtToken = 'Bearer '+response.data.token
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)
                //all api calls are intercepted by this below
                //which basically just adds an Authorization header to the api calls
                apiClient.interceptors.request.use(
                    (config)=>{
                        console.log("intercepting and adding a token")
                        config.headers.Authorization = jwtToken
                        return config;
                    }
                )
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