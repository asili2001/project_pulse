"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HttpStatusCodes_1 = __importDefault(require("../utils/HttpStatusCodes"));
const auth_validator_1 = __importDefault(require("../middlewares/auth.validator"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const db_connection_1 = __importDefault(require("../db/connections/db-connection"));
const checkAuth_1 = __importDefault(require("../middlewares/checkAuth"));
const user_repository_1 = __importDefault(require("../db/repositories/user.repository"));
const returner_1 = __importDefault(require("../utils/returner"));
const authRouter = express_1.default.Router();
const connection = new db_connection_1.default('project_pulse');
const UserRepo = new user_repository_1.default(connection);
const authValidator = new auth_validator_1.default();
const authController = new auth_controller_1.default(connection);
const AuthTeamMember = new checkAuth_1.default(UserRepo, [0, 1]);
const AuthProjectManager = new checkAuth_1.default(UserRepo, [1]);
authRouter.post('/checkauth', AuthTeamMember.checkUser, (req, res) => {
    return (0, returner_1.default)(res, "success", HttpStatusCodes_1.default.OK, [], "Authorithed");
});
authRouter.post('/register', AuthTeamMember.checkUser, authValidator.newUser, authController.newUser);
authRouter.post('/validatetoken', authValidator.validateToken, authController.validateToken);
authRouter.post('/activate', authValidator.activateAccount, authController.activateAccount);
authRouter.post('/login', authValidator.loginUser, authController.loginUser);
exports.default = authRouter;
