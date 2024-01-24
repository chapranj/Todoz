import { createContext, useContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);



export default function AuthProvider({ children }) {


    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);


    function login(username, password) {
        if (username === 'pranjal' && password === 'pass') {
            setAuthenticated(true);
            setUsername(username)
            return true
        }
        else {
            setAuthenticated(false)
            setUsername(null)
            return false
        }
    }

    function logOut(){
        setAuthenticated(false);
        setUsername(null)
    }

    return (
        // Below block provides the context object that we created AuthContext to 
        // all the children of AuthProvider.
        <AuthContext.Provider value={{  isAuthenticated, login, logOut, username }}>
            {children}
        </AuthContext.Provider>
        // Now, we can provide the context, through the AuthProvider to all the children of AuthProvider.
    )
}