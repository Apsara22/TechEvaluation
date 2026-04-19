const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// Middleware (to read JSON body)
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/Curd")
  .then(() => console.log("MongoDB Connected (Curd DB)"))
  .catch((err) => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

// ADD the User
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET ALL USER
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "All users fetched",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update the User
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete the User
app.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get("/", (req, res) => {
  res.send("I");
});

// Server Running
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});