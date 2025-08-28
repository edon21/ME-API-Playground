# Project Architecture, Schema, and Limitations

## Project Architecture

This project is a **Full-Stack MERN Application** designed to manage user profiles. Below is an overview of the architecture:

### 1. **Frontend**
   - Built with **React** and **Ant Design (antd)** for the UI.
   - Pages:
     - `PortfolioForm.jsx`: A form to create or update user profiles.
     - `ProfileTable.jsx`: A table to display all profiles with options to delete them.
   - State management is handled using React's `useState` and `useEffect` hooks.
   - API calls are made using **Axios**.

### 2. **Backend**
   - Built with **Node.js** and **Express.js**.
   - RESTful API endpoints:
     - `GET /api/profile/getProfile`: Fetch all profiles.
     - `POST /api/profile/createProfile`: Create a new profile.
     - `DELETE /api/profile/deleteProfile/:id`: Delete a profile by ID.
   - Error handling is implemented for all endpoints.

### 3. **Database**
   - **MongoDB** is used as the database.
   - Mongoose is used for schema modeling and database interaction.

---

## Database Schema

The following schema is used for the `Profile` collection:

```javascript
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

/*1. Duplicate Email Handling
The system prevents duplicate profiles by enforcing a unique constraint on the email field.
However, the error message for duplicate emails is only displayed after the form is submitted. A real-time email validation feature could improve the user experience.
2. Error Handling
While the backend handles errors (e.g., duplicate emails, server issues), the error messages could be more detailed and user-friendly.
The frontend currently uses alert() for error messages, which could be replaced with a more polished notification system.
- [Google Drive Link](https://drive.google.com/file/d/1hVyM7a8Vqizy_kGIKc-jXoyNkz_YenAa/view?usp=sharing)
