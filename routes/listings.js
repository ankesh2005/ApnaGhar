import express ,{response, Router} from 'express'
import { Listing } from '../models/listing.models.js'
import wrapAsync from '../utils/wrapAsync.js';
import { isLoggedIn, isOwner,validateListing } from '../middlewares.js';

const router=express.Router()



// index route
router.get("/",wrapAsync(async(req,res)=>{
  const result=await Listing.find({});
  res.render("./listings/index.ejs",{result})
}))

// new list route
router.get("/new",isLoggedIn,wrapAsync(async(req,res)=>{
  res.render("./listings/new.ejs")
}))

// show route
router.get("/:id",wrapAsync(async(req,res)=>{
  let {id}=req.params
  const listing=await Listing.findById(id).populate("reviews").populate("owner")
  
  if(!listing){
    req.flash("error","listing you requested for does not exist");
    return res.redirect("/listings")
  }
  res.render("./listings/show.ejs",{listing})
}))

// add listing route
router.post("/",validateListing,isLoggedIn,wrapAsync(async(req,res,next)=>{
  let newListing=req.body.listing;
  newListing.owner=req.user._id
  await new Listing(newListing).save();
  req.flash("success","New Listing Created")
  return res.redirect("/listings");
}))

// edit listing route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
  const listing=await Listing.findById(req.params.id);
  if(!listing){
    req.flash("error","listing you requested for does not exist");
    return res.redirect("/listings")
  }
  res.render("./listings/edit.ejs",{listing})
}))

// update listing route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async(req,res)=>{
  let {id}=req.params
  await Listing.findByIdAndUpdate(id,{...req.body.listing})
  req.flash("success","listing details updated")
  return res.redirect(`/listings/${id}`);
}))

// delete listing
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
  let {id}=req.params
  await Listing.findByIdAndDelete(id)
  req.flash("success","listing deleted!")
  return res.redirect("/listings")
}))


export default router