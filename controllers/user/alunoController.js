import httpStatus from 'http-status';
import Aluno from '../../models/Aluno';

export async function getAlunos(req, res) {
    try {
      const alunos = await Aluno.find();
      return res.send(alunos);
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Ocorreu um erro ao buscar a lista de alunos' });
    }
  }

  export async function createAluno(req, res) {
    try {    
      var aluno = new Aluno();
      aluno.set(req.body);
      await aluno.save();
      return res.json(aluno);
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Ocorreu um erro ao tentar cadastrar aluno' });
    }
  }
  