import dotenv from 'dotenv';
dotenv.config({ path: './.env.dev' });
import EmailService, { IMailContent } from '../src/utils/EmailService'; // Import your EmailService class

test("Send Successfull email", async ()=> {
    const service = new EmailService();

    await service.sendEmail("ahmadasili1928@gmail.com", {
        subject: "Testing Email Service",
        text: "Test",
        htmlContent: "Test"
    });
});