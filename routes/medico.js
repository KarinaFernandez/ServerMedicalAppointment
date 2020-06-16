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
            doc.contraseña = undefined;
            doc.especialidad = undefined;
            doc.comentarios = undefined;
            res.json(doc);
        }
    });
});

// OBTENER MEDICO por ID
Router.get('/medicos/:id', function (req, res) {
    const id = req.params.id;
    Query = Medico.findById(id)
    Query.exec(function (err, medico) {
        if (!err) {
            medico.contraseña = undefined
            res.json(medico);
        }
    });
});

// ACTUALIZAR MEDICO
Router.put('/medicos/:id', function (req, res, next) {
    const id = req.params.id;
    Medico.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, function (err, medico) {
        if (!err) {
            if (medico) {
                medico.contraseña = undefined
                res.json(medico)
            } else {
                next(new RestError('Medico no encontrado', 404));
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

// BUSCAR ESPECIALIDAD por nombre 
Router.get('/especialidades/medicos', function (req, res, next) {
    const nombre = req.query.nombre;
    Query = Medico.find({ 'especialidades.nombre': { $eq: nombre } }).sort({ puntuacion: 1 })

    Query.exec(function (err, medicos) {
        if (!err) {
            res.json(medicos);
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
});

// OBTENER COMENTARIOS DE UN MEDICO
Router.get('/comentarios/medicos', function (req, res, next) {
    const id = req.query.id;
    Query = Medico.findById(id).populate('comentarios')

    Query.exec(function (err, medico) {
        if (!err) {
            res.json(medico);
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
});

module.exports = Router;