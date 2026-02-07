import { Listing } from "./models/listing.models.js";
import ExpressError from "./utils/ExpressError.js";
import { listingSchema } from "./schema.js";
import { reviewSchema } from './schema.js';

export const isLoggedIn=(req,res,next)=>{
  if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
    req.flash("error","you must login")
    return res.redirect("/login")
  }
  next()
}

export const savedRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl
  }
  next()
}

export const isOwner=async (req,res,next)=>{
  let {id}=req.params
  let listing=await Listing.findById(id)
    if( !listing.owner._id.equals(res.locals.currUser._id)){
      req.flash("error","you dont have permission to edit")
      return res.redirect(`/listings/${id}`)
    }
    next()
}

// validate listing middleware
export const validateListing=(req,res,next)=>{
  let result=listingSchema.validate(req.body);
  if(result.error){
    let errMsg=result.error.details.map((el)=>el.message).join(",")
    throw new ExpressError(400,errMsg)
  }else{
    next()
  }
}

// validate review middleware
export const validateReview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",")
    throw new ExpressError(400,errMsg);
  }else{
    next()
  }
}