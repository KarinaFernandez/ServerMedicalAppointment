const mongoose = require('mongoose');
const reservaSchema = require('./reserva');
const sintomaSchema = require('./sintoma');
const usuarioSchema = require('./usuario');
const Schema = mongoose.Schema;

const historialSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    reservas: [reservaSchema],
    sintomas: [sintomaSchema]
});

module.exports = historialSchema;