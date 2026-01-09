import express from "express";
import { getUserInfo, updateUser } from "../controller/userController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.put("/update", authMiddleware, updateUser);
router.get("/userprofile", authMiddleware, getUserInfo);

export const userRoutes = router;
