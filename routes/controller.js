'use strict'

var service = require('./service');

module.exports = function(app,express){

    app.get('/login/:login/:pwd', function(req,res){
        var result = service.login(function(err,response,data){
            if (!err){
                res.send(data);
            }
        });
    });
    app.get('/cargos', function(req,res){
        var service = require('./service');
        var result = service.getCargos(function(err,response,data){
            if (!err){
                res.send(data);
            }
        });
    });
    app.get('/cargos:id', function(req,res){
        var service = require('./service');
        var result = service.getCargo(req.params.id,function(err,response,data){
            if (!err){
                res.send(data);
            }
        });
    });
    app.get('/uf', function(req,res){
        var service = require('./service');
        var result = service.getUfs(function(err,response,data){
            if (!err){
                res.send(data);
            }
        });
    });
    app.get('/uf:id', function(req,res){
        var service = require('./service');
        var result = service.getUfs(req.params.id,function(err,response,data){
            if (!err){
                res.send(data);
            }
        });
    });
    app.get('/nacionalidades', function(req,res){
        var service = require('./service');
        var result = service.getNacionalidades(function(err,response,data){
            if (!err){
                res.send(data);
            }
        });
    });
    app.get('/nacionalidade/:id', function(req,res){
        var service = require('./service');
        var result = service.getNacionalidade(req.params.id,function(err,response,data){
            if (!err){
                res.send(data);
            }
        });
    });
    
    app.get('/candidatos', function(req,res){
        var service = require('./service');
        var result = service.getCandidatos(function(err,response,data){
            if (!err){
                res.send(data);
            }
        });
    });


    return app;
}