# Use My-Sql over REST

This npm package provides a express router which can be used to access your mysql server using rest apis.

### How to use

Suppose for your nodejs server you want to access your mysql database from the url `/mysqlserver`, you can use this package as follows

```javascript
var mysqlrest = require("mysql-rest");

var configOptions = {
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'password'
};
var router = mysqlrest.getRouter(configOptions);

app.use('/mysqlserver', router);
```
Under the hood, it uses [mysql](https://www.npmjs.com/package/mysql) package, so all the options accepted by `mysql' package are acceptable.
More details about the configuration options can be found [here](https://www.npmjs.com/package/mysql#connection-options).

## Routes

Assuming that you have set `/mysqlserver` as the root for your sql server and your mysql server has following databases
1. db1
1. db2
1. db3

The database `db1` has following tables
1. table1
1. table2

`table1` has following columns


| Column Name   | Type |
| ------------- | ------------- |
| id            | INTEGER  |
| name          |   VARCHAR(100) |
| dob           |   DATE         |


Following paths under `/mysqlserver`  are made available by this package.
### Databases

| Function   | Url | MethodType | Sample output
| ------------- | ------------- |------| ------|
| List all the databases present in the mysql server            | `/dbs`  | GET | `["db1", "db2", "db3"]`

### Tables
| Function   | Url | MethodType | Sample output
| ------------- | ------------- |------| ------|
| List all the tables present in a database            | `/dbs/{databaseName}`  | GET | `["table1", "table2"]`|
| List columns in a given table | `/dbs/{databaseName}/{tableName}/columns` | GET | `[{"name": "id", "type": "INTEGER"},{"name": "name", "type": "VARCHAR(100)"}, {"name": "dob", "type": "DATE"}]`|

### Data in a table

| Function   | Url | MethodType | Input | Output
| ------------- | ------------- |------| ------| -------|
| Read all the records from a table            | `/dbs/{databaseName}/{tableName}/records`  | GET | - |Array containing rows present in the table |
| Read records with criterion | `/dbs/{databaseName}/{tableName}/records/query` | POST | JSON object with key value pairs for columns in the table. The keys (and values) in this object will be used to form the matching criterion | Array of rows in the table matching the given criterion
|Create a record | `/dbs/{databaseName}/{tableName}/records` | POST | JSON object with key value pairs for columns in the table | -
|Delete a record | `/dbs/{databaseName}/{tableName}/records` | POST | JSON object with key value pairs for columns in the table. The keys (and values) in this object will be used to form the matching criterion | -|

### Generic query
Apart from the paths above, there is a path available `'/query'`, which can be used to execute a given sql query. You need to send a `POST` request to `'/query'` with the SQL query in the request body. The output of the operation is returned in form of JSON.
