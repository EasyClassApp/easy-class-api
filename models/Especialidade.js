import mongoose from 'mongoose';

export const especialidadeSchema = new mongoose.Schema({
 nome: { type: String, required: true },
});

const Especialidade = mongoose.model('Especialidade', especialidadeSchema);

export default Especialidade;
