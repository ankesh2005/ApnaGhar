import { Review } from "../models/review.models.js";
import { Listing } from "../models/listing.models.js";

export const postReview=async(req,res)=>{
  let id=req.params.id
  let listing=await Listing.findById(id)
  let newReview= new Review(req.body.review)
  newReview.author=req.user._id

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success","new review created")
  res.redirect(`/listings/${id}`)
}


export const destroReview=async(req,res)=>{
  let {id,reviewId}=req.params
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}}) 
  await Review.findByIdAndDelete(reviewId)
  req.flash("success","review deleted")
  res.redirect(`/listings/${id}`)
}