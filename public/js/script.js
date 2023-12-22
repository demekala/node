const groupNumberElement = document.getElementById("groupNumber");
const groupNameElement = document.getElementById("groupName");
const firstNameElement = document.getElementById("firstName");
const lastNameElement = document.getElementById("lastName");
const identityNumberElement = document.getElementById("identityNumber");
const birthDateElement = document.getElementById("birthDate");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const confirmPasswordElement = document.getElementById("confirmPassword");
const resetSubmitButtonsElement = document.getElementById("resetSubmitButtos");
const studentButtonElement = document.getElementById("studentButton");
const teacherButtonElement = document.getElementById("teacherButton");
const groupButtonElement = document.getElementById("groupButton");

function onStart() {
  if (window.location.pathname == "/signup") {
    groupNameElement.style.display = "none";
    groupNumberElement.style.display = "none";
    firstNameElement.style.display = "none";
    lastNameElement.style.display = "none";
    identityNumberElement.style.display = "none";
    birthDateElement.style.display = "none";
    emailElement.style.display = "none";
    passwordElement.style.display = "none";
    confirmPasswordElement.style.display = "none";
    resetSubmitButtonsElement.style.display = "none";
  }
}

function signUpStudent() {
  // Show relevant elements for student/teacher
  groupNameElement.style.display = "none";
  groupNumberElement.style.display = "none";
  firstNameElement.style.display = "flex";
  lastNameElement.style.display = "flex";
  identityNumberElement.style.display = "flex";
  birthDateElement.style.display = "flex";
  emailElement.style.display = "flex";
  passwordElement.style.display = "flex";
  confirmPasswordElement.style.display = "flex";
  resetSubmitButtonsElement.style.display = "flex";

  studentButtonElement.style.backgroundColor = "green";
  teacherButtonElement.style.backgroundColor = "white";
  groupButtonElement.style.backgroundColor = "white";
}
function signUpTeacher() {
  // Show relevant elements for student/teacher
  groupNameElement.style.display = "none";
  groupNumberElement.style.display = "none";
  firstNameElement.style.display = "flex";
  lastNameElement.style.display = "flex";
  identityNumberElement.style.display = "flex";
  birthDateElement.style.display = "flex";
  emailElement.style.display = "flex";
  passwordElement.style.display = "flex";
  confirmPasswordElement.style.display = "flex";
  resetSubmitButtonsElement.style.display = "flex";

  studentButtonElement.style.backgroundColor = "white";
  teacherButtonElement.style.backgroundColor = "green";
  groupButtonElement.style.backgroundColor = "white";
}
function signUpGroup() {
  // Show relevant elements for group
  groupNameElement.style.display = "flex";
  groupNumberElement.style.display = "flex";
  firstNameElement.style.display = "none";
  lastNameElement.style.display = "none";
  identityNumberElement.style.display = "none";
  birthDateElement.style.display = "none";
  emailElement.style.display = "none";
  passwordElement.style.display = "flex";
  confirmPasswordElement.style.display = "flex";
  resetSubmitButtonsElement.style.display = "flex";

  studentButtonElement.style.backgroundColor = "white";
  teacherButtonElement.style.backgroundColor = "white";
  groupButtonElement.style.backgroundColor = "green";
}

onStart();

function signUp() {}
