const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey";

// Fake user (normally from DB)
let user = {
  email: "test@gmail.com",
  password: "$2b$10$hashedpasswordhere"
};

// LOGIN API
app.post("/login", async (req, res) => {
  const { password } = req.body;

  // compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // create JWT token
  const token = jwt.sign({ email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
});

app.listen(5000, () => {
  console.log("Server running");
});