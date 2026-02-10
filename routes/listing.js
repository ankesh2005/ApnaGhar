import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
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
const router = express.Router();



router
.route("/")
// index route
.get(wrapAsync(index))
// new listing route
.post(validateListing, isLoggedIn, wrapAsync(createListing));
 
// new list route
router.get("/new", isLoggedIn, wrapAsync(renderNewForm));

router
  .route("/:id")
  // show route
  .get(wrapAsync(showListing))
  // update listing
  .put(isLoggedIn, isOwner, validateListing, wrapAsync(updateListing))
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
