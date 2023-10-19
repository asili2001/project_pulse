import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import returner from "../utils/returner";
import statusCodes from "../utils/HttpStatusCodes";
import { join } from "path";
import { INewProject } from "../controllers/project.controller";

export interface INewUser {
    name: string;
    personal_number: string;
    phone_number?: string;
    email: string;
}

export interface ILogin {
    email: string;
    password: string;
}

/**
 * A validator class for the auth controller
 */
class ProjectValidator {
    newProject = async (req: Request, res: Response, next: NextFunction) => {
        const body: INewProject = req.body;

        const schema = Joi.object({
            name: Joi.string().required(),
            report_frequency_type: Joi.string().valid("daily", "weekly", "fortnightly", "monthly", "custom").required(),
            reports: Joi.array().items(
                Joi.object({
                    name: Joi.string().required(),
                    submission_start: Joi.number().required(),
                    submission_end: Joi.number().required()
                })
            )
        });
        const { error } = schema.validate(body);

        if (error) {
            return returner(res, "error", statusCodes.BAD_REQUEST, [], error.details[0].message);
        }

        next();
    }

    projectMembers = async (req: Request, res: Response, next: NextFunction) => {
        const type = req.params.type;
        const id = req.params.id;
        const schema = Joi.object({
            id: Joi.number().required(),
            type: Joi.string().valid("ASSIGNED", "UNASSIGNED").required(),
        });
        const { error } = schema.validate({type, id});

        if (error) {
            return returner(res, "error", statusCodes.BAD_REQUEST, [], error.details[0].message);
        }

        next();
    }
    assignMembers = async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;
        const schema = Joi.object({
            members: Joi.array().items(Joi.number())
        });
        const { error } = schema.validate(body);

        if (error) {
            return returner(res, "error", statusCodes.BAD_REQUEST, [], error.details[0].message);
        }

        next();
    }

    memberReports = async (req: Request, res: Response, next: NextFunction) => {
        const { id, memberId } = req.params;

        const schema = Joi.object({
            projectId: Joi.number().required(),
            memberId: Joi.number().required()
        });

        const { error } = schema.validate({projectId: id, memberId});

        if (error) {
            return returner(res, "error", statusCodes.BAD_REQUEST, [], error.details[0].message);
        }

        next();
    }
    teamMemberReports = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const schema = Joi.object({
            projectId: Joi.number().required()
        });

        const { error } = schema.validate({projectId: id});

        if (error) {
            return returner(res, "error", statusCodes.BAD_REQUEST, [], error.details[0].message);
        }

        next();
    }
    teamMemberReportSubmit = async (req: Request, res: Response, next: NextFunction) => {
        const projectId = req.params.id;
        const {reportId, userId, content} = req.body;

        const schema = Joi.object({
            projectId: Joi.number().required(),
            reportId: Joi.number().required(),
            content: Joi.string().required()
        });

        const { error } = schema.validate({projectId, reportId, content});

        if (error) {
            return returner(res, "error", statusCodes.BAD_REQUEST, [], error.details[0].message);
        }

        next();
    }
    toggleReadReport = async (req: Request, res: Response, next: NextFunction) => {
        const projectId = req.params.id;
        const reportId = req.params.reportId;
        const userId = req.body.userId;

        const schema = Joi.object({
            projectId: Joi.number().required(),
            reportId: Joi.number().required(),
            userId: Joi.number().required()
        });

        const { error } = schema.validate({projectId, reportId, userId});

        if (error) {
            return returner(res, "error", statusCodes.BAD_REQUEST, [], error.details[0].message);
        }

        next();
    }
}

export default ProjectValidator;
