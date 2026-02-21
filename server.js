require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_DB = process.env.MONGO_DB;
const MONGO_HOST = process.env.MONGO_HOST || "localhost";

const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:27017/${MONGO_DB}?authSource=admin`;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err));

const User = mongoose.model("User", {
  name: String,
  email: String,
});

app.post("/users", async (req, res) => {
  await User.create(req.body);
  res.redirect("/");
});

app.get("/users", async (req, res) => {
  res.json(await User.find());
});

app.listen(3000, () => console.log("Running on 3000"));
