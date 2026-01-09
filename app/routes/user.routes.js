import express from "express";
import { updateUser } from "../controller/userController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.put("/update", authMiddleware, updateUser);

export const userRoutes = router;
