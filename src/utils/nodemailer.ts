import nodemailer from 'nodemailer';

export const EMAIL = {
    FROM: process.env.BE_EMAIL_FROM,
    USER: process.env.BE_SMTP_USER_NAME,
    PASS: process.env.BE_SMTP_PASSWORD,
    HOST: process.env.BE_SMTP_HOST,
    PORT: 587
};

export const transporter = nodemailer.createTransport({
    host: EMAIL.HOST,
    port: EMAIL.PORT,
    auth: {
        user: EMAIL.USER,
        pass: EMAIL.PASS
    }
});
