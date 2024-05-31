import express from "express";
import { Organization } from "../models/OrgDetails.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }

    const organization = await Organization.findOne({ email });

    if (!organization || !(await organization.comparePassword(password))) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const token = organization.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    }); // 3 days

    return res.status(200).send({ message: "Login successful" });
  } catch (error) {
    console.log("hi");
    // console.error('Error logging in:', error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).send({ message: "Logout successful" });
});

export default router;
