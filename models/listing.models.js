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
      type:String,
      set: (v)=>v===""?"https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60":v,
      default:"https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
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
    }]
  },
  { timestamps: true }
);

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}})
  }
})

export const Listing = mongoose.model("Listing", listingSchema);
