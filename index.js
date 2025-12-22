import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import {Listing}  from "./models/listing.models.js";
import test from "./tests/test.js";

dotenv.config();
const app = express();
app.use("/test",test)
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

// app.get("/testListing",async (req,res)=>{
//   let sampleListing=new Listing({
//     title:"House villa",
//     description:"beach front",
//     price:1200,
//     location:"goa calagute",
//     country:"India",
//   });
//   const result=await sampleListing.save();
//   console.log("sample saved");
//   res.send(result);
// })