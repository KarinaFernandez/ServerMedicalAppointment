const mongoose  = require('mongoose'); 
const Schema    = mongoose.Schema;

var options = {discriminatorKey: 'kind'};
const Persona = mongoose.model('Persona', require('./persona')); 

const usuarioSchema = Persona.discriminator('Usuario', new Schema({
    documento: {
        type : Number,
        index: true,
        required: [true,'requerido'],
        validate: {
            validator: function(value) {
                return /^(0|[1-9]\d*)$/.test(value);
            },
            message: props => `${props.value} documento invalido`
        }
    },
    telefono: {
        type: Number,
        unique: true,
        required: [true,'requerido'],
        match: [/^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/, 'teléfono invalido']
    },
    estado: {
        type: String,
        required: [true,'requerido'],
        enum :{
            values: ['ACTIVO', 'INACTIVO'],
            message:'estado invalido, se espera ACTIVO, INACTIVO'
        }
    }
}, options));

module.exports = usuarioSchema;