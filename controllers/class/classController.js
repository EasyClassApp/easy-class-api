import httpStatus from 'http-status';
import Aula from '../../models/Aula';
// import { validationResult } from 'express-validator/check';

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
