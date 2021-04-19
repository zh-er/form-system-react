import {User} from "../models/User.model";
import {Config} from "./config";

const BASE_URL = Config.apiUrl

export default function getUser(token: string): Promise<User> {
    const url = BASE_URL + `/user/info`;
    const opts = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
    return fetch(url, opts)
        .then((resp) => resp.json())
        .then((data) => data.user as User)
}
