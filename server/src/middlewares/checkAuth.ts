import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import returner from "../utils/returner";
import UserRepository from "../db/repositories/user.repository";
import statusCodes from "../utils/HttpStatusCodes";

class AuthMiddleware {
    private userRepo: UserRepository;
    private readonly roleId: number[];
    private readonly jwtSecret: string;

    constructor(userRepo: UserRepository, roleId: number[]) {
        if (!process.env.JWT_SECRET) {
            throw new Error("Missing required environment variables for JWT.");
        }
        this.userRepo = userRepo;
        this.roleId = roleId;
        this.jwtSecret = process.env.JWT_SECRET;
    }

    checkUser = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.key;

        if (!token) return returner(res, "error", statusCodes.UNAUTHORIZED, [], "Unauthorized");

        try {
            const decoded: any = jwt.verify(token, this.jwtSecret);

            res.locals.loggedInUser = decoded.userId;

            const user = await this.userRepo.getOne("users", ["id"], [decoded.userId]);

            res.locals.userData = user;

            if (!user || !this.roleId.includes(user.role)) {
                return returner(res, "error", statusCodes.UNAUTHORIZED, [], "Unauthorized");
            }

            res.locals.userData = user;

            next();
        } catch (err) {
            console.error("Error in middlewares/checkAuth/checkUser: ", err);
            return returner(res, "error", statusCodes.UNAUTHORIZED, [], "Unauthorized");
        }
    };
}

export default AuthMiddleware;
