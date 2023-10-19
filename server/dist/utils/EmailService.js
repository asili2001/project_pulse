"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
// Import necessary modules
const nodemailer = __importStar(require("nodemailer"));
const promises_1 = require("fs/promises");
/**
 * EmailService class for sending emails using Nodemailer.
 */
class EmailService {
    /**
     * Nodemailer transporter instance.
     * @private
     */
    transporter;
    /**
     * Creates an instance of EmailService.
     * Initializes the Nodemailer transporter with email service and authentication.
     */
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }
    /**
     * Sends an email to the specified recipient with the given data.
     * @param {string} to - The email recipient.
     * @param {IMailContent} data - Email content including subject, text, and optional HTML content.
     * @returns {Promise<void>} A Promise that resolves when the email is sent.
     */
    async sendEmail(to, data) {
        await this.sendMail(this.transporter, to, data);
    }
    /**
     * Generates an account activation email with a link.
     * @param {string} activationLink - The activation link to include in the email.
     * @returns {Promise<string>} A Promise that resolves with the generated HTML email content.
     */
    async generateAccountActivationEmail(activationLink) {
        const filePath = 'mail_templates/account_activation.html';
        return this.generateEmailWithLink(filePath, activationLink);
    }
    /**
     * Generates an email indicating that an account has been activated.
     * @param {string} username - The username of the activated account.
     * @param {string} supportEmail - The support email address.
     * @returns {Promise<string>} A Promise that resolves with the generated HTML email content.
     */
    async generateAccountActivatedEmail(username, supportEmail) {
        const filePath = 'mail_templates/account_has_been_activated.html';
        // Read the email template file and replace placeholders
        let html = await this.readFile(filePath);
        html = html.replace("||USERNAME||", username);
        html = html.replace("||SUPPORT_EMAIL||", supportEmail);
        return html;
    }
    /**
     * Sends an email using the provided transporter.
     * @private
     * @param {nodemailer.Transporter} transporter - The Nodemailer transporter instance.
     * @param {string} to - The email recipient.
     * @param {IMailContent} data - Email content including subject, text, and optional HTML content.
     * @returns {Promise<void>} A Promise that resolves when the email is sent.
     */
    async sendMail(transporter, to, data) {
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: to,
            subject: data.subject,
            text: data.text,
            html: data.htmlContent,
        };
        try {
            // Attempt to send the email and log the result
            const info = await transporter.sendMail(mailOptions);
            console.log(info);
        }
        catch (error) {
            // Handle errors and throw an exception
            console.error(error);
            throw new Error("Error sending email");
        }
    }
    /**
     * Generates an email with a link by reading a file.
     * @private
     * @param {string} filePath - The path to the email template file.
     * @param {string} link - The link to include in the email.
     * @returns {Promise<string>} A Promise that resolves with the generated email content.
     */
    async generateEmailWithLink(filePath, link) {
        let html = await this.readFile(filePath);
        return html.replace("||ACTIVATION_LINK||", link);
    }
    /**
     * Reads a file asynchronously and returns its content as a string.
     * @private
     * @param {string} filePath - The path to the file to be read.
     * @returns {Promise<string>} A Promise that resolves with the file's content as a string.
     */
    async readFile(filePath) {
        try {
            return await (0, promises_1.readFile)(filePath, 'utf-8');
        }
        catch (error) {
            // Handle file read errors
            throw error;
        }
    }
}
exports.EmailService = EmailService;
// Export the EmailService class as the default export
exports.default = EmailService;
