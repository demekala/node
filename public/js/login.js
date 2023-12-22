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

// Add an event listener to the form
document.getElementById("signupForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Get the values of username and password
  const username = document.getElementById("identityNumber").value;
  const password = document.getElementById("password").value;

  // Call your function or perform any desired action
  console.log("Username:", username);
  console.log("Password:", password);

  // You can perform additional actions, like making an AJAX request to the server
  // or any other client-side logic here
});

start();
