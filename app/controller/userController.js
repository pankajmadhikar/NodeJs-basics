import { UserModel } from "../models/Users.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const newUser = await UserModel.create({ name, email, password, age });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
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
      res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password !== password) {
      res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email, age },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
