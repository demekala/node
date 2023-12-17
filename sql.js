var sql = require("mssql");

var dbConfig = {
    server: "localhost\\SQLEXPRESS",
    database: "Softgen",
    user: "demetre",
    password: "demekala",
    port: 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true   // Accept self-signed certificates
    }
}

function getEmp(text) {
    var conn = new sql.ConnectionPool(dbConfig);
    var req = new sql.Request(conn);

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            conn.close();
            return;
        }

        req.query(text, function (err, recordset) {
            if (err) {
                console.log(err);
            } else {
                console.log(recordset);
            }
            conn.close();
        });
    });
}

module.exports = {
    getEmp: getEmp,
};