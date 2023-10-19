import express, {Request, Response} from 'express';
import statusCodes from "../utils/HttpStatusCodes";
import AuthValidator from '../middlewares/auth.validator';
import AuthController from '../controllers/auth.controller';
import DbConnection from '../db/connections/db-connection';
import AuthMiddleware from '../middlewares/checkAuth';
import UserRepository from '../db/repositories/user.repository';
import returner from '../utils/returner';
import UserContoller from '../controllers/user.controller';

if (!process.env.DB_NAME_MAIN) {
    throw new Error("Missing database name environment variable for database.");
}

const userRouter = express.Router();
const connection = new DbConnection(process.env.DB_NAME_MAIN);
const UserRepo = new UserRepository(connection);
const authValidator = new AuthValidator();
const userContoller = new UserContoller(connection);
const AuthTeamMember = new AuthMiddleware(UserRepo, [0, 1]);
const AuthProjectManager = new AuthMiddleware(UserRepo, [1]);

userRouter.get('/', AuthProjectManager.checkUser, userContoller.getAll);

export default userRouter;
