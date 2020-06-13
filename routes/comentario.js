const express   = require('express');
const mongoose  = require('mongoose'); 
const RestError = require('../rest-error');
const Router     = express.Router();

const Comentario = mongoose.model('Comentario', require('../schemas/comentario'));

module.exports = Router;