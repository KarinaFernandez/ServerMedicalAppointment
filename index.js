const express   = require('express');
const app       = express();
const mongoose = require('mongoose'); 
const RestError = require('./rest-error');

const usuario      = require('./routes/usuario');
const login      = require('./routes/login');
const medico      = require('./routes/medico');
const comentario      = require('./routes/comentario');
const reserva      = require('./routes/reserva');
const sintoma      = require('./routes/sintoma');
const especialidad      = require('./routes/especialidad');
const jwt          = require('jsonwebtoken');

// require('dotenv').config(); 

// const authorize = function(req, res, next){
//     if ('/login' == req.path){
//         next();
//         return;
//     }
//     const authHeader    = req.headers['authorization'];

//     if(!authHeader){
//         next(new RestError('Login requerido para continuar', 401));
//         return;
//     }
//     const token = authHeader.split(' ')[1];

//     if(!token){
//         next(new RestError('Requiere esta logueado para para continuar', 401));
//         return;
//     }
    
//     jwt.verify(token, process.env.TOKEN_SECRET, function(err, email){
//         if(err){
//             next(new RestError(err.message, 401));
//             return;
//         }
//         req.user = email;
//         next();
//     });
// }

// Conectar a DB local
const uri = 'mongodb://localhost:27017/db';
const options = {useUnifiedTopology:true,useNewUrlParser:true};
mongoose.connect(uri,options); 

// const uri = process.env.MONGODB_URI;
// const options = {useNewUrlParser:true, useUnifiedTopology: true}; 

//Evento
mongoose.connect(uri, options).catch(error => {
    console.log('Hubo un error de conexión', error.message);
}); 

const conn = mongoose.connection;
//Error de conexion
mongoose.connection.on('error', error => {
    console.log('Hubo un error de conexión', error.message);
}); 

app.use(express.json());
//app.use(authorize);
app.use(usuario);
app.use(login);
app.use(medico);
app.use(comentario);
app.use(reserva);
app.use(sintoma);
app.use(especialidad);

app.use((err,req,res,next) => {
    res.status(err instanceof RestError? err.status: 500);
    res.json({error:err.message});
});

// process.env.PORT
app.listen(3000, function(){
    console.log(`Escuchando puerto ${process.env.PORT}`);
});