// controllers/UserManagementController.js
import { User } from "../models/CreateUserModel.js";

export const getUsersByOrganization = async (req, res) => {
  try {
    const organizationName = req.organization.name;
    const users = await User.find({ organizationName });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
