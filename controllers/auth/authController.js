import httpStatus from 'http-status';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator/check';
import User from '../../models/User';

const generateJWT = (user) => {
  const timestamp = new Date().getTime();
  return jwt.sign({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
};

// creates a new user and returns user + JWT
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

// authenticates with LocalStrategy and returns user + JWT
export async function signin(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({ errors: errors.mapped() });
  }

  return passport.authenticate('local', (err, user, info) => {
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
