const ProfileModel = require("../models/Profile.model");

const deleteProfile = async (req,res)=>{
   try {
    const profile = await ProfileModel.findByIdAndDelete(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Server Error", error });
  }
}
module.exports = deleteProfile