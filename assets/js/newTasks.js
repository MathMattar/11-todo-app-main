import { completeTask, updateTaskCount, excludeTask } from "./tools.js";

// Obtém o elemento da lista de tarefas do HTML e o elemento do campo de entrada do HTML
const list = document.getElementById("to-do-list");
const insertTask = document.getElementById("insert-task");

// Criar uma nova tarefa
export function newTask() {
  const taskText = insertTask.value;
  const toDo = JSON.parse(localStorage.getItem("toDoList")) || []; // Obtém a lista de tarefas armazenada no localStorage ou cria uma lista vazia

  let index = toDo.length;

  // Cria uma nova tarefa com o texto da entrada e um ID único
  const newTask = {
    id: index,
    toDo: taskText,
    completed: false,
  };
  // Adiciona a nova tarefa na lista de tarefas e atualiza o localStorage
  toDo.push(newTask);
  localStorage.setItem("toDoList", JSON.stringify(toDo));
  index++;

  renderToDoList();
}

// Renderizar a lista de tarefas
export function renderToDoList(filterOption = "all") {
  const toDo = JSON.parse(localStorage.getItem("toDoList")) || [];

  // Lista vazia para armazenas as tarefas filtradas
  let filteredToDo = [];

  // Filtrar as tarefas com base na opção de filtro selecionado
  if (filterOption === "all") {
    filteredToDo = toDo;
  } else if (filterOption === "active") {
    filteredToDo = toDo.filter((task) => !task.completed);
  } else if (filterOption === "completed") {
    filteredToDo = toDo.filter((task) => task.completed);
  }

  list.innerHTML = "";

  filteredToDo.forEach((task, index) => {
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
