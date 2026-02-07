import express from 'express'
import { Review } from '../models/review.models.js';
import wrapAsync from '../utils/wrapAsync.js';
import { Listing } from '../models/listing.models.js';
import {isLoggedIn, isReviewAuthor, validateReview} from "../middlewares.js"

const router=express.Router({mergeParams:true});
 
//post reviews
router.post("/",isLoggedIn,validateReview,wrapAsync(async(req,res)=>{
  let id=req.params.id
  let listing=await Listing.findById(id)
  let newReview= new Review(req.body.review)
  newReview.author=req.user._id

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success","new review created")
  res.redirect(`/listings/${id}`)
}))

// delete reviews
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(async(req,res)=>{
  let {id,reviewId}=req.params
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}}) 
  await Review.findByIdAndDelete(reviewId)
  req.flash("success","review deleted")
  res.redirect(`/listings/${id}`)
}))

export default router