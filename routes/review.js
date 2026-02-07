import express from 'express'
import wrapAsync from '../utils/wrapAsync.js';
import {isLoggedIn, isReviewAuthor, validateReview} from "../middlewares.js"
import { destroReview, postReview } from '../controllers/reviews.js';

const router=express.Router({mergeParams:true});
 
//post reviews
router.post("/",isLoggedIn,validateReview,wrapAsync(postReview))

// delete reviews
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(destroReview))

export default router