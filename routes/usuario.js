const express = require('express');
const mongoose = require('mongoose');
const RestError = require('../rest-error');
const Router = express.Router();

const Usuario = require('../schemas/usuario');

// CREAR USUARIO
Router.post('/usuarios', function (req, res, next) {
    Usr = new Usuario(req.body);

    Usr.save(function (err, doc) {
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
            doc.pwd = undefined;
            res.json(doc);
        }
    });
});

// OBTENER USUARIOS
Router.get('/usuarios', function (req, res) {
    res.json([]);
    res.status(200);
});

// OBTENER USUARIO POR ID
Router.get('/usuarios/:id', function (req, res) {
    const id = req.params.id;
    //new:true para devolver documento modificado.
    //runValidators:true para ejecutar validaciones, otra forma primero find documento, setear parametros y luego save(validators).
    Persona.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, function (err, usuario) {
        if (!err) {
            if (usuario) {
                res.json(usuario)
            } else {
                next(new RestError('recurso no encontrado', 404));
            }
        } else {
            errors = {};
            for (const key in err.errors) {
                errors[key] = err.errors[key].message;
            }
            next(new RestError(errors, 400));
        }
    });
});

module.exports = Router;