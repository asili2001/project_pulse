import IReport from "./IReport";
import IUser from "./IUser";

export interface IProject {
    id: number;
    name: string;
    report_frequency_type: string;
    start: number;
    end: number;
    total_reports?: number;
    reports?: IReport[];
    members?: IUser[];
    unassignedMembers?: IUser[];
}

export interface INewProject {
    name: string;
    report_frequency_type: number | string;
    reports?: IReport[];
    total_reports?: number;
}


export interface IMember extends IUser {
    project_id: number | null;
}