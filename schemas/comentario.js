const mongoose  = require('mongoose'); 
const Schema    = mongoose.Schema;

const comentarioSchema = new Schema({
    fecha: {
        type: Date,
        required: [true,'requerido']
    },
    comentario:{
        type:String,
        required: [true, 'requerido']
    }
});

module.exports = comentarioSchema;