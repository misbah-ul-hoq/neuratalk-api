"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const routes_1 = __importDefault(require("./startup/routes"));
const db_1 = require("./startup/db");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
let origin;
if (process.env.NODE_ENV === "development")
    origin = ["http://localhost:3000", "http://192.168.31.27:3000"];
else
    origin = ["https://neuratalk-one.vercel.app"];
app.use((0, cors_1.default)({
    origin: origin,
    credentials: true,
    allowedHeaders: ["Authorization", "authToken", "Content-Type", "authtoken"],
    exposedHeaders: ["authToken"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
}));
app.use(express_1.default.json());
(0, db_1.connectDB)();
(0, routes_1.default)(app);
app.get("/", (req, res) => {
    res.send("Hello from NeuraTalk!");
});
app.listen(port, () => {
    console.log(`Sever started at http://localhost:${port}`);
});
