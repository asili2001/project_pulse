import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import returner from "../utils/returner";
import statusCodes from "../utils/HttpStatusCodes";

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
class AuthValidator {
    newUser = async (req: Request, res: Response, next:NextFunction) => {
        const body: INewUser = req.body;

          // Make sure req.body is an array
        if (!Array.isArray(body)) {
            return returner(res, "error", statusCodes.BAD_REQUEST, [], "Request body should be an array of users.");
        }

        const schema = Joi.object({
            name: Joi.string().required(),
            personal_number: Joi.string().min(10).max(12).regex(/^(?:\d{10}|\d{12})$/).required(),
            phone_number: Joi.string().max(20).regex(/^\d{10,15}$/).required(),
            email: Joi.string().email().required()
        });

        const errors: any[] = [];

        for (const UserData of body) {
          const { error } = schema.validate({
            name: UserData.name,
            personal_number: UserData.personal_number.toString(),
            phone_number: UserData.phone_number.toString(),
            email: UserData.email
          });
      
          if (error) {
            errors.push({email: UserData.email, msg: [...error.details][0].message});
          }
        }
      
        if (errors.length > 0) {
          return returner(res, "error", statusCodes.BAD_REQUEST, [errors], errors.join(", "));
        }

        next();
    }

    loginUser = async (req: Request, res: Response, next: NextFunction) => {
        const body: ILogin = req.body;

        const schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        });

        const { error } = schema.validate(body);

        if (error) return returner(res, "error", statusCodes.BAD_REQUEST, [], [...error.details][0].message);

        next();
    }

    validateToken = async (req: Request, res: Response, next:NextFunction) => {
        const body: any = req.body;

        const schema = Joi.object({
            token: Joi.string().required(),
        });

        const { error } = schema.validate(body);

        if (error) return returner(res, "error", statusCodes.BAD_REQUEST, [], [...error.details][0].message);

        next();
    }

    activateAccount = async (req: Request, res: Response, next:NextFunction) => {
        const body: any = req.body;

        const schema = Joi.object({
            token: Joi.string().required(),
            password: Joi.string().min(8).required()
        });

        const { error } = schema.validate(body);

        if (error) return returner(res, "error", statusCodes.BAD_REQUEST, [], [...error.details][0].message);

        next();
    }
}

export default AuthValidator;
