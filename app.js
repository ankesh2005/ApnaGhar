import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import test from "./tests/test.js";
import listings from './routes/listings.js'
import methodOverride from 'method-override'
import ejsMate from "ejs-mate"
import path from 'path'

dotenv.config();
const app = express();
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(methodOverride("_method"))
app.engine('ejs',ejsMate)
app.use(express.static(path.resolve("public")))

// testing routes
app.use("/test",test)


// Listing routes
app.use("/listings",listings)



async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.get("/", (req, res) => {
  res.redirect("/listings");
  
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
    console.log("not connected to mongodb",err);
  });


