/* eslint-disable */
import httpStatus from 'http-status';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator/check';
import Professor from '../../models/Professor';
import Aluno from '../../models/Aluno';
import User from '../../models/User';

const generateJWT = (user) => {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
};


export async function signup(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.mapped() });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const newUser = await user.save();
    const token = generateJWT(newUser);

    return res.json({ newUser, token });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function signupProfessor(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.mapped() });
    }

    const professor = new Professor({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      endereco: req.body.endereco,
      revisado: false,
      lattes: req.body.lattes,
      biografia: req.body.biografia,
      dataNascimento: req.body.dataNascimento,
      materias: req.body.materias,

    });

    const newProfessor = await professor.save();
    const token = generateJWT(newProfessor);
    return res.json({ newProfessor, token });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao criar o professor' });
  }
}

export async function signupAluno(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.mapped() });
    }

    const aluno = new Aluno({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      endereco: req.body.endereco,
      responsavel: req.body.responsavel,
      numeroDependentes: req.body.numeroDependentes,
      dataNascimento: req.body.dataNascimento,
      materiaDificuldade: req.body.materiaDificuldade,
    });
    const newAluno = await aluno.save();
    const token = generateJWT(newAluno);
    return res.json({ newAluno, token });
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Ocorreu um erro ao criar o aluno' });
  }
}

// authenticates with LocalStrategy and returns user + JWT
export async function signin(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ errors: errors.mapped() });
  }

  return passport.authenticate('admin', (err, user, info) => {
    if (err) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json(info);
    }

    return res.json({
      user,
      token: generateJWT(user),
    });
  })(req, res, next);
}

export async function signinProfessor(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ errors: errors.mapped() });
  }

  return passport.authenticate('professor', (err, user, info) => {
    if (err) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json(info);
    }

    return res.json({
      user,
      token: generateJWT(user),
    });
  })(req, res, next);
}

export async function signinAluno(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ errors: errors.mapped() });
  }

  return passport.authenticate('aluno', (err, user, info) => {
    if (err) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json(info);
    }

    return res.json({
      user,
      token: generateJWT(user),
    });
  })(req, res, next);
}

