import express from "express";
import multer from "multer";
import wrapAsync from "../utils/wrapAsync.js";
import { storage } from "../cloudConfig.js";
import { isLoggedIn, isOwner, validateListing } from "../middlewares.js";
import {
  index,
  renderEditForm,
  renderNewForm,
  showListing,
  createListing,
  updateListing,
  destroyListing,
} from "../controllers/listings.js";

const upload=multer({storage})

const router = express.Router();

router
  .route("/")
  // index route
  .get(wrapAsync(index))
  // new listing route
  .post( isLoggedIn, upload.single('listing[image]'),  wrapAsync(createListing));


// new list route
router.get("/new", isLoggedIn, wrapAsync(renderNewForm));

router
  .route("/:id")
  // show route
  .get(wrapAsync(showListing))
  // update listing
  .put(isLoggedIn, isOwner, upload.single('listing[image]'),validateListing, wrapAsync(updateListing))
  // delete listing
  .delete(isLoggedIn, isOwner, wrapAsync(destroyListing));

// edit listing route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));

export default router;

// index route
// router.get("/",wrapAsync(index))

// add listing route
// router.post("/",validateListing,isLoggedIn,wrapAsync(createListing))

// show route
// router.get("/:id", wrapAsync(showListing));

// update listing route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(updateListing),
// );

// // delete listing
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(destroyListing));
