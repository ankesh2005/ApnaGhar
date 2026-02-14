import mongoose, { Schema } from "mongoose";
import { Review } from "./review.models.js";



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
     url:String,
     filename:String,
    },
    price:{
      type:Number,
      required: true,
    },
    location:{
      type:String,
      required:true,
    },
    country:String,
    reviews:[{
      type:Schema.Types.ObjectId,
      ref:"Review"
    }],
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User"
    },
    geometry:{
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  categories:{
    type:[String],
    enum:["mountains","pool","beach","rooms","camping","river","deserts","castles","farms","iconic_city","arctic"],
    default:[]
  }
  },
  { timestamps: true }
);

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}})
  }
})

export const Listing = mongoose.model("Listing", listingSchema);
