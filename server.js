// Imports
const express = require("express");
const sql = require("./sql");
const app = express();
const port = 3000;

let name;

// Set up static file serving
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/img", express.static(__dirname + "/public/images"));

// Set Views
app.set("views", "./views");
app.set("view engine", "ejs");

// Define routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/database", (req, res) => {
  let studentsData;
  let teachersData;
  let groupsData;
  sql.getEmp("*", "students", (students) => {
    studentsData = students;

    // Fetch teacher data, assuming "teachers" is the correct table name
    sql.getEmp("*", "teachers", (teachers) => {
      teachersData = teachers;

      sql.getEmp("*", "groups", (groups) => {
        groupsData = groups;

        res.render("database", {
          studentsData: studentsData,
          teachersData: teachersData,
          groupsData: groupsData,
        });
      });
    });
  });
});

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.info(`App listening on port ${port}`));

module.exports = {
  name: name,
};
