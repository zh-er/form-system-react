import {createContext, useContext} from "react";

export interface IAuthContext {
    loginUser: (token: string) => void,
    logoutUser: () => void,
    isLoggedIn: boolean,
    token: string | null
}

export const AuthContext = createContext<IAuthContext>({
    loginUser: (token: string) => {
    },
    logoutUser: () => {
    },
    isLoggedIn: false,
    token: null,
})

export default function useAuth() {
    return useContext(AuthContext);
}

