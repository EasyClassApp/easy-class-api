import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const alunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  endereco: { type: String, required: true },
  responsavel: { type: Boolean, required: true },
  numeroDependentes: { type: Number, required: true },
  notaMedia: { type: Number, required: false },
  dataNascimento: { type: Date, required: true },
  avaliacoes: { type: [AvaliacaoAluno], required: false },
  materiasDificuldade: { type: [Materia], required: false },
  aulas: { type: [Aula], required: false },
});

// password hash middleware
alunoSchema.pre('save', function save(next) {
  const aluno = this;

  if (!aluno.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    return bcrypt.hash(aluno.password, salt, null, (bcryptErr, hash) => {
      if (err) {
        return next(bcryptErr);
      }

      aluno.password = hash;
      return next();
    });
  });
});

// validates user's password.
aluno.methods.comparePassword = function comparePassword(candidatePassword) {
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

const Aluno = mongoose.model('Aluno', alunoSchema);

export default Aluno;
