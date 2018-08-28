import httpStatus from 'http-status';
// import { validationResult } from 'express-validator/check';
import User from '../../models/User';

export async function getUsers(req, res) {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao buscar a lista de usuários' });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: 'O usuário informado não existe' });
    }

    return res.json(user);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao buscar o usuário' });
  }
}

export async function updateUser(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: 'O usuário informado não existe' });
    }

    user.set(req.body);
    await user.save();

    return res.json(user);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao atualizar o usuário' });
  }
}

export async function deleteUser(req, res) {
  try {
    const removedUser = await User.findByIdAndRemove(req.params.userId);
    if (!removedUser) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: 'O usuário informado não existe' });
    }

    const users = await User.find();
    return res.send(users);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao excluir o usuário' });
  }
}
