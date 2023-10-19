import { Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import returner from "../utils/returner";
import 'dotenv/config';
import DbConnection from "../db/connections/db-connection";
import mysql from 'mysql2/promise';
import { ILogin, INewUser } from '../middlewares/auth.validator';
import CryptoHelper from "../utils/CryptoHelper";
import EmailService, { IMailContent } from "../utils/EmailService";
import bcrypt from 'bcrypt';
import statusCodes from "../utils/HttpStatusCodes";
import errorLogger from "../utils/errorLogger";

/**
 * Controller for users and authentication
 */
class AuthController {
    private dbConnection: DbConnection;
    private emailService = new EmailService();

    constructor(DbConnection: DbConnection) {
        this.dbConnection = DbConnection;
    }

    /**
     * Creates a JWT token with the provided data.
     * @param data Data to be included in the token
     * @returns JWT token
     */
    createToken = (data: { [key: string]: any }) => {
        if (!process.env.JWT_SECRET || !process.env.JWT_MAX_AGE) {
            throw new Error("Missing required environment variables for JWT.");
        }
        return jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: parseInt(process.env.JWT_MAX_AGE)
        });
    }

    /**
     * Handles the creation of new users and sends an activation email.
     * @param req Request
     * @param res Response
     */
    newUser = async (req: Request, res: Response) => {
        const body: INewUser[] = req.body;

        /**
         * Sends an activation email with a token to the user.
         * @param email The receiver's email
         * @param token Optional token from the database
         */
        const sendActivationMail = async (email: string, token?: string | undefined) => {
            // Send email activation link
            if (!token) {
                let [[tokenObject]]: any = await this.dbConnection.query("CALL GetUserToken(?)", [email]);
                token = tokenObject.token;
            }

            if (!token) throw new Error("token is undefined")
            const encryptedToken = CryptoHelper.encrypt(JSON.stringify({ email: email, token: token }));
            const activationLink = `${process.env.FRONTEND_DOMAIN}/activate?t=${encryptedToken}`;

            const emailData: IMailContent = {
                subject: "Project Pulse | Account Activation",
                text: `Please go to ${activationLink} to activate your account`,
                htmlContent: await this.emailService.generateAccountActivationEmail(activationLink),
            }

            await this.emailService.sendEmail(email, emailData);
        }

        /**
         * Creates a new user in the database and sends an activation email.
         * This function is called in a transaction for security purposes.
         * @param connection The MySQL pool connection
         * @param data The user data to invite
         */
        const performTransaction = async (connection: mysql.PoolConnection, data: INewUser): Promise<any> => {
            try {
                const [[[tokenObject]]]: any = await connection.query("CALL NewUser(?, ?, ?, ?)", [data.name, data.personal_number, data.phone_number, data.email]);
                const { token } = tokenObject;

                // Send email activation link
                await sendActivationMail(data.email, token);
            } catch (error: any) {
                throw error
            }
        }

        (async () => {
            const results: any[] = [];
            // Loop through the requested users and try to call the function to invite them in the transaction function
            for (let i = 0; i < body.length; i++) {
                const data = body[i];

                try {
                    await this.dbConnection.transaction<INewUser>(performTransaction, data);

                    results.push({
                        email: data.email,
                        message: "success"
                    });
                } catch (error: any) {
                    switch (error?.code) {
                        case "ER_DUP_ENTRY":
                            // The user is already in the system; no need to do anything
                            await sendActivationMail(data.email);
                            results.push({
                                email: data.email,
                                message: "success"
                            });
                            break;
                        case "ER_SIGNAL_EXCEPTION":
                            switch (error.message) {
                                case "INVALID_PHONE_NUMBER":
                                    results.push({
                                        email: data.email,
                                        message: "Invalid phone number"
                                    });
                                    break;
                                default:
                                    console.error("Error inviting user: ", error, data);
                                    errorLogger(JSON.stringify(error));
                                    results.push({
                                        email: data.email,
                                        message: "Internal Server Error"
                                    });
                                    break;
                            }
                        default:
                            errorLogger(JSON.stringify(error));
                            console.error("Error in authController/newUser: ", error);
                            return returner(res, "error", statusCodes.INTERNAL_SERVER_ERROR, [], "Internal Server Error");
                    }
                }
            };
            return returner(res, "success", statusCodes.OK, results, "");
        })();
    }

    /**
     * Handles user login.
     * @param req Request
     * @param res Response
     * @returns The login results
     */
    loginUser = async (req: Request, res: Response) => {
        const body: ILogin = req.body;

        if (!process.env.JWT_MAX_AGE) {
            throw new Error("Missing required environment variables for JWT.");
        }

        try {
            const [exists]: any = await this.dbConnection.query("SELECT COUNT(email) as total FROM users WHERE email = ?", [body.email]);

            if (exists.total < 1) return returner(res, "error", statusCodes.BAD_REQUEST, [], "Incorrect Email or Password"); // No User Found

            // User exists
            const [userData]: any = await this.dbConnection.query("SELECT password, id, activated FROM users WHERE email = ?", [body.email]);

            // Check if user is activated
            if (userData.activated !== 1) return returner(res, "error", statusCodes.FORBIDDEN, [], "Incorrect Email or Password" ); // Account Activation Required

            const auth = await bcrypt.compare(body.password, userData.password);

            if (!auth) return returner(res, "error", statusCodes.BAD_REQUEST, [], "Incorrect Email or Password"); // Incorrect Password

            const token = this.createToken({ userId: userData.id });

            res.cookie("key", token, {
                sameSite: 'strict',
                secure: true,
                path: '/',
                maxAge: parseInt(process.env.JWT_MAX_AGE) * 1000,
                httpOnly: true, // Cookie is accessible only on the server-side
            });
            
            return returner(res, "success", statusCodes.OK, [], "User LoggedIn Successfully");
        } catch (error: any) {
            errorLogger(JSON.stringify(error));
            console.error("Error in authController/loginUser", error);
            return returner(res, "INTERNAL_SERVER_ERROR", statusCodes.INTERNAL_SERVER_ERROR, [], "");
        }
    }

    /**
     * Checks if a requested token is valid or not.
     * @param req Request
     * @param res Response
     * @returns If the token is valid or not
     */
    validateToken = async (req: Request, res: Response) => {
        const { token } = req.body;

        try {
            const decryptedTokenObj = JSON.parse(CryptoHelper.decrypt(token));
            if (!("email" in decryptedTokenObj) || !("token" in decryptedTokenObj)) return returner(res, "error", statusCodes.BAD_REQUEST, [], "Invalid Token");

            const [exists] = await this.dbConnection.query("SELECT COUNT(id) as total FROM users WHERE email = ? AND token = ?", [decryptedTokenObj.email, decryptedTokenObj.token]);

            if (exists.total < 1) return returner(res, "error", statusCodes.BAD_REQUEST, [], "Invalid Token");
        } catch (error: any) {
            return returner(res, "INVALID_TOKEN", statusCodes.BAD_REQUEST, [], "Invalid Token");
        }

        return returner(res, "VALID_TOKEN", statusCodes.OK, [], "Token is valid");
    }

    /**
     * Handles user account activation.
     * @param req Request
     * @param res Response
     */
    activateAccount = async (req: Request, res: Response) => {
        const { token: encryptedToken, password: newPassword } = req.body;
        const decryptedToken = CryptoHelper.decrypt(encryptedToken);
        const { email, token } = JSON.parse(decryptedToken);

        const performTransaction = async (connection: mysql.PoolConnection): Promise<any> => {
            try {
                const encryptedPass = await bcrypt.hash(newPassword, 10);
                await connection.query("CALL ChangePass(?, ?, ?, ?)", [token, email, encryptedPass, true]);
                const [{ username }] = await this.dbConnection.query("SELECT name as username FROM users WHERE email = ?", [email]);

                const mailContent: IMailContent = {
                    subject: "Project Pulse | Your account has been activated!",
                    text: `Dear ${username} \n
                    Great news! Your account on our reporting system has been activated and is ready for use. \n
                    If you have any questions or need assistance, feel free to reach out to our support team at
                     ${process.env.MAIl_SUPPORT_EMAIL}. We're here to help.
                    `,
                    htmlContent: await this.emailService.generateAccountActivatedEmail(username, process.env.MAIl_SUPPORT_EMAIL ?? "")
                }

                await this.emailService.sendEmail(email, mailContent);
            } catch (error: any) {
                throw error
            }
        }

        (async () => {
            try {
                await this.dbConnection.transaction(performTransaction, []);
                return returner(res, "success", statusCodes.OK, [], "Success");
            } catch (error: any) {
                console.error(error);

                switch (error?.sqlMessage) {
                    case "USER_NOT_FOUND":
                        return returner(res, "INVALID_TOKEN", statusCodes.BAD_REQUEST, [], "Invalid Token")

                    case "EMPTY_PASSWORD":
                        return returner(res, "EMPTY_PASSWORD", statusCodes.BAD_REQUEST, [], "Password cannot be empty")
                    default:
                        errorLogger(JSON.stringify(error));
                        console.error("Error in authController/activateAccount: ", error);
                        return returner(res, "error", statusCodes.INTERNAL_SERVER_ERROR, [], "Internal Server Error");
                }
            }
        })();
    }
}

export default AuthController;
