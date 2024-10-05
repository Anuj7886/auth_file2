import Router from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { admin_master } from "./apprun.js";
dotenv.config({ path: "./env" });
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { admin_username, admin_password, admin_name, admin_mobile } =
      req.body;
    const hashedPassword = await bcrypt.hash(admin_password, 10);
    console.log(req.body, hashedPassword);

    const user = await admin_master.create({ admin_username , admin_password, admin_name,admin_mobile });
    console.log(user);

    return;
    if (!user) res.status(409).json({ error: "Registration failed" });

    res.status(201).json({ message: "User  registered successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await admin_master.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1hr",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
