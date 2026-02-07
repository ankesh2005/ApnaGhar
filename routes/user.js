import express from "express";
const router = express.Router();
import { User } from "../models/user.models.js";
import wrapAsync from "../utils/wrapAsync.js";
import passport from "passport";
import { savedRedirectUrl } from "../middlewares.js";


router.get("/signup", (req, res) => {
  res.render("./users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res,next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        } else {
          req.flash("success", "you are Sign In");
          return res.redirect("/listings");
        }
      });
    } catch (err) {
      req.flash("error", err.message);
      return res.redirect("/signup");
    }
  }),
);

router.get("/login", async (req, res) => {
  res.render("./users/login.ejs");
});

router.post(
  "/login",savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "welcome back to ApnaGhar! You are Logged in!");
    res.redirect(res.locals.redirectUrl||"/listings");
  },
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    } else {
      req.flash("success", "you are logged out");
      res.redirect("/listings");
    }
  });
});

export default router;
