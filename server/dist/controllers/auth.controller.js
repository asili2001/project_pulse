"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const returner_1 = __importDefault(require("../utils/returner"));
require("dotenv/config");
const CryptoHelper_1 = __importDefault(require("../utils/CryptoHelper"));
const EmailService_1 = __importDefault(require("../utils/EmailService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const HttpStatusCodes_1 = __importDefault(require("../utils/HttpStatusCodes"));
class AuthController {
    dbConnection;
    emailService = new EmailService_1.default();
    constructor(DbConnection) {
        this.dbConnection = DbConnection;
    }
    createToken = (userId) => {
        if (!process.env.JWT_SECRET || !process.env.JWT_MAX_AGE) {
            throw new Error("Missing required environment variables for JWT.");
        }
        return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: parseInt(process.env.JWT_MAX_AGE)
        });
    };
    newUser = async (req, res) => {
        const body = req.body;
        const performTransaction = async (connection) => {
            try {
                await connection.query("CALL NewUser(?, ?, ?, ?)", [body.name, body.personal_number, body.phone_number, body.email]);
                // email activation link
                let [[[tokenObject]]] = (await connection.query("CALL GetUserToken(?)", [body.email]));
                const { token } = tokenObject;
                const encryptedToken = CryptoHelper_1.default.encrypt(JSON.stringify({ email: body.email, token: token }));
                const activationLink = `${process.env.FRONTEND_DOMAIN}/activate?t=${encryptedToken}`;
                const emailData = {
                    subject: "Project Pulse | Account Activation",
                    text: `Please go to ${activationLink} to activate your account`,
                    htmlContent: await this.emailService.generateAccountActivationEmail(activationLink),
                };
                await this.emailService.sendEmail(body.email, emailData);
            }
            catch (error) {
                throw error;
            }
        };
        (async () => {
            try {
                await this.dbConnection.transaction(performTransaction);
                return (0, returner_1.default)(res, "success", HttpStatusCodes_1.default.OK, [], "Success");
            }
            catch (error) {
                console.error(error);
                switch (error?.code) {
                    case "ER_DUP_ENTRY":
                        return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.BAD_REQUEST, [], "User Already Exists");
                    case "ER_SIGNAL_EXCEPTION":
                        switch (error.message) {
                            case "INVALID_PHONE_NUMBER":
                                return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.BAD_REQUEST, [], "Invalid phone number");
                                break;
                            default:
                                return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR, [], "Internal Server Error");
                                break;
                        }
                    default:
                        console.error("Error in authController/newUser: ", error);
                        return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR, [], "Internal Server Error");
                }
            }
        })();
    };
    loginUser = async (req, res) => {
        const body = req.body;
        if (!process.env.JWT_MAX_AGE) {
            throw new Error("Missing required environment variables for JWT.");
        }
        try {
            const [exists] = await this.dbConnection.query("SELECT COUNT(email) as total FROM users WHERE email = ?", [body.email]);
            if (exists.total < 1)
                return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.BAD_REQUEST, [], "No User Found");
            // user exists
            const [userData] = await this.dbConnection.query("SELECT password, id FROM users WHERE email = ?", [body.email]);
            const auth = await bcrypt_1.default.compare(body.password, userData.password);
            if (!auth)
                return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.BAD_REQUEST, [], "Incorrect Password");
            const token = this.createToken(userData.id);
            res.cookie("key", token, {
                sameSite: 'strict',
                secure: true,
                path: '/',
                maxAge: parseInt(process.env.JWT_MAX_AGE) * 1000,
                httpOnly: true, // Cookie is accessible only on the server-side
            });
            return (0, returner_1.default)(res, "success", HttpStatusCodes_1.default.OK, [], "User LoggedIn Successfully");
        }
        catch (error) {
            console.error("Error in authController/loginUser", error);
            return (0, returner_1.default)(res, "INTERNAL_ERROR", 403, error, "");
        }
    };
    validateToken = async (req, res) => {
        const { token } = req.body;
        try {
            const decryptedTokenObj = JSON.parse(CryptoHelper_1.default.decrypt(token));
            if (!("email" in decryptedTokenObj) || !("token" in decryptedTokenObj))
                return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.BAD_REQUEST, [], "Invalid Token");
            const [exists] = await this.dbConnection.query("SELECT COUNT(id) as total FROM users WHERE email = ? AND token = ?", [decryptedTokenObj.email, decryptedTokenObj.token]);
            if (exists.total < 1)
                return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.BAD_REQUEST, [], "Invalid Token");
        }
        catch (error) {
            return (0, returner_1.default)(res, "INVALID_TOKEN", HttpStatusCodes_1.default.BAD_REQUEST, [], "Invalid Token");
        }
        return (0, returner_1.default)(res, "VALID_TOKEN", HttpStatusCodes_1.default.OK, [], "Token is valid");
    };
    activateAccount = async (req, res) => {
        const { token: encryptedToken, password: newPassword } = req.body;
        const decryptedToken = CryptoHelper_1.default.decrypt(encryptedToken);
        const { email, token } = JSON.parse(decryptedToken);
        const performTransaction = async (connection) => {
            try {
                const encryptedPass = await bcrypt_1.default.hash(newPassword, 10);
                await connection.query("CALL ChangePass(?, ?, ?, ?)", [token, email, encryptedPass, true]);
                const [{ username }] = await this.dbConnection.query("SELECT name as username FROM users WHERE email = ?", [email]);
                const mailContent = {
                    subject: "Project Pulse | Your account has been activated!",
                    text: `Dear ${username} \n
                    Great news! Your account on our reporting system has been activated and is ready for use. \n
                    If you have any questions or need assistance, feel free to reach out to our support team at
                     ${process.env.MAIl_SUPPORT_EMAIL}. We're here to help.
                    `,
                    htmlContent: await this.emailService.generateAccountActivatedEmail(username, process.env.MAIl_SUPPORT_EMAIL ?? "")
                };
                await this.emailService.sendEmail(email, mailContent);
            }
            catch (error) {
                throw error;
            }
        };
        (async () => {
            try {
                await this.dbConnection.transaction(performTransaction);
                return (0, returner_1.default)(res, "success", HttpStatusCodes_1.default.OK, [], "Success");
            }
            catch (error) {
                console.error(error);
                switch (error?.sqlMessage) {
                    case "USER_NOT_FOUND":
                        return (0, returner_1.default)(res, "INVALID_TOKEN", HttpStatusCodes_1.default.BAD_REQUEST, [], "Invalid Token");
                    case "EMPTY_PASSWORD":
                        return (0, returner_1.default)(res, "EMPTY_PASSWORD", HttpStatusCodes_1.default.BAD_REQUEST, [], "Password cannot be empty");
                    default:
                        console.error("Error in authController/activateAccount: ", error);
                        return (0, returner_1.default)(res, "error", HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR, [], "Internal Server Error");
                }
            }
        })();
    };
}
exports.default = AuthController;
