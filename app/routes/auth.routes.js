import {
  createUser,
  loginUser,
  updateUser,
} from "../controller/userController.js";
import express from "express";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.put("/update/:id", updateUser);

export const authRoutes = router;
