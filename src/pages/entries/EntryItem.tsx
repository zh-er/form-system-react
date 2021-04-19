import React, {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';
import {EntryStatus} from "../../models/Entry.model";
import {EntryStatusString} from "../../utils/report-status";

export interface IEntryItemProps {
    id?: string, // uuid
    date: Date,
    username?: string,
    status?: EntryStatus,
    content: string
}

export const EntryItem: FunctionComponent<IEntryItemProps> = (props) => {

    const {id, date, username, status, content} = props;

    return (
        <Link to={`/entry/${id}`} className={"max-w-screen-sm w-full"}>
            <div className={"bg-gray-50 px-4 py-3 mx-4 my-2 hover:bg-gray-200 rounded-md shadow"}>
                <div className={"flex border-b border-gray-200 mb-1 pb-2"}>
                    <div className={"flex-1 flex items-start flex-col"}>
                        <div className={"font-medium text-black"}>
                            {date.toDateString()}
                        </div>
                        <div>Created by: {username}</div>
                    </div>
                    <div className={"ml-4 flex items-start justify-center font-bold"}>
                        {EntryStatusString(status)}
                    </div>
                </div>

                <p className={"h-12 max-w-full overflow-ellipsis text-left overflow-hidden"}>
                    {content}
                </p>
            </div>
        </Link>
    )
}
