import express from "express";
import multer from "multer";
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


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

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
router.get("/:id/edit", isLoggedIn,
  upload.single("listing[image]"),  isOwner, wrapAsync(renderEditForm));

export default router;

