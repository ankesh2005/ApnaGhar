import { Listing } from "../models/listing.models.js";

export const index=async(req,res)=>{
  const result=await Listing.find({});
  res.render("./listings/index.ejs",{result})
}

export const renderNewForm=async(req,res)=>{
  res.render("./listings/new.ejs")
}

export const showListing=async(req,res)=>{
  let {id}=req.params
  const listing=await Listing.findById(id).populate({path:"reviews",populate:{
    path:"author"
  }}).populate("owner")
  
  if(!listing){
    req.flash("error","listing you requested for does not exist");
    return res.redirect("/listings")
  }
  res.render("./listings/show.ejs",{listing})
}

export const createListing=async(req,res,next)=>{
  let newListing=req.body.listing;
  newListing.owner=req.user._id
  await new Listing(newListing).save();
  req.flash("success","New Listing Created")
  return res.redirect("/listings");
}

export const renderEditForm=async(req,res)=>{
  const listing=await Listing.findById(req.params.id);
  if(!listing){
    req.flash("error","listing you requested for does not exist");
    return res.redirect("/listings")
  }
  res.render("./listings/edit.ejs",{listing})
}

export const updateListing=async(req,res)=>{
  let {id}=req.params
  await Listing.findByIdAndUpdate(id,{...req.body.listing})
  req.flash("success","listing details updated")
  return res.redirect(`/listings/${id}`);
}

export const destroyListing=async(req,res)=>{
  let {id}=req.params
  await Listing.findByIdAndDelete(id)
  req.flash("success","listing deleted!")
  return res.redirect("/listings")
}