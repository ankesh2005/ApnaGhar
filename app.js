import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import test from "./tests/test.js";
import listings from "./routes/listing.js";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import path from "path";
import ExpressError from "./utils/ExpressError.js";
import reviews from "./routes/review.js"
import session from 'express-session'
import flash from 'connect-flash'
import passport from "passport";
import LocalStrategy from "passport-local"
import { User } from "./models/user.models.js";
import user from "./routes/user.js"

dotenv.config();
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.resolve("public")));

const sessionOptions={
  secret:process.env.SECRET_KEY,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+1000*60*60*24*3,
    maxAge:1000*60*60*24*3,
    httpOnly:true
  }
}

app.use(session(sessionOptions))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
  res.locals.success=req.flash("success")
  res.locals.error=req.flash("error")
  res.locals.currUser=req.user
  next()
})

// testing routes
app.use("/test", test);

// Listing routes
app.use("/listings", listings);

// review routes
app.use("/listings/:id/reviews",reviews)

// user routes
app.use("/",user)  


async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.get("/", (req, res) => {
  res.redirect("/listings");
});

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});


// Catch-all for wrong/non-existent paths
app.use((err, req, res, next) => {
  let {statusCode=500,message="something went wrong"}=err;
  res.status(statusCode).render("error.ejs",{err})
});


main()
  .then(() => {
    console.log("connected to mongodb");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("not connected to mongodb", err);
  });
