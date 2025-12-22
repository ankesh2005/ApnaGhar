import express ,{response, Router} from 'express'
import { Listing } from '../models/listing.models.js'


const router=express.Router()

// index route
router.get("/",async (req,res)=>{
  const result=await Listing.find({});
  res.render("./listings/index.ejs",{result})
})

// show route
router.get("/:id",async(req,res)=>{
  let {id}=req.params
  const result=await Listing.findById(id)
  res.render("./listings/show.ejs",{result})
})

export default router