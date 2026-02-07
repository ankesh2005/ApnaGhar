import express ,{response, Router} from 'express'
import { Listing } from '../models/listing.models.js'
import wrapAsync from '../utils/wrapAsync.js';
import { isLoggedIn, isOwner,validateListing } from '../middlewares.js';
import { index, renderEditForm, renderNewForm, showListing,createListing, updateListing, destroyListing } from '../controllers/listings.js';
const router=express.Router()


// index route
router.get("/",wrapAsync(index))

// new list route
router.get("/new",isLoggedIn,wrapAsync(renderNewForm))

// show route
router.get("/:id",wrapAsync(showListing))

// add listing route
router.post("/",validateListing,isLoggedIn,wrapAsync(createListing))

// edit listing route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(renderEditForm))

// update listing route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(updateListing))

// delete listing
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(destroyListing))


export default router