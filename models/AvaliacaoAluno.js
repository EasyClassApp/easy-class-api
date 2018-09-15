import mongoose from 'mongoose';
import { professorSchema } from './Professor';
import { alunoSchema } from './Aluno';
import { aulaSchema } from './Aula';

const avaliacaoAlunoSchema = new mongoose.Schema({
  aluno: { type: [alunoSchema], required: true },
  professor: { type: [professorSchema], required: true },
  nota: { type: Number, required: true },
  comentario: { type: String, required: true },
  aula: { type: [aulaSchema], required: true },
});

const AvaliacaoAluno = mongoose.model('AvaliacaoAluno', avaliacaoAlunoSchema);

export default AvaliacaoAluno;
