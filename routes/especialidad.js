const express = require('express');
const mongoose = require('mongoose');
const RestError = require('../rest-error');
const Router = express.Router();

const Especialidad = mongoose.model('Especialidad', require('../schemas/especialidad'));

// ALTA DE ESPECIALIDAD
Router.post('/especialidades', function (req, res, next) {
    Esp = new Especialidad(req.body);
    Esp.save(function (err, especialidad) {
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
            res.json(especialidad);
        }
    });
});
 
module.exports = Router;