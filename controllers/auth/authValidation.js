/* eslint-disable */
import { check } from 'express-validator/check';
import User from '../../models/User';

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
