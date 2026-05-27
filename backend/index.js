import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error", err));

// Company Schema
const companySchema = new mongoose.Schema({
  name: String,
  location: String,
  industry: String,
});

const Company = mongoose.model("Company", companySchema);

// Add new company
app.post("/api/companies", async (req, res) => {
  const { name, location, industry } = req.body;

  if (!name || !location || !industry) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newCompany = new Company({ name, location, industry });
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//checking Routes
app.get("/", (req, res) => {
  res.send("Company Directory API is running");
});

// Get all companies
app.get("/api/companies", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
