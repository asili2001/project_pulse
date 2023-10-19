"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const returner_1 = __importDefault(require("../utils/returner"));
const HttpStatusCodes_1 = __importDefault(require("../utils/HttpStatusCodes"));
class AuthMiddleware {
    userRepo;
    roleId;
    jwtSecret;
    constructor(userRepo, roleId) {
        if (!process.env.JWT_SECRET) {
            throw new Error("Missing required environment variables for JWT.");
        }
        this.userRepo = userRepo;
        this.roleId = roleId;
        this.jwtSecret = process.env.JWT_SECRET;
    }
    checkUser = async (req, res, next) => {
        const token = req.cookies.key;
        if (!token)
            return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.UNAUTHORIZED, [], "Unauthorized");
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.jwtSecret);
            res.locals.loggedInUser = decoded.userId;
            const user = await this.userRepo.getOne("users", ["id"], [decoded.userId]);
            if (!user || !this.roleId.includes(user.role)) {
                return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.UNAUTHORIZED, [], "Unauthorized");
            }
            next();
        }
        catch (err) {
            console.error("Error in middlewares/checkAuth/checkUser: ", err);
            return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.UNAUTHORIZED, [], "Unauthorized");
        }
    };
}
exports.default = AuthMiddleware;
