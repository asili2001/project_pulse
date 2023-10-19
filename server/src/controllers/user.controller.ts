import { Request, Response } from "express";
import DbConnection from "../db/connections/db-connection";
import returner from "../utils/returner";
import HttpStatusCodes from "../utils/HttpStatusCodes";


class UserContoller {
    private dbConnection: DbConnection;

    constructor(DbConnection: DbConnection) {
        this.dbConnection = DbConnection;
    }

    getAll = async (req: Request, res: Response)=> {
        const data: any = await this.dbConnection.query("SELECT * FROM v_users");

        return returner(res, "success", HttpStatusCodes.OK, [...data], "");
    }
}

export default UserContoller;