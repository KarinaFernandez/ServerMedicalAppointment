
const express       = require('express');
const mongoose      = require('mongoose'); 
const RestError     = require('../rest-error');
const Router        = express.Router();

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const conn = mongoose.connection;

Router.post('/login/',function(req,res,next){
    const usr = req.body.usr;
    let  pwd = req.body.pwd;
    pwd = crypto.createHash('sha256').update(pwd).digest('hex');
    conn.db.collection('usuarios', function (err, collection) {
        collection.findOne({usr:usr, pwd:pwd}, function(err, doc){
            if(doc){
                const token = jwt.sign(doc.usr, process.env.TOKEN_SECRET);
                doc.pwd = undefined;
                doc.token = token;
                res.json({usr:doc});
            }
            else{
                next(new RestError('Usuario o Contraseña invalidos', 401));
            }
        });
    });
});
module.exports = Router;