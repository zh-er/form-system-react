import {EntryStatus} from "../models/Entry.model";

export const EntryStatusString = (reportStatus?: EntryStatus) => {
    switch (reportStatus) {
        case EntryStatus.ACCEPTED:
            return 'Accepted'
        case EntryStatus.APPROVED:
            return 'Approved'
        case EntryStatus.REJECTED:
            return 'Rejected'
        case EntryStatus.PENDING:
        default:
            return 'Pending'
    }
}
