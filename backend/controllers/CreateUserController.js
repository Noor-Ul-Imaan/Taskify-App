import { User } from "../models/CreateUserModel.js";
import { Organization } from "../models/OrgDetails.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const createUser = async (req, res) => {
  const { name, lastname, role, level } = req.body;
  console.log("hi");
  try {
    const userId = uuidv4();
    const email = `${name}.${lastname}@example.com`.toLowerCase();

    const plainPassword = crypto.randomBytes(3).toString("hex");
    const password = await bcrypt.hash("defaultPassword", 5);

    // Ensure email uniqueness
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = new User({
      userId,
      name,
      lastname,
      email,
      password,
      role,
      level,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
      plainPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
