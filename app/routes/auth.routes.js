import {
  createUser,
  loginUser,
  updateUser,
} from "../controller/userController.js";
import express from "express";
import { body } from "express-validator";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.post(
  "/signup",
  [body("email").isEmail().withMessage("Invalid email")],
  validate,
  createUser
);
router.post("/login", loginUser);

export const authRoutes = router;
