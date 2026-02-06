import express, { response } from "express";
const router = express.Router();
import { User } from "../models/user.models.js";
import wrapAsync from "../utils/wrapAsync.js";
import passport from "passport";

// router.get("/demouser", async (req, res) => {
//   const fakeUser = new User({
//     email: "test@gmail.com",
//     username: "test",
//   });
//   const registeredUser = await User.register(fakeUser, "12345");
//   res.send(registeredUser);
// });

router.get("/signup", (req, res) => {
  res.render("./users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.flash("success", "welcome to ApnaGhar!");
      res.redirect("/listings");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }),
);

router.get("/login", async (req, res) => {
  res.render("./users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success","welcome back to ApnaGhar! You are Logged in!")
    res.redirect("/listings")
  }
);

export default router;
