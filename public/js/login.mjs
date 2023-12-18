const identityNumberElement = document.getElementById("identityNumber");
const passwordElement = document.getElementById("password");
const identityGroupNumberElement = document.getElementById(
  "identityGroupNumber"
);
const studentButtonElement = document.getElementById("studentButton");
const teacherButtonElement = document.getElementById("teacherButton");
const groupButtonElement = document.getElementById("groupButton");
const reserSubmitElement = document.getElementById("reserSubmit");

const types = Object.freeze({
  none: 0,
  student: 1,
  teacher: 2,
  group: 3,
});

let user = types.none;

function start() {
  identityNumberElement.style.display = "none";
  passwordElement.style.display = "none";
  reserSubmitElement.style.display = "none";
}

function logInStudent() {
  identityNumberElement.style.display = "flex";
  passwordElement.style.display = "flex";
  identityGroupNumberElement.innerHTML = "identity number";
  reserSubmitElement.style.display = "flex";

  studentButtonElement.style.backgroundColor = "green";
  teacherButtonElement.style.backgroundColor = "white";
  groupButtonElement.style.backgroundColor = "white";

  user = types.student;
}

function logInTeacher() {
  identityNumberElement.style.display = "flex";
  passwordElement.style.display = "flex";
  identityGroupNumberElement.innerHTML = "identity number";
  reserSubmitElement.style.display = "flex";

  studentButtonElement.style.backgroundColor = "white";
  teacherButtonElement.style.backgroundColor = "green";
  groupButtonElement.style.backgroundColor = "white";

  user = types.teacher;
}

function logInGroup() {
  identityNumberElement.style.display = "flex";
  passwordElement.style.display = "flex";
  identityGroupNumberElement.innerHTML = "group number";
  reserSubmitElement.style.display = "flex";

  studentButtonElement.style.backgroundColor = "white";
  teacherButtonElement.style.backgroundColor = "white";
  groupButtonElement.style.backgroundColor = "green";

  user = types.group;
}

start();

import { getEmp } from "./../../sql";

async function logIn() {
  const number = document.getElementById("number").value;
  const password = document.getElementById("passwordInput").value;

  try {
    if (user == types.student) {
      const result = await getEmp("select * from students");
      console.log("Query Result:", result);
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
  }
}
