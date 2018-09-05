import mongoose from 'mongoose';

const materiaSchema = new mongoose.Schema({
  grau: { type: Number, required: true },
  nome: { type: String, required: true },
  especializacoes: { type: [String], required: false },
});

const Materia = mongoose.model('Materia', materiaSchema);

export default Materia;
