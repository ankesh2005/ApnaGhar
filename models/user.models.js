import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


const userSchema=mongoose.Schema({
  email:{
    type:String,
    required:true
  }
})

userSchema.plugin(passportLocalMongoose.default||passportLocalMongoose)

export const User=mongoose.model("User",userSchema)