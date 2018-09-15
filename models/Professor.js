import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

import AvaliacaoProfessor from './AvaliacaoProfessor';
import Materia from './Materia';
import Aula from './Aula';

const professorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  endereco: { type: String, required: true },
  revisado: { type: Boolean, required: true },
  lattes: { type: String, required: true },
  diploma: { type: String, required: true },
  biografia: { type: String, required: true },
  notaMedia: { type: Number, required: false },
  dataNascimento: { type: Date, required: true },
  agenda: { type: [Date], required: false },
  materias: { type: [Materia], required: false },
  avaliacoes: { type: [AvaliacaoProfessor], required: false },
  aulas: { type: [Aula], required: false },
});

// password hash middleware
professorSchema.pre('save', function save(next) {
  const professor = this;

  if (!professor.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    return bcrypt.hash(professor.password, salt, null, (bcryptErr, hash) => {
      if (err) {
        return next(bcryptErr);
      }

      professor.password = hash;
      return next();
    });
  });
});

// validates user's password.
professor.methods.comparePassword = function comparePassword(candidatePassword) {
  const { password } = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, (err, isMatch) => {
      if (err) {
        reject(err);
      }

      resolve(isMatch);
    });
  });
};

const Professor = mongoose.model('Professor', professorSchema);

export default Professor;
