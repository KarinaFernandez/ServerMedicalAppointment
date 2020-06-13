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

// OBTENER TODOS LOS USUARIOS (Acepta Doc Identidad)
Router.get('/usuarios', function (req, res) {
    let query = {};
    if(req.query.documento){
        query['documento'] = new RegExp(req.query.documento, "i");
    }
    Query = Usuario.find(query).sort('documento');
    Query.exec(function(error, usuarios){
        if(!error){
            res.json(usuario);
        }
    });
});

// ACTUALIZAR USUARIO
Router.put('/usuarios/:id', function (req, res) {
    const id = req.params.id;
    Usuario.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, function (err, usuario) {
        if (!err) {
            if (usuario) {
                usuario.pwd = undefined;
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