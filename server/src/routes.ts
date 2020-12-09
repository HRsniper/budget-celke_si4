import { Router } from "express";

import { budgetController } from "./controller/BudgetController";

export const routes = Router();

routes.get("/", (request, response) => {
  response.status(200).json({ message: "Server Started" });
});

routes.post("/budget", budgetController.create);
routes.get("/budget", budgetController.index);
