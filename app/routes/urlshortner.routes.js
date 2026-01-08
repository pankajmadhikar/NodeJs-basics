import express from "express";
import {
  createShortUrl,
  getOriginalUrl,
} from "../controller/shortUrlController.js";

const router = express.Router();

router.post("/createShortUrl", createShortUrl);
router.get("/:shortUrlCode", getOriginalUrl);

export const urlshortnerRoutes = router;
