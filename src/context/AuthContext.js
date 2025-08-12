
//login button ko lagi yo main code ho (selfish mistake k thiyo vaney Login.jsx ko L capital thiyo tara ya small huhu)

import { createContext, useContext, useEffect, useState } from "react";

//this is like a box which create the container box
const AuthContext = createContext();

//this authprovider is used  to wrap our app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token && userData && userData !== "undefined") {
        try {
            setUser(JSON.parse(userData));
        } catch (err) {
            console.error("Failed to parse user data:", err);
            localStorage.removeItem("user"); // optional cleanup
        }
    }
        setLoading(false);
    }, []);

    const Login = ({ user, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    //this wrap our app
    return (
        <AuthContext.Provider value={{ user, loading, Login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);