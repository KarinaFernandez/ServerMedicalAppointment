const mongoose  = require('mongoose'); 
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
    // hora: {
    //     type: Date,
    //     required: [true, 'Fecha de reserva requerida'],
    // }
    
    // DEBERIA OBTENER EL USER LOGEADO (?)
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Usuario requerido']
    },
    medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        required: [true, 'Medico requerido'],
        validate :{
            validator : function(value){
                return value.puntuacion < 1;
            },
            message: props => `No se puede realizar reserva para el medico seleccionado`
        },
    },
    nota: [{
        type: Schema.Types.ObjectId,
        ref: 'Nota'
    }]
});

module.exports = reservaSchema; 