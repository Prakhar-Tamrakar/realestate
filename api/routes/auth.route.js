import express from 'express';
import { google, signin, signup , signOut, sendOtp, verifyOtp} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup' , signup)
router.post('/signin', signin)
router.post('/google', google)
router.post('/send-otp', sendOtp)
router.post('/sent-otp-verify', verifyOtp)

router.get('/signout', signOut)
export default router;