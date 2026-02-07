import express from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsync.js";
import passport from "passport";
import { savedRedirectUrl } from "../middlewares.js";
import { login, logout, renderLoginForm, renderSignUpForm, signUp } from "../controllers/users.js";

// render signup page
router.get("/signup", renderSignUpForm);

//  signup
router.post(
  "/signup",
  wrapAsync(signUp),
);

// render login page
router.get("/login",renderLoginForm);

// login
router.post(
  "/login",savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  login
);

// logout
router.get("/logout", logout);

export default router;
