import { UserModel } from "../models/Users.js";
import bcrypt from "bcryptjs";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const newUser = await UserModel.create({
      name,
      email: email.toLowerCase(),
      password,
      age,
      role,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.user.userId;
    console.log("id", id);
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      { name, age },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updateUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.userId;
    const userInfo = await UserModel.findById(userId);
    if (!userInfo) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user: userInfo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    return res.status(200).json({
      success: true,
      users: allUsers,
      totalUsers: allUsers.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User id required",
      });
    }
    const isValidUserId = await UserModel.findById(userId);
    if (!isValidUserId) {
      return res.status(404).json({
        success: false,
        message: "Invalid user id",
      });
    }
    await isValidUserId.delete();
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
