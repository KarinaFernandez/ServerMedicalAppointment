const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var options = { discriminatorKey: 'kind' };

const personaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'requerido'],
        maxlength: [100, 'máximo 100 caracteres']
    },
    apellido: {
        type: String,
        required: [true, 'requerido'],
        maxlength: [100, 'máximo 100 caracteres']
    },
    email: {
        type: String,
        required: [true, 'requerido'],
        unique: true,
        index: true,
        match: [/\S+@\S+\.\S+/, 'email invalido'],
    },
    contraseña: {
        type: String,
        required: [true, 'requerido']
    }
}, options);

personaSchema.methods.quienSoy = function () {
    const esMedico = (this.medico) ? 'y también medico' : '';
    return `soy ${this.kind} ${this.nombre} ${this.apellido} $
{esMedico}`;
}

module.exports = personaSchema; 