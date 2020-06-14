const mongoose  = require('mongoose'); 
const notaSchema = require('./nota');
const Schema    = mongoose.Schema;

const reservaSchema = new Schema({
    fecha: {
        type: Date,
        required: [true, 'Fecha de reserva requerida'],
        validate: {
            validator : function(value){
                return value < Date.now();
            },
            message: props => `${props.value} la fecha no es valida`
        }
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Usuario requerido']
    },
    medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        required: [true, 'Medico requerido']
    },
    notas: [notaSchema]
});

module.exports = reservaSchema; 