// Imports
const express = require("express");
const sql = require("./sql");
const app = express();
const port = 3000;

let logged = Boolean(false);
let access = "none";

let studentsData;
let teachersData;
let groupsData;

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
  res.render("index", { logged: logged, access: access });
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/database", (req, res) => {
  if (!logged) {
    console.log("cannot access database: not logged");
    return res.redirect("http://localhost:3000/");
  }
  sql.getEmp("select * from students", (students) => {
    if (studentsData == null) studentsData = students;

    // Fetch teacher data, assuming "teachers" is the correct table name
    sql.getEmp("select * from teachers", (teachers) => {
      if (teachersData == null) teachersData = teachers;

      sql.getEmp("select * from groups", (groups) => {
        if (groupsData == null) groupsData = groups;

        res.render("database", {
          studentsData: studentsData,
          teachersData: teachersData,
          groupsData: groupsData,
        });
      });
    });
  });
});

app.get("/deleter", (req, res) => {
  if (!logged) {
    console.log("cannot access deleter tab: not logged");
    return res.redirect("http://localhost:3000/");
  }
  res.render("deleter");
});

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.post("/submitForm", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("Email:", email);
  console.log("Password:", password);

  // Check in students
  sql.getEmp(`select pass from Students where email = '${email}'`, (result) => {
    if (result.length > 0 && result[0].pass === password) {
      logged = true;
      access = "student";
      return res.redirect("http://localhost:3000/");
    }

    // If not found in Students, check in teachers
    sql.getEmp(
      `select pass from teachers where email = '${email}'`,
      (result) => {
        if (result.length > 0 && result[0].pass === password) {
          logged = true;
          access = "teacher";
          return res.redirect("http://localhost:3000/");
        }

        // If not found in Students or teachers, check in groups
        sql.getEmp(
          `select pass from groups where GroupName = '${email}'`,
          (result) => {
            if (result.length > 0 && result[0].pass === password) {
              logged = true;
              access = "group";
              return res.redirect("http://localhost:3000/");
            }

            // If not found in Students, teachers, or groups, set logged to false
            logged = false;
            // Handle any other logic or response here if needed
            res.send("Invalid email or password");
          }
        );
      }
    );
  });
});

app.post("/signUpStudentForm", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const identityNumber = req.body.identityNumber;
  const birthDate = req.body.birthDate;
  const mail = req.body.mail;
  const password = req.body.password;

  console.log(
    `name: ${name}\nsurname: ${surname}\nidentity number: ${identityNumber}\nbirth date: ${birthDate}\n mail: ${mail}, password: ${password} `
  );

  sql.addStudentTeacherToTable(
    "students",
    name,
    surname,
    identityNumber,
    birthDate,
    mail,
    password
  );
});

app.post("/signUpTeacherForm", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const identityNumber = req.body.identityNumber;
  const birthDate = req.body.birthDate;
  const mail = req.body.mail;
  const password = req.body.password;

  console.log(
    `name: ${name}\nsurname: ${surname}\nidentity number: ${identityNumber}\nbirth date: ${birthDate}\n mail: ${mail}, password: ${password} `
  );

  sql.addStudentTeacherToTable(
    "teachers",
    name,
    surname,
    identityNumber,
    birthDate,
    mail,
    password
  );
});

app.post("/signUpGroupForm", (req, res) => {
  const groupName = req.body.groupName;
  const groupNumber = req.body.groupNumber;
  const password = req.body.password;

  console.log(
    `group name: ${groupName}\ngroup number: ${groupNumber}\npassword: ${password}`
  );

  sql.addGroupToTable(groupName, groupNumber, password);
});

app.post("/searchWithName", (req, res) => {
  const name = req.body.name;
  sql.getEmp(
    `select * from students where firstname = '${name}'`,
    (students) => {
      studentsData = students;

      sql.getEmp(
        `select * from teachers where firstname = '${name}'`,
        (teachers) => {
          teachersData = teachers;
          groupsData = 0;
          res.redirect("http://localhost:3000/database");
        }
      );
    }
  );
});

app.post("/searchWithSurname", (req, res) => {
  const surname = req.body.surname;

  sql.getEmp(
    `select * from students where lastname = '${surname}'`,
    (students) => {
      studentsData = students;

      sql.getEmp(
        `select * from teachers where lastname = '${surname}'`,
        (teachers) => {
          teachersData = teachers;
          groupsData = 0;
          res.redirect("http://localhost:3000/database");
        }
      );
    }
  );
});

app.post("/searchWithIdentityNumber", (req, res) => {
  const identityNumber = req.body.identityNumber;

  sql.getEmp(
    `select * from students where identitynumber = '${identityNumber}'`,
    (students) => {
      studentsData = students;

      sql.getEmp(
        `select * from teachers where identitynumber = '${identityNumber}'`,
        (teachers) => {
          teachersData = teachers;
          groupsData = 0;
          res.redirect("http://localhost:3000/database");
        }
      );
    }
  );
});

app.post("/searchWithBirthDate", (req, res) => {
  const birthDate = req.body.birthDate;

  sql.getEmp(
    `select * from students where birthdate = '${birthDate}'`,
    (students) => {
      studentsData = students;

      sql.getEmp(
        `select * from teachers where birthdate = '${birthDate}'`,
        (teachers) => {
          teachersData = teachers;
          groupsData = 0;
          res.redirect("http://localhost:3000/database");
        }
      );
    }
  );
});

app.post("/searchWithGroupName", (req, res) => {
  const groupName = req.body.groupName;

  sql.getEmp(
    `select * from Groups where GroupName = '${groupName}'`,
    (groups) => {
      studentsData = 0;
      teachersData = 0;
      groupsData = groups;
      res.redirect("http://localhost:3000/database");
    }
  );
});

app.post("/searchWithGroupNumber", (req, res) => {
  const groupNumber = req.body.groupNumber;

  sql.getEmp(
    `select * from Groups where groupNumber = '${groupNumber}'`,
    (groups) => {
      studentsData = 0;
      teachersData = 0;
      groupsData = groups;
      res.redirect("http://localhost:3000/database");
    }
  );
});

app.post("/delete", (req, res) => {
  const number = req.body.num;

  sql.getEmp(
    `DELETE FROM students WHERE identityNumber='${number}'`,
    (deleted) => {
      console.log("attempted delete from students");
    }
  );
  sql.getEmp(
    `DELETE FROM teachers WHERE identityNumber='${number}'`,
    (deleted) => {
      console.log("attempted delete from teachers");
    }
  );
  sql.getEmp(`DELETE FROM groups WHERE groupnumber='${number}'`, (deleted) => {
    console.log("attempted delete groups");
  });

  res.redirect("http://localhost:3000/deleter");
});

app.post("/resetDatabase", (req, res) => {
  sql.getEmp("select * from students", (students) => {
    studentsData = students;

    // Fetch teacher data, assuming "teachers" is the correct table name
    sql.getEmp("select * from teachers", (teachers) => {
      teachersData = teachers;

      sql.getEmp("select * from groups", (groups) => {
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

app.listen(port, () => console.info(`App listening on port ${port}`));

// const demetrename = "Demetre";

// sql.getEmp(
//   `select pass from Students where FirstName = '${demetrename}'`,
//   (result) => {
//     console.log(result); // Handle the results of the query here
//   }
// );
