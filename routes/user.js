import express, { response } from 'express'
const router=express.Router()
import {User} from '../models/user.models.js'

router.get("/demouser",async (req,res)=>{
  const fakeUser=new User({
    email:"test@gmail.com",
    username:"test"
  })
  const registeredUser=await User.register(fakeUser,"12345")
  res.send(registeredUser)
})

router.get("/signup",(req,res)=>{
  res.send("hello")
})

export default router