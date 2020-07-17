const express = require('express');
const mongoose = require('mongoose');
const RestError = require('../rest-error');
const Router = express.Router();

const Medico = require('../schemas/medico');

// CREAR MEDICO
Router.post('/medicos', function (req, res, next) {
    Medi = new Medico(req.body);

    Medi.save(function (err, doc) {
        if (err) {
            if (err.code == 11000) {
                next(new RestError(err.message, 409));
            } else {
                errors = {};
                for (const key in err.errors) {
                    if (err.errors[key].constructor.name != 'ValidationError') {
                        errors[key] = err.errors[key].message;
                    }
                }
                next(new RestError(errors, 400));
            }
        } else {
            doc.pwd = undefined; 
            res.json(doc);
        }
    });
});

module.exports = Router;