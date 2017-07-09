var queryhelper = {
    /**
     * Returns SQL query for getting list of tables in the database
     * @returns {String} SQL query string
     */
    getTableNamesQuery: function(schemaName) {
        return "SHOW TABLES IN " + schemaName;
    },

    /**
     * Returns SQL query for getting list of databases in a server
     */
    getDbNamesQuery: function() {
        return "SHOW DATABASES";
    }
}

export default queryhelper;