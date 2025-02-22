import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authtoken;
  console.log(token);
  console.log(req.headers);
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET!);
    // req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

export { verifyUser };
