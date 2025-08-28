const ProfileModel = require("../models/Profile.model");

const createProfile = async (req, res) => {
  try {
    
    const existingProfile = await ProfileModel.findOne({ email: req.body.email });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists with this email" });
    }

    const profile = new ProfileModel(req.body);
    await profile.save();
    res.status(201).json({ message: "Profile created successfully", profile });
  } catch (error) {
    console.error("Error creating profile:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = createProfile;