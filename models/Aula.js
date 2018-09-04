import mongoose from 'mongoose';

const aulaSchema = new mongoose.Schema({
  professor: { type: Professor, required: true },
  aluno: { type: Aluno, required: true },
  horario: { type: Date, required: true },
  local: { type: [String], required: true },
  status: { type: String, required: true },
  materia: { type: Materia, required: true },
});

const Aula = mongoose.model('Aula', aulaSchema);

export default Aula;
