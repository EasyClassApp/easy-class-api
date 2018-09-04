import mongoose from 'mongoose';

const avaliacaoProfessorSchema = new mongoose.Schema({
  aluno: { type: Aluno, required: true },
  professor: { type: Professor, required: true },
  nota: { type: Number, required: true },
  comentario: { type: String, required: true },
  aula: { type: Aula, required: true },
});

const AvaliacaoProfessor = mongoose.model('AvaliacaoProfessor', avaliacaoProfessorSchema);

export default AvaliacaoProfessor;
