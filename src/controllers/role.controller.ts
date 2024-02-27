import { Request, Response } from 'express';
import { Role, RoleInput } from '../models/role.model';
import { errorHandler } from '../error-handler/error.handler'

const createRole = async (req: Request, res: Response) => {
  const { description, name } = req.body;

  if (!name || !description) {
    return res.status(422).json({ message: 'The fields name and description are required' });
  }

  const roleInput: RoleInput = {
    name,
    description,
  };

  try {

    const roleCreated = await Role.create(roleInput);

    return res.status(201).json({ data: roleCreated });

  } catch(err) {

    errorHandler(res, err);
  }


};

const getAllRoles = async (req: Request, res: Response) => {
  const roles = await Role.find().sort('-createdAt').exec();

  return res.status(200).json({ data: roles });
};

const getRole = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const role = await Role.findOne({ _id: id });

    if (!role) {
      return res.status(404).json({ message: `Role with id "${id}" not found.` });
    }

    return res.status(200).json({ data: role });

  } catch(err) {

    errorHandler(res, err);
  }


};

const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, name } = req.body;

  try {
    const role = await Role.findOne({ _id: id });

    if (!role) {
      return res.status(404).json({ message: `Role with id "${id}" not found.` });
    }

    if (!name || !description) {
      return res.status(422).json({ message: 'The fields name and description are required' });
    }
  } catch(err) {

    errorHandler(res, err);
  }

  await Role.updateOne({ _id: id }, { name, description });

  const roleUpdated = await Role.findById(id, { name, description });

  return res.status(200).json({ data: roleUpdated });
};

const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Role.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Role deleted successfully.' });

  } catch(err) {

    errorHandler(res, err);
  }
};

export { createRole, deleteRole, getAllRoles, getRole, updateRole };
