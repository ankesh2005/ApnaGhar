import mongoose from "mongoose";
import initdata from "./data.js";
import { Listing } from "../models/listing.models.js";
import dotenv from "dotenv";


dotenv.config();

const MONGO_URL="mongodb://localhost:27017/ApnaGhar"
async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("not connected to mongodb",err);
  });

const initDB=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data)
    console.log("Data was initialize")
}

initDB();