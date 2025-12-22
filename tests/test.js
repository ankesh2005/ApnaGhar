import { Listing } from "../models/listing.models.js";
import express,{ Router } from "express";

const router=express.Router()

router.get("/Listing",async (req,res)=>{
  let sampleListing=new Listing({
    title:"House villa",
    description:"beach front",
    price:1200,
    location:"goa calagute",
    country:"India",
  });
  const result=await sampleListing.save();
  console.log("sample saved");
  res.send(result);
})

export default router