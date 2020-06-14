const express = require('express');
const mongoose = require('mongoose');
const RestError = require('../rest-error');
const Router = express.Router();

const Sintoma = mongoose.model('Sintoma', require('../schemas/sintoma'));

// ALTA DE SINTOMA
Router.post('/sintomas', function (req, res, next) {
    Sin = new Sintoma(req.body);
    Sin.save(function (err, sintoma) {
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
            res.json(sintoma);
        }
    });
});

module.exports = Router;