import jwt from 'jsonwebtoken';
import { User } from '../models/CreateUserModel.js';

export const requireAuth = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};







// import jwt from "jsonwebtoken";
// // import User from "../models/userModel.js";

// export const requireAuth = async (req, res, next) => {
//   // verify user is authenticated
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(401).json({ error: "Authorization token required" });
//   }

//   const token = authorization.split(" ")[1];

//   try {
//     const { _id } = jwt.verify(token, process.env.SECRET);

//     req.user = await User.findOne({ _id }).select("_id");
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ error: "Request is not authorized" });
//   }
// };

// export default requireAuth;