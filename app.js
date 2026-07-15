const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://testuser1:testuser1@cluster0.ozpuuan.mongodb.net/cafeteria-db"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const Student = mongoose.model(
  "students",
  new mongoose.Schema({
    studentId: String,
    studentName: String,
    rollNumber: String,
    department: String,
    semester: String,
    email: String,
    phone: String,
    registrationDate: String,
  })
);

app.post("/test", (req, res) => {
  res.send("Hello");
});

app.post("/students-add", async (req, res) => {
  try {
    await Student.create(req.body);
    res.json({
      status: "Student Registered Successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/students-view", async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3000, () => {
  console.log("Server Started on Port 3000");
});