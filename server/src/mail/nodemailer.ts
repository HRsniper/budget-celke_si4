import nodemailer from "nodemailer";

import { auth } from "./authNodeMailer";

export const transporter = nodemailer.createTransport({
  host: auth.host,
  port: auth.port,
  auth: {
    user: auth.auth.user,
    pass: auth.auth.pass,
  },
});
