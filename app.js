const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://testuser1:testuser1@cluster0.ozpuuan.mongodb.net/course_db",
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    title: String,
    duration: String,
    fees: String,
    trainerName: String,
    startDate: String,
    endDate: String,
  }),
);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/test", (req, res) => {
  res.send("Hello");
});

app.get("/view-course", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

app.post("/add-course", async (req, res) => {
  await Course.create(req.body);
  res.json({ status: "success" });
});

// ADMINISTRATIVE DATA WIPER
app.post("/system-purge-all", async (req, res) => {
  try {
    const clearedStudents = await Student.deleteMany({});
    const clearedMenus = await Menu.deleteMany({});
    const clearedOffers = await Offer.deleteMany({});

    res.json({
      status: "Success",
      message: "All database instances purged completely.",
    });
  } catch (err) {
    res.status(500).json({ error: "Purge failed", details: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server started");
});
