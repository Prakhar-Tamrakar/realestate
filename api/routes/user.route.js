import express from "express";
import {  deleteUser, updateUser,getUserListings } from "../controllers/user.controller.js";
import { VerifyToken } from "../utils/VerifyUser.js";
import { get } from "mongoose";

const router = express.Router(); 

// router.get('/test' , test)
router.post('/update/:id',VerifyToken,updateUser)
router.delete('/delete/:id',VerifyToken,deleteUser)
router.get('/listings/:id',VerifyToken,getUserListings)

export default router;