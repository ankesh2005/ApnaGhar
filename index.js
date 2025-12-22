import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("<h1>Owned by Ankesh Gupta</h1>");
});

main()
  .then(() => {
    console.log("connected to mongodb");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("not connected to mongodb",err);
  });
