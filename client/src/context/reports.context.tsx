import React, { createContext, ReactNode, useContext, useState } from "react";
import IReport from "../types/IReport";
import { ProjectServices } from "../api/mainApi";
import { UserContext } from "./user.context";
import { toast } from "react-toastify";


export interface ProjectReports {
    projectId: number;
    memberId: number;
    reportsData: IReport[];
}

export interface IReportContext {
    reports: ProjectReports[];
    getMemberReports: (projectId: number, memberId: number) => Promise<ProjectReports | undefined>
    getTmMemberReports: (projectId: number) => Promise<ProjectReports | undefined>
    submitReport: (projectId: number, reportId: number, content: string) => Promise<boolean>
    toggleReadReport: (projectId: number, reportId: number, userId: number) => Promise<boolean>
}

export const ReportContext = createContext<IReportContext>({
    reports: [],
    getMemberReports: async () => { return undefined },
    getTmMemberReports: async () => { return undefined },
    submitReport: async () => { return false },
    toggleReadReport: async () => { return false }
    
});

interface IProps {
    children: ReactNode
}

export const ReportProvider: React.FC<IProps> = ({ children }) => {
    const [reports, setReports] = useState<ProjectReports[]>([]);
    const { userData } = useContext(UserContext);

    const getMemberReports = async (projectId: number, memberId: number) => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const existingMemberReports = reports.find(report => report.memberId === memberId && report.projectId === projectId);

        if (!existingMemberReports) {
            try {
                let reportsData: IReport[] | string = "";

                if (userData.role === 1) {
                    reportsData = await ProjectServices.getMemberReports(signal, projectId, memberId);
                } else {
                    reportsData = await ProjectServices.getTmMemberReports(signal, projectId);
                }

                if (reportsData === "ABORTED" || typeof reportsData === "string") {
                    return;
                }

                const projectReport = {
                    projectId,
                    memberId,
                    reportsData
                }

                setReports([...reports, projectReport])
                return projectReport;
            } catch (error) {
                console.error(error);
                return;
            }
        }
        return existingMemberReports;

    };
    const getTmMemberReports = async (projectId: number) => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const memberId = userData.id;

        const existingMemberReports = reports.find(report => report.memberId === memberId && report.projectId === projectId);

        if (!existingMemberReports) {
            try {
                const reportsData: IReport[] | string = await ProjectServices.getMemberReports(signal, projectId, memberId);

                if (reportsData === "ABORTED" || typeof reportsData === "string") {
                    return;
                }

                const projectReport = {
                    projectId,
                    memberId,
                    reportsData
                }

                setReports([...reports, projectReport])
                return projectReport;
            } catch (error) {
                console.error(error);
                return;
            }
        }
        return existingMemberReports;

    };

    const submitReport = async (projectId: number, reportId: number, content: string) => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        try {
            let result = await ProjectServices.submitReport(signal, projectId, reportId, content);
            
            if (result === "ABORTED" || typeof result === "string") {
                return false;
            }

            if (result.status !== 200) {
                toast.error(result.message);
                return false;
            }
            
            return true;
        } catch (error: any) {
            console.error(error.message);
            return false;
        }
    }

    const toggleReadReport = async (projectId: number, reportId: number, userId:number)=> {
        const abortController = new AbortController();
        const signal = abortController.signal;

        try {
            let result = await ProjectServices.toggleReadReport(signal, projectId, reportId, userId);
            
            if (result === "ABORTED" || typeof result === "string") {
                return false;
            }

            if (!result) {
                toast.error("Something Went Wrong ...");
                return false;
            }
            let updatedReports = [...reports];
            const reportsData = updatedReports.filter(report => report.projectId === projectId)[0].reportsData;
            reportsData.map(report => {
                if (report.id === reportId) {
                    report.is_read = !report.is_read
                }
            });

            setReports([...updatedReports]);
            return true;
        } catch (error: any) {
            console.error(error.message);
            return false;
        }
    }

    return (
        <ReportContext.Provider value={{ reports, getMemberReports, getTmMemberReports, submitReport, toggleReadReport }}>
            {children}
        </ReportContext.Provider>
    )
}