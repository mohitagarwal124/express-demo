var mysql = require('mysql');

var db_config = {
    host: config.get('dbSetting.sql.host'),
    user: config.get('dbSetting.sql.user'),
    password: config.get('dbSetting.sql.password'),
    database: config.get('dbSetting.sql.database'),
    multipleStatements: true
};

function handleConnection() {
    connection = mysql.createConnection(db_config);

    connection.connect(function(err) { // The server is either down
        if (err) { // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleConnection, 2000); // We introduce a delay before attempting to reconnect,
        } else {
            console.log('connection created');
        } // to avoid a hot loop, and to allow our node script to
    }); // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleConnection(); // lost due to either server restart, or a
        } else { // connnection idle timeout (the wait_timeout
            throw err; // server variable configures this)
        }
    });
}

handleConnection();