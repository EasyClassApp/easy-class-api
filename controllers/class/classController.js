import httpStatus from 'http-status';
import Aula from '../../models/Aula';
// import { validationResult } from 'express-validator/check';
import Class from '../../models/Aula';

export async function getClasses(req, res) {
  try {
    return res.send('OK - getClasses');
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getClassById(req, res) {
  try {
    return res.send('OK - getClassById');
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function createAula(req, res) {
  try {
    const aula = new Aula();
    aula.set(req.body);
    await aula.save();
    return res.json(aula);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao tentar cadastrar uma aula' });
  }
}

export async function updateClass(req, res) {
  try {
    const aula = await Class.findById(req.params.id);
    if (!aula) {
      return res
        .status(httpStatus.BAD_REQUEST);
    }

    aula.set(req.body);
    await aula.save();

    return res.json(aula);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function removeClass(req, res) {
  try {
    const removedClass = await Class.findByIdAndRemove(req.params.id);
    if (!removedClass) {
      return res
        .status(httpStatus.BAD_REQUEST);
    }

    const users = await Class.find();
    return res.send(users);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR);

  }
}
