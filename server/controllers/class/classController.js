import httpStatus from 'http-status';
// import { validationResult } from 'express-validator/check';

export async function getClasses(req, res) {
  try {
    return res.send('OK - getClasses');
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao buscar a lista de aulas' });
  }
}

export async function getClassById(req, res) {
  try {
    return res.send('OK - getClassById');
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao buscar a aula informada' });
  }
}
