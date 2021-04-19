import React from 'react';
import {Entry} from "../../models/Entry.model";
import {Link} from 'react-router-dom';
import useSWR from "swr";
import {getAllEntries} from "../../api/entry.service";
import useAuth from "../../data/AuthContext";
import {EntryItem} from './EntryItem';

export const Entries = () => {

    const {token} = useAuth();
    const {data, error} = useSWR<Entry[]>(['report/', token], getAllEntries);

    return (
        <div className={"h-screen"}>
            <div className={"flex justify-end mt-2"}>
                <Link to={"/entry/create"} className={"btn-blue px-3 py-2 m-2 bg-green-600 rounded text-white text-sm"}>
                    Create New Report
                </Link>
            </div>
            <div className={"flex flex-col items-center"}>
                {
                    error ?
                        <div>Error loading</div> :
                        data?.map((entry, index) => (
                            <EntryItem
                                key={index}
                                id={entry.id}
                                date={entry.updatedAt}
                                username={entry.username}
                                status={entry.status}
                                content={entry.content}/>
                        ))
                }
            </div>
        </div>
    );
}
