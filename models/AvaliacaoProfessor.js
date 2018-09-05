import mongoose from 'mongoose';

const avaliacaoProfessorSchema = new mongoose.Schema({
  professor: { type: Professor, required: true },
  aluno: { type: Aluno, required: true },
  nota: { type: Number, required: true },
  comentario: { type: String, required: true },
  aula: { type: Aula, required: true },
});

const AvaliacaoProfessor = mongoose.model('AvaliacaoProfessor', avaliacaoProfessorSchema);

export default AvaliacaoProfessor;