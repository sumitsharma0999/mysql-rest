import express from 'express';
import DataSource from './datasource';


export function getRouter(options) {
    var router = express.Router();
    var dataSource = new DataSource(options);

    router.get('/dbs', function(req, res, next) {
        // Use options to connect
        dataSource.getDbNames(options.database).then( (dbNames) => {
            res.send(dbNames);
        }).catch((err) => {
            res.status(500);
            res.send(err);
        });

    });

    router.get(':schmea/tables', function(req, res, next) {
        
    })

    return router;
};

