import e from "express";

const auth = e.Router();

auth.post("/signup", async (req, res) => {
  res.send("signup");
});

export default auth;
