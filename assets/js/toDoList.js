let toDoList = [];

const formTask = document.getElementById("formTask");
const newTask = document.getElementById("newTask");
const list = document.getElementById("toDoList");

formTask.addEventListener("submit", (e) => {
  e.preventDefault();

  if (newTask.value === "") {
    e.preventDefault();
  } else {
    createTask();
    showTask();

    newTask.focus();
  }
});

function createTask() {
  newTaskValue = newTask.value;
  toDoList.push({ item: newTaskValue });
  newTask.value = "";
}

function showTask() {
  list.innerHTML = "";

  toDoList.forEach((e, i) => {
    list.innerHTML += `
    <li class="to-do__item" data-value="${i}">
        <input type="checkbox" class="to-do__button">
        <span class="to-do__task">${e.item}</span>
        <button type="button" class="to-do__delete"">
            <img src="./assets/images/icon-cross.svg" alt="Close icon" class="to-do__delete--icon">
        </button>
    </li>
    <hr>
    `;
  });
}

const buttonsCompleteTask = document.querySelectorAll(".to-do__button");
const task = document.querySelectorAll(".to-do__task");

buttonsCompleteTask.forEach((button) => {
  button.addEventListener("change", (e) => {});
});
