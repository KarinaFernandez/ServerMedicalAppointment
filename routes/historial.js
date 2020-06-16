const express = require('express');
const mongoose = require('mongoose');
const RestError = require('../rest-error');
const Router = express.Router();

const Historial = mongoose.model('Historial', require('../schemas/historial'));

// OBTENER RESERVAS, NOTAS Y SINTOMAS DE UN USUARIO
Router.get('/historial/:id', function (req, res, next) {
    // const usuario = req.query.usuario;
    // Query = Reserva.find({ usuario: usuario })

    // Query.exec(function (error, reservas) {
    //     if (!error) {
    //         res.json(reservas);
    //     }
    // });
    const usuario = req.params.id;
    console.log(usuario);
    Query = Historial.find({ usuario: { $lt: usuario } })

    Query.exec(function (error, historial) {
        if (!error) {
            res.json(historial);
        }
    });
});

module.exports = Router;