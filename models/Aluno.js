import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import { materiaSchema } from './Materia';
import { avaliacaoAlunoSchema } from './AvaliacaoAluno';
import { aulaSchema } from './Aula';

const alunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  endereco: { type: String, required: true },
  responsavel: { type: Boolean, required: true },
  numeroDependentes: { type: Number, required: true },
  notaMedia: { type: Number, required: false },
  dataNascimento: { type: Date, required: true },
  avaliacoes: { type: [avaliacaoAlunoSchema], required: false },
  materiaDificuldade: { type: materiaSchema, required: false },
  aulas: { type: [aulaSchema], required: false },
});

// password hash middleware
alunoSchema.pre('save', function save(next) {
  const aluno = this;

  if (!aluno.isModified('senha')) {
    return next();
  }

  return bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    return bcrypt.hash(aluno.senha, salt, null, (bcryptErr, hash) => {
      if (err) {
        return next(bcryptErr);
      }

      aluno.senha = hash;
      return next();
    });
  });
});

// validates user's password.
alunoSchema.methods.comparePassword = function comparePassword(candidatePassword) {
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

const Aluno = mongoose.model('Aluno', alunoSchema);

export default Aluno;
