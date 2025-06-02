import express from "express";
import {  updateUser } from "../controllers/user.controller.js";
import { VerifyToken } from "../utils/VerifyUser.js";

const router = express.Router(); 

// router.get('/test' , test)
router.post('/update/:id',VerifyToken,updateUser)

export default router;