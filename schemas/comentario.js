const mongoose  = require('mongoose'); 
const Schema    = mongoose.Schema;

const comentarioSchema = new Schema({
    email: {
        type: String,
        required: [true,'requerido'],
        match: [/\S+@\S+\.\S+/, 'Email invalido']
    },
    fecha: {
        type: Date,
        required: [true,'Fecha requerida']
    },
    comentario:{
        type:String,
        required: [true, 'Comentario requerido']
    }
});

module.exports = comentarioSchema;