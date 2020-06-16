const express = require('express');
const mongoose = require('mongoose');
const RestError = require('../rest-error');
const Router = express.Router();

const Reserva = mongoose.model('Reserva', require('../schemas/reserva'));

// CREAR RESERVA
Router.post('/reservas', function (req, res, next) {
    Res = new Reserva(req.body);
    Res.save(function (err, reserva) {
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
            res.json(reserva);
        }
    });
});

// OBTENER RESERVA by ID
Router.get('/reservas/:id', function (req, res, next) {
    const id = req.params.id;

    Query = Reserva.findById(id);
    Query.exec(function (err, reserva) {
        if (!err) {
            res.json(reserva);
        } else {
            next(new RestError('recurso no encontrado', 404));
        }
    });
});

// AGREGAR NOTA A RESERVA
Router.post('/reservas/:id', function (req, res, next) {
    const id = req.params.id;
    Reserva.findByIdAndUpdate(id, { $push: req.body }, { new: true, runValidators: true }, function (err, reserva) {
        if (!err) {
            if (reserva) {
                Query = Reserva.findById(id).populate('notas')
                Query.exec(function (err, reserva) {
                    if (!err) {
                        res.json(reserva);
                    } else {
                        errors = {};
                        for (const key in err.errors) {
                            if (err.errors[key].constructor.name != 'ValidationError') {
                                errors[key] = err.errors[key].message;
                            }
                        }
                        next(new RestError(errors, 400));
                    }
                });
            } else {
                next(new RestError('Reserva no encontrada', 404));
            }
        } else {
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
        }
    });
});

// OBTENER RESERVAS POR FECHA DE NOTA
Router.get('/notas/reserva', function (req, res, next) {
    const fecha = req.query.fecha;
    Query = Reserva.find({ 'notas.fecha': { $lt: fecha } })

    Query.exec(function (error, reservas) {
        if (!error) {
            res.json(reservas);
        }
    });
});

module.exports = Router;