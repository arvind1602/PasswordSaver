// import User from '../models/User.model.js';
import PasswordEntry from "../models/passwordEntery.Model.js";
import ApiResponse from "../utils/ApiResponse.js";

const PassShowController = {
  async getUserPasswords(req, res) {
    try {
      const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
      const passwords = await PasswordEntry.find({ userId }).populate(
        "userId",
        "username fullname"
      );

      if (!passwords || passwords.length === 0) {
        return res
          .status(404)
          .json({ message: "No passwords found for this user." });
      }
      const passwordData = passwords.map((entry) => {
        return {
          id: entry._id,
          serviceName: entry.serviceName,
          username: entry.username,
          password: entry.password, // Consider removing this in production for security reasons
        };
      });

      res
        .status(200)
        .json(
          new ApiResponse(
            passwordData,
            "User passwords retrieved successfully",
            200
          )
        );
    } catch (error) {
      console.error("Error fetching user passwords:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getPasswordByName(req, res) {
    try {
      const { serviceName } = req.body;
      const userId = req.user.id; // Assuming user ID is stored in req.user after authentication

      const passwordEntry = await PasswordEntry.findOne({
        userId,
        serviceName,
      });

      if (!passwordEntry) {
        return res.status(404).json({ message: "Password entry not found." });
      }

      res.status(200).json(
        new ApiResponse(
          {
            id: passwordEntry._id,
            serviceName: passwordEntry.serviceName,
            username: passwordEntry.username,
            password: passwordEntry.password, // Consider removing this in production for security reasons
          },
          "Password entry retrieved successfully",
          200
        )
      );
    } catch (error) {
      console.error("Error fetching password entry:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export { PassShowController };
