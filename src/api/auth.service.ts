import {User} from "../models/User.model";
import {Config} from "./config";

const BASE_URL = Config.apiUrl;

export interface ILoginResponse {
    token: string,
    user: User
}

export function login(email?: string, password?: string): Promise<ILoginResponse> {

    const url = `${BASE_URL}/user/login`;

    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }

    return fetch(url, requestOption)
        .then((resp) => resp.json())
}

export function signUp(email?: string, password?: string, username?: string): Promise<any> {
    const url = `${BASE_URL}/user/signup`;

    const requestOption = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            username
        })
    }

    return fetch(url, requestOption)
        .then((resp) => resp.json())

}

export function refreshToken(token: string): Promise<Response> {
    const url = ``;
    const requestOption = {
        method: 'POST',
        body: JSON.stringify({token})
    }
    return fetch(url, requestOption)
        .then((response) => {
            return response;
        })
}

