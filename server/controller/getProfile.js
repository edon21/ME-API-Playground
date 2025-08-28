const ProfileModel = require("../models/Profile.model");

const getProfile = async (req,res)=>{
   try {
    const profiles = await ProfileModel.find();
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Server Error", error });
  }

}
module.exports = getProfile