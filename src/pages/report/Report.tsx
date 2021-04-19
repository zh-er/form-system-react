import React, {ChangeEvent, FunctionComponent, useState} from "react";
import {ReportMode} from "../../models/Report.model";
import {Entry, EntryStatus} from "../../models/Entry.model";
import useAuth from "../../data/AuthContext";
import useSWR from "swr";
import {createReport, getEntryById, updateReport} from "../../api/entry.service";
import useUser from "../../data/useUser";
import {useHistory, useParams} from "react-router-dom";
import {UserRole} from "../../models/User.model";

export interface IReportProps {
    mode: ReportMode,
    id?: string
}

export const Report: FunctionComponent<IReportProps> = ({mode = ReportMode.VIEW, id}) => {

    const [reportMode, setReportMode] = useState(mode);
    const history = useHistory();

    const {token} = useAuth();
    const {user} = useUser();
    const {data, mutate, error} = useSWR<Entry>(['/report/id', id, token], getEntryById, {
        errorRetryCount: 0,
        refreshInterval: 0,
    })


    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (data) {
            mutate({
                ...data,
                content: event.target.value
            }, false)
        }
    }

    const submitReport = () => {
        console.log('submitReport', data, reportMode)
        if (token && data) {
            if (reportMode === ReportMode.CREATE) {
                createReport(data, token)
                    .then((entry) => {
                        history.push(`/entry/${entry.id}`)
                    })
            }
            if (reportMode === ReportMode.EDIT) {
                updateReport(data, token)
                    .then((entry) => {
                        mutate({
                            ...entry
                        }, false)
                        setReportMode(ReportMode.VIEW)
                    })
            }

        }
    }

    const editReport = () => {
        if (reportMode === ReportMode.VIEW) {
            setReportMode(ReportMode.EDIT)
        } else {
            setReportMode(ReportMode.VIEW)
        }
    }

    const approveReport = () => {
        if (data && token) {
            updateReport({
                ...data,
                status: EntryStatus.APPROVED
            }, token)
                .then((entry) => {
                    mutate({
                        ...entry
                    })
                    setReportMode(ReportMode.VIEW)
                })
        }
    }

    if (error) {
        return <div className="flex justify-center items-center">
            Failed to load, please refresh
        </div>
    }

    return (
        <div className={"flex justify-center items-center"}>

            <div className={"max-w-screen-sm w-full px-3"}>

                <div className={"flex justify-between mt-6 mb-3"}>
                    <h1 className={"font-bold text-2xl"}>
                        Report
                    </h1>
                    {
                        (data?.status === EntryStatus.PENDING && user?.role === UserRole.ADMIN) ?
                            <div>
                                <button
                                    onClick={editReport}
                                    className={"my-2 mx-3 py-1 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}>
                                    Edit
                                </button>
                                <button
                                    onClick={approveReport}
                                    className={"my-2 py-1 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}>
                                    Approve
                                </button>
                            </div>
                            : null
                    }

                </div>
                <div>
                    Date: {data?.updatedAt ? data?.updatedAt?.toLocaleString() : new Date().toLocaleString()}
                </div>
                <div>
                    Edit By: {data?.username ? data?.username : user?.username}
                </div>

                <div className={"w-full mt-4"}>
                    {
                        reportMode === ReportMode.VIEW ?
                            <div>
                                {data?.content}
                            </div>
                            :
                            <div>
                                <div>
                            <textarea
                                className={"w-full"}
                                value={data?.content}
                                onChange={handleTextAreaChange}
                            />
                                </div>
                                <div className={"w-full flex justify-center"}>
                                    <button
                                        onClick={submitReport}
                                        className={"my-2 py-1 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}>
                                        Save
                                    </button>


                                </div>

                            </div>

                    }

                </div>


            </div>

        </div>
    )
}


export const ReportWithId: FunctionComponent = (props) => {
    const {id} = useParams<{ id?: string }>()
    return <Report {...props} mode={ReportMode.VIEW} id={id}/>
}
