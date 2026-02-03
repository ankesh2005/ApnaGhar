import express, { response } from 'express'
const router=express.Router()
import {User} from '../models/user.models.js'
import wrapAsync from '../utils/wrapAsync.js'

router.get("/demouser",async (req,res)=>{
  const fakeUser=new User({
    email:"test@gmail.com",
    username:"test"
  })
  const registeredUser=await User.register(fakeUser,"12345")
  res.send(registeredUser)
})

router.get("/signup",(req,res)=>{
  res.render("./users/signup.ejs")
})

router.post("/signup",wrapAsync(async(req,res)=>{
  try{
    let {username,email,password}=req.body
  const newUser=new User({email,username})
  const registeredUser=await User.register(newUser,password);
  console.log(registeredUser)
  req.flash("success","welcome to ApnaGhar!")
  res.redirect("/listings")
  }catch(e){
    req.flash("error",e.message)
    res.redirect("/signup")
  }
}))

router.get("login",async (req,res)=>{
  res.render("./users/login.ejs")
})

export default router