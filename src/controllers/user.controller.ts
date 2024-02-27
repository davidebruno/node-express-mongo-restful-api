import { Request, Response } from 'express';
import crypto from 'crypto';

import { User, UserInput } from '../models/user.model';
import { duplicateErrorHandler, castErrorHandler, errorHandler } from '../error-handler/error.handler'
import { MongoError } from 'mongodb';

const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');

  // Hashing salt and password with 100 iterations, 64 length and sha512 digest
  return crypto.pbkdf2Sync(password, salt, 100, 64, `sha512`).toString(`hex`);
};

const createUser = async (req: Request, res: Response) => {
  const { email, phone, enabled, fullName, password, role } = req.body;

  if (!email || !fullName || !password || !role) {
    return res.status(422).json({ message: 'The fields email, fullName, password and role are required' });
  }

  const userInput: UserInput = {
    fullName,
    email,
    phone,
    password: hashPassword(password),
    enabled,
    role,
  };

  try {
        const userCreated = await User.create(userInput);

        return res.status(201).json({ data: userCreated });

      } catch (err) {

        errorHandler(res, err);

      }
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().populate('role').sort('-createdAt').exec();

  return res.status(200).json({ data: users });
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {

    const user = await User.findOne({ _id: id }).populate('role').exec();

    if (!user) {
      return res.status(404).json({ message: `User with id "${id}" not found.` });
    }
  
    return res.status(200).json({ data: user });

  } catch (err) {

    errorHandler(res, err);

  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { enabled, fullName, role } = req.body;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: `User with id "${id}" not found.` });
    }

    if (!fullName || !role) {
      return res.status(422).json({ message: 'The fields fullName and role are required' });
    }

    await User.updateOne({ _id: id }, { enabled, fullName, role });

    const userUpdated = await User.findById(id);
  
    return res.status(200).json({ data: userUpdated });

  } catch (err) {

    errorHandler(res, err);
  }

};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {

    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: 'User deleted successfully.' });

  } catch(err) {

    errorHandler(res, err);
  }

  };

export { createUser, deleteUser, getAllUsers, getUser, updateUser };
