import express from "express";
import { connectDB } from "./startup/db";
import dotenv from "dotenv";
dotenv.config();
import routes from "./startup/routes";

const app = express();
const port = process.env.PORT || 5000;

connectDB();
routes(app);

app.get("/", (req, res) => {
  res.send("Hello from NeuraTalk!");
});

app.listen(port, () => {
  console.log(`Sever started at http://localhost:${port}`);
});
