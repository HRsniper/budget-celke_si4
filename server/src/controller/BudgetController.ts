import { Response, Request } from "express";

import { Budget, UserInterface } from "../database/models/Budget";
import { transporter } from "../mail/nodemailer";
import { clientHtml, clientTxt } from "../mail/template/mail-template";
class BudgetController {
  async create(request: Request, response: Response): Promise<Response<JSON>> {
    try {
      const { name, email, phone, whatsapp, msg }: UserInterface = request.body;

      await Budget.create({ name, email, phone, whatsapp, msg });
      // await Budget.create(request.body);

      await transporter.sendMail(
        {
          from: '"HR🐱‍👤" <van.johnson@ethereal.email>',
          to: email,
          subject: "I received the budget request ✔",
          text: `${clientTxt(name)}`,
          html: `${clientHtml(name)}`,
        },
        (error) => {
          if (error) return response.status(200).json({ message: "budget request not sent!" });
        }
      );

      return response.status(200).json({ message: "budget request sent at successful!" });
    } catch (error) {
      // function handleError(e: any) {
      //   let errors = {};
      //   if (e.message.includes("Budget validation failed")) {
      //     const error = Object.values(e.errors);

      //     error.map(({ properties }: any) => {
      //       return (errors = { [properties.path]: properties.message });
      //     });
      //   }
      //   return errors;
      // }

      // return response.status(400).json({ message: handleError(error) });
      return response.status(400).json({ message: error.message });
    }
  }
  async index(request: Request, response: Response): Promise<Response<JSON>> {
    try {
      const budgets = await Budget.find();

      return response.status(200).json({ budgets });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export const budgetController = new BudgetController();
