import mongoose from 'mongoose';
import { especialidadeSchema } from './Especialidade';


export const materiaSchema = new mongoose.Schema({
 nome: { type: String, required: true },
 especialidades: { type: [especialidadeSchema], required: false },
});

const Materia = mongoose.model('Materia', materiaSchema);

export default Materia;
