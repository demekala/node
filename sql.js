var sql = require("mssql");

var dbConfig = {
  server: "localhost\\SQLEXPRESS",
  database: "Softgen",
  user: "demetre",
  password: "demekala",
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true, // Accept self-signed certificates
  },
};

function getEmp(sqlcode, callback) {
  var conn = new sql.ConnectionPool(dbConfig);
  var req = new sql.Request(conn);

  conn.connect(function (err) {
    if (err) {
      console.log(err);
      conn.close();
      return;
    }

    req.query(sqlcode, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // Access the recordset property and iterate through its elements
        callback(result.recordset);
      }
      conn.close();
    });
  });
}

function addStudentTeacherToTable(
  table,
  FirstName,
  LastName,
  IdentityNumber,
  BirthDate,
  Email,
  Pass
) {
  const conn = new sql.ConnectionPool(dbConfig);
  const req = new sql.Request(conn);

  const insertQuery = `
      INSERT INTO ${table}
      (FirstName, LastName, IdentityNumber, BirthDate, Email, Pass)
      VALUES (@FirstName, @LastName, @IdentityNumber, @BirthDate, @Email, @Pass)
    `;

  req.input("FirstName", sql.VarChar, FirstName);
  req.input("LastName", sql.VarChar, LastName); // Assuming these are string values
  req.input("IdentityNumber", sql.VarChar, IdentityNumber); // Assuming these are string values
  req.input("BirthDate", sql.Date, BirthDate); // Assuming this is a date value
  req.input("Email", sql.VarChar, Email); // Assuming this is a string value
  req.input("Pass", sql.VarChar, Pass); // Assuming this is a string value

  conn.connect((err) => {
    if (err) {
      console.log(err);
      conn.close();
      return;
    }

    req.query(insertQuery, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Record added successfully:", results.rowsAffected);
      }
      conn.close();
    });
  });
}

function addGroupToTable(GroupName, GroupNumber, Pass) {
  const conn = new sql.ConnectionPool(dbConfig);
  const req = new sql.Request(conn);

  const insertQuery = `
        INSERT INTO Groups
        (GroupName, GroupNumber, Pass)
        VALUES (@GroupName, @GroupNumber, @Pass)
      `;

  req.input("GroupName", sql.NVarChar, GroupName); // Assuming GroupName is a string
  req.input("GroupNumber", sql.Int, GroupNumber); // Assuming GroupNumber is an integer
  req.input("Pass", sql.NVarChar, Pass); // Assuming Pass is a string

  conn.connect((err) => {
    if (err) {
      console.log(err);
      conn.close();
      return;
    }

    req.query(insertQuery, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Record added successfully:", results.rowsAffected);
      }
      conn.close();
    });
  });
}

module.exports = {
  getEmp: getEmp,
  addStudentTeacherToTable: addStudentTeacherToTable,
  addGroupToTable: addGroupToTable,
};
