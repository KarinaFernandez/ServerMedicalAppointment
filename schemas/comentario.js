const mongoose  = require('mongoose'); 
const Schema    = mongoose.Schema;

const comentarioSchema = new Schema({
    medico: {
        type: Schema.Types.ObjectId,
        ref: 'Medico',
        required: [true,'Medico requerido'],
    },
    email: {
        type: String,
        required: [true,'Email requerido'],
        match: [/\S+@\S+\.\S+/, 'Email invalido']
    },
    fecha: {
        type: Date,
        required: [true,'Fecha requerida'],
        validate: {
            validator : function(value){
                return value < Date.now();
            },
            message: props => `${props.value} la fecha no es valida. Fecha menor a fecha actual`
        }

    },
    comentario: {
        type: String,
        required: [true, 'Comentario requerido']
    }
});

module.exports = comentarioSchema;