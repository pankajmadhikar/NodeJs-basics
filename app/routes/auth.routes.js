import {
  createUser,
  loginUser,
  updateUser,
} from "../controller/userController.js";
import express from "express";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);

export const authRoutes = router;
