const mongoose  = require('mongoose'); 
const Schema    = mongoose.Schema;

const reservaSchema = new Schema({
    fecha: {
        type: Date,
        required: [true, 'Fecha de reserva requerida'],
    },
    // hora: {
    //     type: Date,
    //     required: [true, 'Fecha de reserva requerida'],
    // }
    
    // DEBERIA OBTENER EL USER LOGEADO (?)
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Usuario requerido'],
    },
    medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        required: [true, 'Medico requerido'],
    },
    nota: {
        type: String
    },
    fechaNota: {
        type: Date
    }
});

module.exports = reservaSchema; 