import { Express } from "express";
import authRouterV1 from "../routes/v1/auth";
import chatRouterV1 from "../routes/v1/chat";

const routes = (app: Express) => {
  app.use("/api/v1/auth", authRouterV1);
  app.use("/api/v1/chat", chatRouterV1);
};

export default routes;
