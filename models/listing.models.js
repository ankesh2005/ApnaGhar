import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description:{
      type:String,
      required:true
    },
    image:{
      type:String,
      set: (v)=>v===""?"default_link":v,
    },
    price:{
      type:Number,
      required: true,
    },
    location:{
      type:String,
      required:true,
    },
    country:String
  },
  { timestamps: true }
);

export const Listing = mongoose.model("Listing", listingSchema);
