import express ,{response, Router} from 'express'
import { Listing } from '../models/listing.models.js'


const router=express.Router()

// index route
router.get("/",async (req,res)=>{
  const result=await Listing.find({});
  res.render("./listings/index.ejs",{result})
})

// new list route
router.get("/new",async(req,res)=>{
  res.render("./listings/new.ejs")
})

// show route
router.get("/:id",async(req,res)=>{
  let {id}=req.params
  const result=await Listing.findById(id)
  res.render("./listings/show.ejs",{result})
})

// add listing
router.post("/",async(req,res)=>{
  let listing=req.body.listing;
  await new Listing(listing).save();
  res.redirect("/listings");
})


export default router