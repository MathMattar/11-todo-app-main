import createTask from "./newTask.js";

const formTask = document.getElementById("formTask");
const insertTask = document.getElementById("insertTask");

formTask.addEventListener("submit", (e) => {
  e.preventDefault();

  if (insertTask.value === "") {
    e.preventDefault();
  } else {
    createTask();
    insertTask.focus();
    insertTask.value = "";
  }
});
