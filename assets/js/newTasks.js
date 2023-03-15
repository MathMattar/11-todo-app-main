import { completeTask, updateTaskCount, excludeTask } from "./tools.js";

const list = document.getElementById("to-do-list");
const insertTask = document.getElementById("insert-task");

export function newTask() {
  const taskText = insertTask.value;
  const toDo = JSON.parse(localStorage.getItem("toDoList")) || [];

  let index = toDo.length;

  const newTask = {
    id: index,
    toDo: taskText,
    completed: false,
  };

  toDo.push(newTask);
  localStorage.setItem("toDoList", JSON.stringify(toDo));
  index++;

  renderToDoList();
}

export function renderToDoList() {
  const toDo = JSON.parse(localStorage.getItem("toDoList")) || [];

  list.innerHTML = "";

  toDo.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("to-do__item");
    taskItem.setAttribute("data-value", index);

    taskItem.innerHTML = `
    <input type="checkbox" class="to-do__complete" ${
      task.completed ? "checked" : ""
    }>
    <span class="to-do__task">${task.toDo}</span>
    <button type="button" class="to-do__delete">
        <img src="./assets/images/icon-cross.svg" alt="Close icon" class="to-do__delete--icon">
    </button>`;

    list.appendChild(taskItem);
  });

  excludeTask();
  completeTask();
  updateTaskCount();
}