const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://testuser1:testuser1@cluster0.ozpuuan.mongodb.net/cafeteria-db",
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

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

app.get("/test", (req, res) => {
  res.send("Hello");
});

app.get("/menu-add", async (req, res) => {
  try {
    await Menu.create(req.body);
    res.json({
      status: "Menu Item Added Successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/menu-view", async (req, res) => {
  try {
    const data = await Menu.find();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3000, () => {
  console.log("Server Started on Port 3000");
});
