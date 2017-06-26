import mysql from 'promise-mysql';
import queryhelper from './queryhelper';

export default class DataSource {
    constructor(config) {
        this.config = config;
    }

    _createConnection() {
        // Create connection with the db
        
        return new Promise((resolve, reject) => {
            if(!this._connection) {
                mysql.createConnection(this.config).then((conn) => {
                    this._connection = conn;
                }).catch((err) => {
                    console.log("faield to connect to " + this.config.host);
                    reject("Connection failure");
                });
            }
            else {
                resolve();
            }
        });       
    }

    /**
     * Returns a promise to give names of the tables present in the given schema
     * @returns {Promise} A Promise to give list of tables in the schema
     */
    getTableNames(schemaName) {
        return this._createConnection().then(() => {
            var query = queryhelper.getTableNamesQuery(schemaName);
            return this._connection.query(query).then( (tables) => {
                // process result here, store in array and return the array.
                var tableNames = [];
                for(let table of tables) {
                    tableNames.push(table['Tables_in_myschema']);
                }
                return tableNames;
            });
        });
    }
}