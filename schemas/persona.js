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
        validate: {
            validator: function (value) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: props => `email invalido`
        }
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