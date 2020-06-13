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
    // const usuario = usuarios.find(usuario => usuario.id == id);
    // if (!usuario) {
    //     throw new RestError('Recurso no encontado', 404);
    // }
    // res.json(usuario);
    Query = Usuario.findById(id);
    Query.exec(function (err, libro) {
        if (!err) {
            res.json(usuario);
        }
    });
});

module.exports = Router;