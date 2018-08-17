/* eslint-disable */
import { check} from 'express-validator/check';
import User from '../../models/User';

export const signupValidation = [
  check('name')
    .exists()
    .withMessage('O nome deve ser informado')

    .isLength({ min: 2 })
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
    .withMessage('O email informado já foi cadastrado')
];
