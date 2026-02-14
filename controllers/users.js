import { User } from "../models/user.models.js";

export const renderSignUpForm=async(req, res) => {
  await res.render("./users/signup.ejs");
}

export const signUp = async (req, res, next) => {
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
};

export const renderLoginForm= async (req, res) => {
  res.render("./users/login.ejs");
}

export const login = async (req, res) => {
  req.flash("success", "welcome back to ApnaGhar! You are Logged in!");
   const redirectUrl = res.locals.redirectUrl || "/listings";

  delete req.session.redirectUrl; 

  res.redirect(redirectUrl);
};

export const logout=(req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    } else {
      req.flash("success", "you are logged out");
      res.redirect("/listings");
    }
  });
}
