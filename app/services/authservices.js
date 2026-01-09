import { UserModel } from "../models/Users.js";

const createUser = async (name, email, password, age, role) => {
  const userData = await UserModel.create({
    name,
    email: email.toLowerCase(),
    password,
    age,
    role,
  });
  return userData;
};

const findUserById = async (id) => {
  try {
    const userData = await UserModel.findById(id);
    return {
      id: userData._id,
      email: userData.email,
      name: userData.name,
      age: userData.age,
      role: userData.role,
    };
  } catch (error) {
    return {
      message: error,
    };
  }
};

const deleteUserById = async (userId) => {
  try {
    const userData = await UserModel.findById(userId);
    await userData.delete();
  } catch (error) {
    return {
      message: error,
    };
  }
};

const findUserByEmail = async (email) => {
  const userData = await UserModel.findOne({ email });
  return userData;
};

const updateUserById = async (id, name, age) => {
  const userData = await UserModel.findByIdAndUpdate(
    id,
    { name, age },
    { new: true }
  );
  return userData;
};

const findAllActiveUsers = async () => {
  const usersData = await UserModel.find();
  return usersData;
};

export const Authservice = {
  createUser,
  findUserById,
  deleteUserById,
  findUserByEmail,
  updateUserById,
  findAllActiveUsers,
};
