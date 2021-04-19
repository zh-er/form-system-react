import {useState} from "react";
import {IAuthContext} from "./AuthContext";

export const useProvideAuth: () => IAuthContext = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const loginUser = (token: string) => {
        localStorage.setItem('token', token)
        setToken(token);
        setIsLoggedIn(true);
    }

    const logoutUser = () => {
        localStorage.removeItem('token')
        setToken(null)
        setIsLoggedIn(false);
    }

    return {
        loginUser,
        logoutUser,
        isLoggedIn,
        token,
    }
}
