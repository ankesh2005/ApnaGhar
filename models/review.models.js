import mongoose from "mongoose";

const reviewSchema=mongoose.Schema(
  {
    comment:{
      type:String
    },
    rating:{
      type:Number,
      min:1,
      max:5
    },
    createdAt:{
      type:Date,
      default:Date.now
    }
  }
);

export const Review=mongoose.model("Review",reviewSchema)