import httpStatus from 'http-status';
import Materia from '../../models/Materia';

export async function getMaterias(req, res) {
  try {
    const materias = await Materia.find();
    return res.send(materias);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao buscar a lista de materias' });
  }
}

