/* eslint-disable */
import httpStatus from 'http-status';
import Professor from '../../models/Professor';
import Materia from '../../models/Materia';
import User from "../../models/User";

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

export async function getProfessoresByMateria(req, res) {
  try {
    var nomeMateria = String(req.params.materia);
    const professores = await Professor.find({"materias.nome": nomeMateria});
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
      var professor = new Professor();
      professor.set(req.body);
      await professor.save();
      return res.json(professor);
    } catch (error) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Ocorreu um erro ao tentar cadastrar professor' });

    }
}

export async function validateProfessor(req, res) {

  try {
    var emailProfessor = req.body.email;
    //var professor = new Professor();
    Professor.update(
      {
        email: emailProfessor
      },{
        $set:
          {
              revisado: req.body.revisado,
              camposInvalidos: req.body.camposInvalidos,
          }
      },function(err, raw) {
          if (err) {
            res.send(err);
          }
          res.send({message: "Professor atualizado"});
        });
    //return res.json(professor);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao tentar validar professor' });

  }
}

export async function getAgendaProfessor(req, res) {
  try {
    const professor = await Professor.findById(req.params.id);
    return res.send(professor.agenda);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao buscar agenda do professor' });
  }
}

export async function putHorariosProfessor(req, res) {
  try {
    Professor.update(
      {
        _id: req.params.id
      },{
        $set:
          {
            agenda: req.body.agenda,
          }
      },function(err, raw) {
        if (err) {
          res.send(err);
        }
        res.send({message: "Horários cadastrados"});
      });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao cadastrar horários' });
  }
}
