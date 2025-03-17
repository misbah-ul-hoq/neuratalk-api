import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import routes from "./startup/routes";
import { connectDB } from "./startup/db";
const app = express();
const port = process.env.PORT || 5000;

let origin;
if (process.env.NODE_ENV === "development")
  origin = ["http://localhost:3000", "http://192.168.31.27:3000"];
else
  origin = [
    "https://neuratalk-one.vercel.app",
    "https://neuratalk.binarysearch.org",
  ];

app.use(
  cors({
    origin: origin,
    credentials: true,
    allowedHeaders: ["Authorization", "authToken", "Content-Type", "authtoken"],
    exposedHeaders: ["authToken"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  })
);
app.use(express.json());
connectDB();
routes(app);

app.get("/", (req, res) => {
  res.send("Hello from NeuraTalk!");
});

app.listen(port, () => {
  console.log(`Sever started at http://localhost:${port}`);
});
