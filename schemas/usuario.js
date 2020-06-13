const mongoose  = require('mongoose'); 
const Schema    = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: {
        type : String
    },
    apellido: {
        type : String
    },
    email: {
        type : String,
        required: [true,'requerido'],
        unique: true,
        validate: {
            validator: function(value) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: props => `${props.value} email invalido`
        }
    },
    documento: {
        type : Number,
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
        validate: {
            validator: function(value) {
                return /^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/.test(value);
            },
            message: props => `${props.value} teléfono invalido`
        }
    },
    estado: {
        type: String,
        enum :{
            values: ['ACTIVO', 'INACTIVO'],
            message:'No valido, se espera ACTIVO, INACTIVO'
        }
    },
    contraseña: {
        type: String,
        required: [true, 'requerido']
    }
});

module.exports = usuarioSchema;