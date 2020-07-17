const mongoose  = require('mongoose'); 
const Schema    = mongoose.Schema;

const especialidadSchema = new Schema({
    nombre: {
        type: String,
        required: [true,'Nombre requerido']
    }
});

module.exports = especialidadSchema;