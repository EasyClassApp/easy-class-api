import mongoose from 'mongoose';
import { professorSchema } from './Professor';
import { alunoSchema } from './Aluno';
import { aulaSchema } from './Aula';

export const avaliacaoProfessorSchema = new mongoose.Schema({
  professor: { type: [professorSchema], required: true },
  aluno: { type: [alunoSchema], required: true },
  nota: { type: Number, required: true },
  comentario: { type: String, required: true },
  aula: { type: [aulaSchema], required: true },
});

const AvaliacaoProfessor = mongoose.model('AvaliacaoProfessor', avaliacaoProfessorSchema);

export default AvaliacaoProfessor;
