import ApiResponse from "../utils/ApiResponse.js";

const UserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res
      .status(200)
      .json(new ApiResponse(user, "Profile fetched successfully", 200));
  } catch (err) {
    return res.status(500).json({ message: "Unable to fetch user" });
  }
};

export default UserProfile;
