const express = require('express');
const mongoose = require('mongoose');
const RestError = require('../rest-error');
const Router = express.Router();

const Reserva = require('../schemas/reserva');

// CREAR RESERVA
Router.post('/reservas', function (req, res, next) {
    Res = new Reserva(req.body);

    Res.save(function (err, reserva) {
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
            res.json(reserva);
        }
    });
});

module.exports = Router;