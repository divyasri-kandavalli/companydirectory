import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error", err));

//Company Schema
const companySchema = new mongoose.Schema({
  name: String,
  location: String,
  industry: String,
});

const Company = mongoose.model("Company", companySchema);

// Sample Companies
const companies = [
  { name: "Google", location: "Mountain View, CA", industry: "Technology" },
  { name: "Apple", location: "Cupertino, CA", industry: "Technology" },
  { name: "Amazon", location: "Seattle, WA", industry: "E-commerce" },
  { name: "Tesla", location: "Palo Alto, CA", industry: "Automotive" },
  { name: "Microsoft", location: "Redmond, WA", industry: "Software" },
  { name: "Facebook", location: "Menlo Park, CA", industry: "Social Media" },
  { name: "Netflix", location: "Los Gatos, CA", industry: "Entertainment" },
  { name: "Airbnb", location: "San Francisco, CA", industry: "Hospitality" },
  { name: "Uber", location: "San Francisco, CA", industry: "Transportation" },
  { name: "Spotify", location: "Stockholm, Sweden", industry: "Music Streaming" },
  { name: "Adobe", location: "San Jose, CA", industry: "Software" },
  { name: "Intel", location: "Santa Clara, CA", industry: "Semiconductors" },
  { name: "IBM", location: "Armonk, NY", industry: "Technology" },
  { name: "Salesforce", location: "San Francisco, CA", industry: "Software" },
  { name: "Oracle", location: "Redwood City, CA", industry: "Software" },
  { name: "Samsung", location: "Seoul, South Korea", industry: "Electronics" },
  { name: "Sony", location: "Tokyo, Japan", industry: "Electronics" },
  { name: "LinkedIn", location: "Sunnyvale, CA", industry: "Social Media" },
  { name: "PayPal", location: "San Jose, CA", industry: "Finance" },
  { name: "Snapchat", location: "Santa Monica, CA", industry: "Social Media" },
  { name: "Twitter", location: "San Francisco, CA", industry: "Social Media" },
  { name: "Zoom", location: "San Jose, CA", industry: "Video Conferencing" },
  { name: "Shopify", location: "Ottawa, Canada", industry: "E-commerce" },
  { name: "Slack", location: "San Francisco, CA", industry: "Communication" },
  { name: "Dropbox", location: "San Francisco, CA", industry: "Cloud Storage" }
];

// Seed Function
const seedDB = async () => {
  try {
    await Company.deleteMany({});
    await Company.insertMany(companies);
    console.log("Database seeded with 25 companies ✅");
  } catch (err) {
    console.error("Error seeding database ❌", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
