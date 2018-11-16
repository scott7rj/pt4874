'use strict'

var request = require('request');

var login = function login(cb){
    request('https://apex.oracle.com/pls/apex/www/ws/login',function(error,response,body){
        cb(error,response,body);
    });
}

var getUsers = function getUsers(cb){
    request('https://apex.oracle.com/pls/apex/www/ws/usuarios',function(error,response,body){
        cb(error,response,body);
    });
}

var getCargos = function getCargos(cb){
    request('https://apex.oracle.com/pls/apex/www/ws/cargos',function(error,response,body){
        cb(error,response,body);
    });
}
var getCargo = function getCargo(id,cb){
    request('https://apex.oracle.com/pls/apex/www/ws/cargos/'+id,function(error,response,body){
        cb(error,response,body);
    });
}
var getUfs = function getUfs(cb){
    request('https://apex.oracle.com/pls/apex/www/ws/uf',function(error,response,body){
        cb(error,response,body);
    });
}
var getUf = function getUf(id,cb){
    request('https://apex.oracle.com/pls/apex/www/ws/uf/'+id,function(error,response,body){
        cb(error,response,body);
    });
}
var getNacionalidades = function getNacionalidades(cb){
    request('https://apex.oracle.com/pls/apex/www/ws/nacionalidades',function(error,response,body){
        cb(error,response,body);
    });
}

var getNacionalidade = function getNacionalidade(id,cb){
    request('https://apex.oracle.com/pls/apex/www/ws/nacionalidades/'+id,function(error,response,body){
        cb(error,response,body);
    });
}

var getCandidatos = function getCandidatos(cb){
    request('https://apex.oracle.com/pls/apex/www/ws/candidatos',function(error,response,body){
        cb(error,response,body);
    });
}

var serviceObject = {
    "getUfs":getUfs,
    "getUf":getUf,
    "getNacionalidades":getNacionalidades,
    "getNacionalidade":getNacionalidade,
    "login":login,
    "getUsers":getUsers,
    "getCargos":getCargos,
    "getCargo":getCargo,
    "getCandidatos":getCandidatos
}


module.exports = serviceObject