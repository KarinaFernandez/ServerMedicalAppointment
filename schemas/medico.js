const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var options = { discriminatorKey: 'kind' };
const Persona = mongoose.model('Persona', require('./persona'));

const medicoSchema = Persona.discriminator('Medico', new Schema({
    titulo: {
        type: String,
        required: [true, 'requerido'],
    },
    especialidades: {
        type: [String],
        required: [true, 'requerido'],
    },
    puntuacion: {
        type: Number,
        match: [/^([1-9]|10)$/, 'Puntación invalida. Se espera valor del 1 al 10']
    },
    comentarios: {
        type: [Schema.Types.ObjectId],
        ref: 'Comentario'
    },
    centroMedico: {
        type: String,
        required: [true, 'requerido']
    }
}, options));

module.exports = medicoSchema;