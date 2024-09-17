import { config } from '@/config';
import nodemailer, { Transporter } from 'nodemailer';

export class MailerService {
    private static transporter: Transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.mailUser,
            pass: config.mailPassword,
        },
    });

    static async sendEmail(to: string, subject: string, text: string) {
        try {
            await this.transporter.sendMail({
                from: config.mailFrom,
                to,
                subject,
                text,
            });
            console.info(`Email sent successfully to ${to}`);
        } catch (error) {
            console.error(`Failed to send email to ${to}`, error);
        }
    }
}
