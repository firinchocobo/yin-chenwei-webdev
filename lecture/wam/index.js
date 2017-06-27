// console.log('hello from wam');
module.exports = function (application) {

    var app = require('../../express');

    app.get('/wam/index.html', indexHtml);
    app.get('/wam/app.js', appJs);
    app.get('/wam/config.js', configJs);
    app.get('/wam/:entityName/templates/:type/:templateHtmlFileName', templateHtml);
    app.get('/wam/:entityName/controllers/:type/:ControllerFileName', controllerJs);
    //if dont care, use *
    app.get('/wam/:entityName/services/*', serviceJs);

    app.get('/wam/api/:entityName', findAll);
    app.post('/wam/api/:entityName', create);

    var model = require('./model');


    function create(req, res) {
        var entityName = req.params.entityName;
        model
            .create(entityName)
            .then(function (status) {
                res.sendStatus(200);
            });
    }

    function findAll(req, res) {
        var entityName = req.params.entityName;
        model
            .findAll(entityName)
            .then(function (data) {
                res.json(data);
            });
        // res.json([
        //     {name: entityName+'123', title: entityName+'123'},
        //     {name: entityName+'124', title: entityName+'124'},
        //     {name: entityName+'125', title: entityName+'125'},
        //     {name: entityName+'126', title: entityName+'126'}
        // ]);
    }

    function serviceJs(req, res) {
        var entityName = req.params.entityName;
        application.entityName = entityName;
        res.render('lecture/wam/services/serviceJs.ejs', application);
    }

    function controllerJs(req, res) {
        var entityName = req.params.entityName;
        var type = req.params.type;
        application.entityName = entityName;
        res.render('lecture/wam/controllers/'+type+'Js.ejs', application);
    }

    function templateHtml(req, res) {
        var entityName = req.params.entityName;
        var type = req.params.type;
        application.entityName = entityName;
        res.render('lecture/wam/templates/'+type+'Html.ejs', application);
    }

    function configJs(req, res) {
        res.render('../views/lecture/wam/config.ejs', application);
    }

    function appJs(req, res) {
        res.render('../views/lecture/wam/app.ejs', application);
    }

    function indexHtml(req, res) {
        res.render('../views/lecture/wam/index.ejs', application);
    }
};
