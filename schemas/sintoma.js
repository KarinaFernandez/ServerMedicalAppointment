const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sintomaSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Usuario requerido']
    },
    fecha: {
        type: Date,
        required: [true, 'Fecha requerida']
    },
    nota: {
        type: String,
        required: [true, 'Nota requerida']
    }
});

module.exports = sintomaSchema;