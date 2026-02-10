import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import passport from "passport";
import { savedRedirectUrl } from "../middlewares.js";
import {
  login,
  logout,
  renderLoginForm,
  renderSignUpForm,
  signUp,
} from "../controllers/users.js";

const router = express.Router();

router
  .route("/signup")
  // render signup page
  .get(renderSignUpForm)
  //  signup
  .post(wrapAsync(signUp));

router
  .route("/login")
  // render login page
  .get(renderLoginForm)
  // login
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    login,
  );

// logout
router.get("/logout", logout);

export default router;
