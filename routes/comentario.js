const express   = require('express');
const mongoose  = require('mongoose'); 
const RestError = require('../rest-error');
const Router     = express.Router();

const Comentario = mongoose.model('Comentario', require('../schemas/comentario'));

// ALTA DE COMENTARIO
Router.post('/comentarios', function (req, res, next) {
    Com = new Comentario(req.body);
    Com.save(function (err, comentario) {
        if (err) {
            if (err.code == 11000) {
                next(new RestError(err.message, 409));
            } else {
                errors = {};
                for (const key in err.errors) {
                    if (err.errors[key].constructor.name != 'ValidationError') {
                        errors[key] = err.errors[key].message;
                    }
                }
                next(new RestError(errors, 400));
            }
        } else {
            res.json(comentario);
        }
    });
});

module.exports = Router;