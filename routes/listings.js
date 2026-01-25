import express ,{response, Router} from 'express'
import { Listing } from '../models/listing.models.js'
import wrapAsync from '../utils/wrapAsync.js';
import ExpressError from '../utils/ExpressError.js';
import { listingSchema, reviewSchema } from '../schema.js';
import { Review } from '../models/review.models.js';


const router=express.Router()

// validate listing middleware
const validateListing=(req,res,next)=>{
  let result=listingSchema.validate(req.body);
  if(result.error){
    let errMsg=result.error.details.map((el)=>el.message).join(",")
    throw new ExpressError(400,errMsg)
  }else{
    next()
  }
}

// index route
router.get("/",wrapAsync(async(req,res)=>{
  const result=await Listing.find({});
  res.render("./listings/index.ejs",{result})
}))

// new list route
router.get("/new",wrapAsync(async(req,res)=>{
  res.render("./listings/new.ejs")
}))

// show route
router.get("/:id",wrapAsync(async(req,res)=>{
  let {id}=req.params
  const listing=await Listing.findById(id).populate("reviews")
  res.render("./listings/show.ejs",{listing})
}))

// add listing route
router.post("/",validateListing,wrapAsync(async(req,res,next)=>{
  let listing=req.body.listing;
  await new Listing(listing).save();
  res.redirect("/listings");
}))

// edit listing route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
  const listing=await Listing.findById(req.params.id);
  res.render("./listings/edit.ejs",{listing})
}))

// update listing route
router.put("/:id",validateListing,wrapAsync(async(req,res)=>{
  let {id}=req.params
  await Listing.findByIdAndUpdate(id,{...req.body.listing})
  res.redirect(`/listings/${id}`);
}))

// delete listing
router.delete("/:id",wrapAsync(async(req,res)=>{
  let {id}=req.params
  await Listing.findByIdAndDelete(id)
  res.redirect("/listings")
}))

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
router.post("/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
  let id=req.params.id
  let listing=await Listing.findById(id)
  let newReview= new Review(req.body.review)
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${id}`)
}))

// delete reviews
router.delete("/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
  let {id,reviewId}=req.params
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}}) 
  await Review.findByIdAndDelete(reviewId)
  res.redirect(`/listings/${id}`)
}))


export default router