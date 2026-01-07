import { UserModel } from "../models/Users.js";

export const createUser = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
