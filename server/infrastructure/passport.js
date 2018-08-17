import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import User from '../models/User';

// checks if is a registered user -- used only for login, where the JWT is then provided
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return done(null, false, { message: `Email ${email} não encontrado` });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: 'Credenciais inválidas' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  },
));

// enables JWT authorization bearer verification -- used for any restricted API request
passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);
      if (!user) {
        return done(null, false, { msg: `Id ${payload.sub} not found.` });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  },
));
