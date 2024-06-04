import { User } from "../models/CreateUserModel.js";

export const getTotalUsers = async (req, res) => {
  try {
    const organizationName = req.organization.name; // Fetch organization name from authenticated admin
    const count = await User.countDocuments({ organizationName });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
