import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserInfo,
  updateUser,
} from "../controller/userController.js";
import { authMiddleware, requireRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { body } from "express-validator";

const router = express.Router();

router.put(
  "/update",
  authMiddleware,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("age").isInt().withMessage("Age should between 0 to 150"),
  ],
  validate,
  updateUser
);
router.get("/userprofile", authMiddleware, getUserInfo);
router.get(
  "/getallusers",
  authMiddleware,
  requireRole(["admin", "patient", "doctor"]),
  getAllUsers
);
router.delete(
  "/deleteuser/:id",
  authMiddleware,
  requireRole(["admin"]),
  deleteUser
);

export const userRoutes = router;
