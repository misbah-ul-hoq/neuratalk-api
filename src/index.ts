import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import routes from "./startup/routes";
import { connectDB } from "./startup/db";
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
connectDB();
routes(app);

app.get("/", (req, res) => {
  res.send("Hello from NeuraTalk!");
});

app.listen(port, () => {
  console.log(`Sever started at http://localhost:${port}`);
});
