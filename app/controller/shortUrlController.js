import { response } from "express";
import { ShortUrl } from "../models/ShortUrl.js";

export const createShortUrl = async (req, res) => {
  try {
    const { fullUrl } = req.body;
    const shortUrl = Math.random().toString(36).substring(2, 15);
    const newShortUrl = await ShortUrl.create({
      fullUrl,
      shortUrl,
    });
    res.status(201).json({
      success: true,
      newShortUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOriginalUrl = async (req, res) => {
  try {
    const shortCode = req.params.shortUrlCode;
    const originalUrl = await ShortUrl.findOne({ shortUrl: shortCode });
    console.log("shortCode", shortCode);
    console.log("originalUrl", originalUrl);
    if (!originalUrl) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    } else {
      res.redirect(originalUrl.fullUrl);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid request",
    });
  }
};
