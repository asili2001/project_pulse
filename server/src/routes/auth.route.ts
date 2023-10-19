import express, {Request, Response} from 'express';
import statusCodes from "../utils/HttpStatusCodes";
import AuthValidator from '../middlewares/auth.validator';
import AuthController from '../controllers/auth.controller';
import DbConnection from '../db/connections/db-connection';
import AuthMiddleware from '../middlewares/checkAuth';
import UserRepository from '../db/repositories/user.repository';
import returner from '../utils/returner';

if (!process.env.DB_NAME_MAIN) {
    throw new Error("Missing database name environment variable for database.");
}

const authRouter = express.Router();
const connection = new DbConnection(process.env.DB_NAME_MAIN);
const UserRepo = new UserRepository(connection);
const authValidator = new AuthValidator();
const authController = new AuthController(connection);
const AuthTeamMember = new AuthMiddleware(UserRepo, [0, 1]);
const AuthProjectManager = new AuthMiddleware(UserRepo, [1]);

authRouter.post('/checkauth', AuthTeamMember.checkUser, (req: Request, res: Response)=> {
    return returner(res, "success", statusCodes.OK, [res.locals.userData], "Authorithed");
});
authRouter.post('/register', authValidator.newUser, authController.newUser);
authRouter.post('/validatetoken', authValidator.validateToken, authController.validateToken);
authRouter.post('/activate', authValidator.activateAccount, authController.activateAccount);
authRouter.post('/login', authValidator.loginUser, authController.loginUser);

export default authRouter;
