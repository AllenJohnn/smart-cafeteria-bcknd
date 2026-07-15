const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request received at ${req.url}`,
  );
  next();
});

mongoose
  .connect(
    "mongodb+srv://testuser1:testuser1@cluster0.ozpuuan.mongodb.net/cafeteria-db",
  )
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((error) => console.error("MongoDB Connection Failure:", error));

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
  }),
);

const Menu = mongoose.model(
  "menus",
  new mongoose.Schema({
    itemId: String,
    itemName: String,
    category: String,
    description: String,
    price: Number,
    quantityAvailable: Number,
    preparationTime: String,
    availabilityStatus: String,
    itemImageUrl: String,
    addedDate: String,
    popularityTag: String,
  }),
);

const Offer = mongoose.model(
  "offers",
  new mongoose.Schema({
    offerId: String,
    offerName: String,
    applicableItem: String,
    discountPercentage: Number,
    offerDescription: String,
    validFrom: String,
    validUntil: String,
    couponCode: String,
    minimumOrderAmount: Number,
    status: String,
  }),
);

app.post("/test", (req, res) => {
  res.send("Hello");
});

// --- STUDENT DISPATCHERS ---
app.post("/students-add", async (req, res) => {
  try {
    await Student.create(req.body);
    res.json({ status: "Student Registered Successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to store record", details: err.message });
  }
});

app.post("/students-view", async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to read records", details: err.message });
  }
});

app.post("/menu-add", async (req, res) => {
  try {
    await Menu.create(req.body);
    res.json({ status: "Menu Item Added Successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add menu item", details: err.message });
  }
});

app.post("/menu-view", async (req, res) => {
  try {
    const data = await Menu.find();
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to retrieve menu catalog", details: err.message });
  }
});

app.post("/offers-add", async (req, res) => {
  try {
    await Offer.create(req.body);
    res.json({ status: "Offer Added Successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add offer", details: err.message });
  }
});

app.post("/offers-view", async (req, res) => {
  try {
    const data = await Offer.find();
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to view active offers", details: err.message });
  }
});

app.post("/dashboard", async (req, res) => {
  try {
    const students = await Student.countDocuments();
    const menuProducts = await Menu.countDocuments();
    const activeOffers = await Offer.countDocuments({ status: "Active" });

    res.json({
      registeredStudents: students,
      menuProducts: menuProducts,
      activeOffers: activeOffers,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Dashboard compilation fail", details: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server Live: Port 3000");
});
