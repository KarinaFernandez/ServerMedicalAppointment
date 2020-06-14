const mongoose  = require('mongoose'); 
const Schema    = mongoose.Schema;

const notaSchema = new Schema({
    fecha: {
        type: Date,
        required: [true,'Fecha requerida']
    },
    comentario:{
        type: String,
        required: [true, 'Comentario requerido']
    }
});

module.exports = notaSchema;