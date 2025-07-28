import PasswordEntry from "../models/passwordEntery.Model.js";
import ApiResponse from "../utils/ApiResponse.js";

const addPasswordEntry = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is stored in req.user
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const { serviceName, username, password } = req.body;
    if (!serviceName || !username || !password) {
      return res
        .status(400)
        .json({ message: "Service name, username, and password are required" });
    }

    const newEntry = await PasswordEntry.create({
      userId,
      serviceName,
      username,
      password,
    });
    if (!newEntry) {
      return res
        .status(400)
        .json({ message: "Failed to create password entry" });
    }

    const newEntryData = newEntry.toObject();
    delete newEntryData.userId; // Optionally remove userId from response

    res
      .status(201)
      .json(
        new ApiResponse(
          newEntryData,
          "Password entry created successfully",
          201
        )
      );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating password entry", error: error.message });
  }
};

const deletePasswordEntry = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const deletedEntry = await PasswordEntry.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Password entry not found" });
    }
    const deletedEntryData = deletedEntry.toObject();
    delete deletedEntryData.userId; // Optionally remove userId from response

    res
      .status(200)
      .json(
        new ApiResponse(
          deletedEntryData,
          "Password entry deleted successfully",
          200
        )
      );
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting password entry", error: error.message });
  }
};

export { addPasswordEntry, deletePasswordEntry };
