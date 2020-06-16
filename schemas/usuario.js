const mongoose = require('mongoose');
const reservaSchema = require('./reserva');
const sintomaSchema = require('./sintoma');
const Schema = mongoose.Schema;

var options = { discriminatorKey: 'kind' };
const Persona = mongoose.model('Persona', require('./persona'));

const usuarioSchema = Persona.discriminator('Usuario', new Schema({
    documento: {
        type: Number,
        required: [true, 'requerido'],
        validate: {
            validator: function (value) {
                return /^(0|[1-9]\d*)$/.test(value);
            },
            message: props => `${props.value} documento invalido`
        }
    },
    telefono: {
        type: String,
        unique: true,
        required: [true, 'requerido'],
        match: [/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'teléfono invalido. Debe contener entre 8 y 10 digitos']
    },
    estado: {
        type: String,
        required: [true, 'requerido'],
        enum: {
            values: ['ACTIVO', 'INACTIVO'],
            message: 'estado invalido, se espera ACTIVO, INACTIVO'
        }
    },
    sintomas: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Sintoma'
    }],
    reservas: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Reserva'
    }]
}, options));

module.exports = usuarioSchema;