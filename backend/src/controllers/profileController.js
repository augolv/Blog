import { findByUserName, updateUser } from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js";

export async function getProfile(req, res) {
  const { username } = req.params;

  try {
    const user = await findByUserName(username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateProfile(req, res) {
  const { id } = req.params;
  const { username, bio } = req.body;
  let profile_picture = req.body.profile_picture;

  try {
    if (username && !/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      return res.status(400).json({ message: "Username must be 3-20 characters, letters, numbers, or underscores" });
    }
    if (bio && bio.length > 500) {
      return res.status(400).json({ message: "Bio must be 500 characters or less" });
    }

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: "profile_pictures" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });
        stream.end(req.file.buffer);
      });
      profile_picture = result.secure_url;
    }

    const updatedUser = await updateUser(id, username, bio, profile_picture);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.message === "Username already exists") {
      return res.status(409).json({ message: error.message });
    }
    if (error.message === "No fields provided to update") {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === "Only JPEG and PNG images are allowed") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}
