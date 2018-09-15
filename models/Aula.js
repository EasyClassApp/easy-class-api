import mongoose from 'mongoose';
import { materiaSchema } from './Materia';
import { alunoSchema } from './Aluno';
import { professorSchema } from './Professor';

export const aulaSchema = new mongoose.Schema({
  professor: { type: [professorSchema], required: true },
  aluno: { type: { alunoSchema }, required: true },
  horario: { type: Date, required: true },
  local: { type: [String], required: true },
  status: { type: String, required: true },
  materia: { type: [materiaSchema], required: true },
});

const Aula = mongoose.model('Aula', aulaSchema);

export default Aula;
