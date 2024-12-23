import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        // Extract the JWT token from cookies
        const token = req.cookies?.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        // Verify the token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        // Check if the user exists in the database
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Attach the user object to the request for use in subsequent middleware or controllers
        req.user = user;

        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        console.error("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};                                                                                                                                                                                                                                                                                                                                                                       

export default protectRoute;
