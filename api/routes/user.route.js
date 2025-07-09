import express from "express";
import {  deleteUser, updateUser } from "../controllers/user.controller.js";
import { VerifyToken } from "../utils/VerifyUser.js";

const router = express.Router(); 

// router.get('/test' , test)
router.post('/update/:id',VerifyToken,updateUser)
router.delete('/delete/:id',VerifyToken,deleteUser)

export default router;