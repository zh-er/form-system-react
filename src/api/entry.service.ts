import {Entry} from "../models/Entry.model";
import {Config} from "./config";

const BASE_URL = Config.apiUrl

export async function createReport(data: Entry, token: string): Promise<Entry> {

    const url = `${BASE_URL}/report`

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }

    return fetch(url, requestOptions)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
}

export function updateReport(data: Entry, token: string): Promise<Entry> {

    const url = `${BASE_URL}/report/${data.id}`

    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': token},
        body: JSON.stringify(data)
    }
    return fetch(url, requestOptions)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
}


export function getAllEntries(...args: [string, string]): Promise<Entry[]> {
    const [, token] = args;
    const url = `${BASE_URL}/report/`;

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: token
        }
    };

    return fetch(url, requestOptions)
        .then((resp) => resp.json())
        .then((resp) => resp.data
            .map((data: Entry) => ({
                ...data,
                updatedAt: new Date(data.updatedAt)
            })))
}

export async function getEntryById(...args: [string | null, string | null, string | null]): Promise<Entry> {
    const [, id, token] = args;

    if (!id) {
        return {content: '', updatedAt: new Date()}
    }
    const url = `${BASE_URL}/report/${id}`;

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: token ? token : ''
        }
    };


    return fetch(url, requestOptions)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
}
