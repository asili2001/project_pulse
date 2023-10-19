// Import necessary modules
import * as nodemailer from 'nodemailer';
import { readFile } from 'fs/promises';
import errorLogger from './errorLogger';

// Define an interface for email content
export interface IMailContent {
  subject: string;
  text: string;
  htmlContent?: string;
}

/**
 * EmailService class for sending emails using Nodemailer.
 */
export class EmailService {
  /**
   * Nodemailer transporter instance.
   * @private
   */
  private transporter: nodemailer.Transporter;

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
  async sendEmail(to: string, data: IMailContent): Promise<void> {
    await this.sendMail(this.transporter, to, data);
  }

  /**
   * Generates an account activation email with a link.
   * @param {string} activationLink - The activation link to include in the email.
   * @returns {Promise<string>} A Promise that resolves with the generated HTML email content.
   */
  async generateAccountActivationEmail(activationLink: string): Promise<string> {
    const filePath = 'mail_templates/account_activation.html';
    return this.generateEmailWithLink(filePath, activationLink);
  }

  /**
   * Generates an email indicating that an account has been activated.
   * @param {string} username - The username of the activated account.
   * @param {string} supportEmail - The support email address.
   * @returns {Promise<string>} A Promise that resolves with the generated HTML email content.
   */
  async generateAccountActivatedEmail(username: string, supportEmail: string): Promise<string> {
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
  private async sendMail(transporter: nodemailer.Transporter, to: string, data: IMailContent): Promise<void> {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: to,
      subject: data.subject,
      text: data.text,
      html: data.htmlContent,
    };

    try {
      // Attempt to send the email and log the result
      await transporter.sendMail(mailOptions);
    } catch (error) {
      // Handle errors and throw an exception
      errorLogger(JSON.stringify(error));
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
  private async generateEmailWithLink(filePath: string, link: string): Promise<string> {
    let html = await this.readFile(filePath);
    return html.replace("||ACTIVATION_LINK||", link);
  }

  /**
   * Reads a file asynchronously and returns its content as a string.
   * @private
   * @param {string} filePath - The path to the file to be read.
   * @returns {Promise<string>} A Promise that resolves with the file's content as a string.
   */
  private async readFile(filePath: string): Promise<string> {
    try {
      return await readFile(filePath, 'utf-8');
    } catch (error) {
      // Handle file read errors
      throw error;
    }
  }
}

// Export the EmailService class as the default export
export default EmailService;
