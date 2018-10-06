/* eslint-disable */
import httpStatus from 'http-status';
import Professor from '../../models/Professor';

export async function getProfessores(req, res) {
  try {
    const professores = await Professor.find();
    return res.send(professores);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao buscar a lista de professores' });
  }
}

export async function getProfessor(req, res) {
  try {
    const professor = await Professor.findById(req.params.id);
    return res.send(professor);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao buscar a lista de professores' });
  }
}

export async function createProfessor(req, res) {
  try {
    const professor = new Professor();
    professor.set(req.body);
    await professor.save();
    return res.json(professor);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao tentar cadastrar professor' });
  }
}
