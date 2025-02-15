import { Express } from "express";
import authRouterV1 from "../routes/v1/auth";

const routes = (app: Express) => {
  app.use("/api/v1/auth", authRouterV1);
};

export default routes;
