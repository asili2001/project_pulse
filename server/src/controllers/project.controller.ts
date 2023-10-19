import { Request, Response } from "express";
import DbConnection from "../db/connections/db-connection";
import mysql from 'mysql2/promise';
import returner from "../utils/returner";
import HttpStatusCodes from "../utils/HttpStatusCodes";

export interface INewReport {
    name: string;
    submission_start: number;
    submission_end: number;
}

export interface INewProject {
    name: string;
    report_frequency_type: "daily" | "weekly" | "fortnightly" | "monthly" | "custom";
    reports: INewReport[];

}


class ProjectContoller {
    private dbConnection: DbConnection;
    constructor(DbConnection: DbConnection) {
        this.dbConnection = DbConnection;
        
    }

    newProject = async (req: Request, res: Response) => {
        const body: INewProject = req.body;

        /**
         * Creates a new project in the database and creates all its reports in database.
         * This function is called in a transaction for security purposes.
         * @param connection The MySQL pool connection
         * @param data The user data to invite
         */
        const performTransaction = async (connection: mysql.PoolConnection, data: INewProject): Promise<any> => {
            // if (![""].includes(data.report_frequency_type))
            try {
                const [[[projectIdObject]]]: any = await connection.query("CALL newProject(?, ?)", [data.name, data.report_frequency_type]);
                const { project_id } = projectIdObject;

                // store the project reports
                data.reports.forEach(async report => {
                    await connection.query("CALL newReport(?, ?, ?, ?)", [report.name, project_id, report.submission_start, report.submission_end]);
                });

            } catch (error: any) {
                throw error
            }
        }

        (async ()=> {
            try {
                await this.dbConnection.transaction<INewProject>(performTransaction, body);
            }
            catch (error) {
                console.error(error);
                
                return returner(res, "error", HttpStatusCodes.BAD_REQUEST, [], "");
            }
            return returner(res, "success", HttpStatusCodes.OK, [], "");
        })();
    }

    getAll = async (req: Request, res: Response)=> {
        let data: any;
        
        if (res.locals.userData.role === 0) {
            data = await this.dbConnection.query("SELECT * FROM v_tm_projects WHERE user_id = ?", [res.locals.userData.id]);
        }
        if (res.locals.userData.role === 1) {
            data = await this.dbConnection.query("SELECT * FROM v_projects");
        }

        return returner(res, "success", HttpStatusCodes.OK, [...data], "");
    }

    getOne = async (req: Request, res: Response)=> {
        const projectId = req.params.id;
        
        if (Number.isNaN(parseInt(projectId))) return returner(res, "error", HttpStatusCodes.NOT_FOUND, [], "");
        const project: any = await this.dbConnection.query("SELECT * FROM v_projects WHERE id = ?", [projectId]);
        const projectReports: any = await this.dbConnection.query("SELECT * FROM v_reports WHERE project_id = ?", [projectId]);
        const projectMembers: any = await this.dbConnection.query("SELECT * FROM v_project_members WHERE project_id = ?", [projectId]);
        const [unassignedMembers]: any = await this.dbConnection.query(`CALL getUnassignedMembers(?)`, [projectId]);

        if (project.length < 1) return returner(res, "error", HttpStatusCodes.NOT_FOUND, [], "No Project Found");

        const result = {
            ...project[0],
            reports: projectReports,
            members: projectMembers,
            unassignedMembers: unassignedMembers
        }

        return returner(res, "success", HttpStatusCodes.OK, [result], "");
    }

    projectMembers = async (req: Request, res: Response)=> {
        const projectId = req.params.id;
        if (Number.isNaN(parseInt(projectId))) return returner(res, "error", HttpStatusCodes.NOT_FOUND, [], "No Project Found");
        const [members]: any = await this.dbConnection.query(`CALL getUnassignedMembers(?)`, [projectId]);

        if (members.length < 1) return returner(res, "error", HttpStatusCodes.NOT_FOUND, [], "No Members Found");
        
        return returner(res, "success", HttpStatusCodes.OK, members, "");
    }

    memberReports = async (req: Request, res: Response)=> {
        const {id, memberId} = req.params;
        if (Number.isNaN(parseInt(id))) return returner(res, "error", HttpStatusCodes.NOT_FOUND, [], "No Project Found");
        if (Number.isNaN(parseInt(memberId))) return returner(res, "error", HttpStatusCodes.NOT_FOUND, [], "Invalid Member");
        const [reports]: any = await this.dbConnection.query(`CALL getMemberReports(?, ?)`, [id, memberId]);
        
        return returner(res, "success", HttpStatusCodes.OK, reports, "");
    }
    teamMemberReports = async (req: Request, res: Response)=> {
        const {id} = req.params;
        const memberId = res.locals.userData.id;
        if (Number.isNaN(parseInt(id))) return returner(res, "error", HttpStatusCodes.NOT_FOUND, [], "No Project Found");
        const [reports]: any = await this.dbConnection.query(`CALL getMemberReports(?, ?)`, [id, memberId]);
        
        return returner(res, "success", HttpStatusCodes.OK, reports, ``);
    }

    assignMembers = async (req: Request, res: Response) => {
        const body = req.body;
        const projectId = req.params.id;
        const members: number[] = body.members;

        if (Number.isNaN(parseInt(projectId))) return returner(res, "error", HttpStatusCodes.NOT_FOUND, [], "No Project Found");


        /**
         * Assign members to a project
         * This function is called in a transaction for security purposes.
         * @param connection The MySQL pool connection
         * @param data The user data to invite
         */
        const performTransaction = async (connection: mysql.PoolConnection, memberId: number): Promise<any> => {
            try {
                await connection.query("CALL assignMember(?, ?)", [memberId, projectId]);
            } catch (error: any) {
                throw error
            }
        }

        (async ()=> {
            try {
                members.forEach(async member => {
                    await this.dbConnection.transaction<number>(performTransaction, member);
                })
            }
            catch (error) {
                console.error(error);
                
                return returner(res, "error", HttpStatusCodes.BAD_REQUEST, [], "");
            }
            return returner(res, "success", HttpStatusCodes.OK, [], "");
        })();
    }
    teamMemberReportSubmit = async (req: Request, res: Response) => {
        const reportId: number = req.body.reportId;
        const memberId: number = res.locals.userData.id;
        const content: string = req.body.content;
        const projectId = parseInt(req.params.id);

        if (Number.isNaN(projectId)) return returner(res, "error", HttpStatusCodes.NOT_FOUND, [], "No Project Found");


        /**
         * 
         * This function is called in a transaction for security purposes.
         * @param connection The MySQL pool connection
         * @param data The user data to invite
         */
        const performTransaction = async (connection: mysql.PoolConnection, data: {memberId: number, reportId: number, projectId: number, content: string}): Promise<any> => {
            try {
                const [[reportData]]: any = await connection.query("SELECT * FROM v_reports WHERE id = ?", [data.reportId]);
                
                if (reportData.submission_start > Math.floor(Date.now() / 1000) || reportData.submission_end < Math.floor(Date.now() / 1000)) {
                    throw new Error("Report is locked");
                }
                
                await connection.query("CALL SubmitReport(?, ?, ?, ?)", [data.memberId, data.reportId, data.projectId, data.content]);
            } catch (error: any) {
                throw error
            }
        }

        (async ()=> {
            try {
                await this.dbConnection.transaction<{memberId: number, reportId: number, projectId: number, content: string}>(performTransaction, {memberId, reportId, projectId, content});
            }
            catch (error:any) {
                console.error(error);
                
                return returner(res, "error", HttpStatusCodes.BAD_REQUEST, [], error.message);
            }
            return returner(res, "success", HttpStatusCodes.OK, [], "");
        })();
    }

    toggleReadReport = async (req: Request, res: Response)=> {
        const projectId = req.params.id;
        const reportId = req.params.reportId;
        const userId = req.body.userId;
        if (Number.isNaN(parseInt(projectId))) return returner(res, "error", HttpStatusCodes.NOT_FOUND, [], "No Project Found");
        await this.dbConnection.query(`CALL ToggleReadReport(?, ?)`, [reportId, userId]);

        return returner(res, "success", HttpStatusCodes.OK, [], ``);
    }
}

export default ProjectContoller;