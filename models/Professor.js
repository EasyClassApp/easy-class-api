import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import { materiaSchema } from './Materia';
import { avaliacaoProfessorSchema } from './AvaliacaoProfessor';
import { aulaSchema } from './Aula';

const professorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  endereco: { type: String, required: false },
  revisado: { type: Boolean, required: true },
  lattes: { type: String, required: true },
  diploma: { type: String, required: false },
  biografia: { type: String, required: true },
  notaMedia: { type: Number, required: false },
  dataNascimento: { type: Date, required: true },
  agenda: { type: [Date], required: false },
  materias: { type: [materiaSchema], required: false },
  avaliacoes: { type: [avaliacaoProfessorSchema], required: false },
  aulas: { type: [aulaSchema], required: false },
  camposInvalidos: { type: [String] },
  localAula: { type: String, required: true },
});

// password hash middleware
professorSchema.pre('save', function save(next) {
  const professor = this;

  if (!professor.isModified('senha')) {
    return next();
  }

  return bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    return bcrypt.hash(professor.senha, salt, null, (bcryptErr, hash) => {
      if (err) {
        return next(bcryptErr);
      }

      professor.senha = hash;
      return next();
    });
  });
});

// validates user's password.
professorSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  const { senha } = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, senha, (err, isMatch) => {
      if (err) {
        reject(err);
      }

      resolve(isMatch);
    });
  });
};

const Professor = mongoose.model('Professor', professorSchema);

export default Professor;
