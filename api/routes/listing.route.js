import express from 'express';
import { createListing, deleteListing } from '../controllers/listing.controller.js';
import { VerifyToken } from '../utils/VerifyUser.js';

const router = express.Router();

router.post('/create' , VerifyToken, createListing)
router.delete('/delete/:id' ,VerifyToken, deleteListing)
export default router;
