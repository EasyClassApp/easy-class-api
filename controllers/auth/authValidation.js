/* eslint-disable */
import { check } from 'express-validator/check';
import User from '../../models/User';
import Professor from '../../models/Professor';
import Aluno from '../../models/Aluno';

export const signupValidation = [
  check('name')
    .exists()
    .withMessage('O nome deve ser informado')

    .isLength({ min: 3 })
    .withMessage('O nome deve possuir pelo menos dois caracteres'),

  check('email')
    .exists()
    .withMessage('O email deve ser informado')

    .isEmail()
    .withMessage('O email informado é inválido')

    .custom(async (email, { req }) => {
      const users = await User.find({ email });
      return users.length === 0;
    })
    .withMessage('O email informado já foi cadastrado'),

    check('password')
      .exists()
      .withMessage('A senha deve ser informada'),
];

export const signinValidation = [
  check('email')
    .exists()
    .isLength({ min: 1 })
    .withMessage('O email deve ser informado')

    .isEmail()
    .withMessage('O email informado é inválido'),

  check('password')
    .exists()
    .isLength({ min: 1 })
    .withMessage('A senha deve ser informada')
];

export const signupProfessorValidation = [
  check('nome')
    .exists()
    .withMessage('O nome deve ser informado!')

    .isLength({ min: 3 })
    .withMessage('O nome deve possuir pelo menos dois caracteres'),

  check('email')
    .exists()
    .withMessage('O email deve ser informado')

    .isEmail()
    .withMessage('O email informado é inválido')

    .custom(async (email, { req }) => {
      const professores = await Professor.find({ email });
      return professores.length === 0;
    })
    .withMessage('O email informado já foi cadastrado')

    .custom(async (email, { req }) => {
      const alunos = await Aluno.find({ email });
      return alunos.length === 0;
    })
    .withMessage('O email informado já foi cadastrado'),

    check('senha')
    .exists()
    .withMessage('A senha deve ser informada')
    .isLength({min: 5})
    .withMessage('A senha deve conter pelo menos 4 caracteres'),

    check('endereco')
    .exists()
    .withMessage('O endereço deve ser informada'),

    check('lattes')
    .exists()
    .withMessage('O lattes deve ser informado'),

    check('biografia')
    .exists()
    .withMessage('A biografia deve ser informada'),

    check('dataNascimento')
    .exists()
    .withMessage('A data de nascimento deve ser informada'),

    check('materias')
    .exists()
    .withMessage('Pelo menos uma materia deve ser informada'),


];
