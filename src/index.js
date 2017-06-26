import express from 'express';
import DataSource from './datasource';


export function getRouter(options) {
    var router = express.Router();
    var dataSource = new DataSource(options);

    router.get('/tables', function(req, res, next) {
        // Use options to connect
        dataSource.getTableNames(options.database).then( (tables) => {
            res.send(tables);
        }).catch((err) => {
            res.status(500);
            res.send(err);
        });

    });

    router.get(':schmea/tables', function(req, res, next) {
        
    })

    return router;
};

