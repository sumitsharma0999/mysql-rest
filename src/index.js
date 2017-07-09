import express from 'express';
import DataSource from './datasource';


export function getRouter(options) {
    var router = express.Router();
    var dataSource = new DataSource(options);

    var handleError = (err, res, status=500) => {
        res.status(status);
        res.send(err);
    };

    router.get('/dbs', function(req, res, next) {
        // Use options to connect
        dataSource.getDbNames().then( (dbNames) => {
            res.send(dbNames);
        }).catch((err) => {
            handleError(err, res);
        });

    });

    router.get('/dbs/:dbName', function(req, res, next) {
        var dbName = req.params.dbName;
        if(dbName) {
            // Use options to connect
            dataSource.getTableNames(dbName).then( (dbNames) => {
                res.send(dbNames);
            }).catch((err) => {
                handleError(err, res);
            });
        }
        else {
            handleError("Database name should be specified", res, 400);
        }
    })

    return router;
};

