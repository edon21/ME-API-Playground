const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Unique constraint
  education: { type: String, required: true },
  skills: { type: String, required: true },
  projects: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      workLink: { type: String },
      github: { type: String },
      linkedin: { type: String },
      portfolio: { type: String },
    },
  ],
});

module.exports = mongoose.model("Profile", ProfileSchema);