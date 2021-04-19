import useSWR from "swr";
import useAuth from "./AuthContext";
import getUser from "../api/user.service";
import {useEffect, useState} from "react";
import {User} from "../models/User.model";

export default function useUser() {
    const {token} = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const {data, mutate, error} = useSWR(token, getUser, {refreshInterval: 0});

    useEffect(() => {
        if (data) {
            setUser(data)
        }
        if (error) {
            setUser(null)
        }
    }, [data, error])

    return {
        user,
        mutate
    }
}
