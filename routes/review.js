import express from 'express'
import { Review } from '../models/review.models.js';
import { reviewSchema } from '../schema.js';
import wrapAsync from '../utils/wrapAsync.js';
import ExpressError from '../utils/ExpressError.js';
import { Listing } from '../models/listing.models.js';

const router=express.Router({mergeParams:true});

// validate review
const validateReview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",")
    throw new ExpressError(400,errMsg);
  }else{
    next()
  }
}

//post reviews
router.post("/",validateReview,wrapAsync(async(req,res)=>{
  let id=req.params.id
  let listing=await Listing.findById(id)
  let newReview= new Review(req.body.review)
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${id}`)
}))

// delete reviews
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
  let {id,reviewId}=req.params
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}}) 
  await Review.findByIdAndDelete(reviewId)
  res.redirect(`/listings/${id}`)
}))

export default router