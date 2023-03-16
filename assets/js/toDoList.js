import { getToDoList } from "./defaultTasks.js";
import { newTask, renderToDoList } from "./newTasks.js";
import { completeTask, clearCompleted, updateTaskCount } from "./tools.js";

const formTask = document.getElementById("form-task");
const insertTask = document.getElementById("insert-task");

// Enviar formulário contendo nova tarefa
formTask.addEventListener("submit", (e) => {
  e.preventDefault();

  // Impedir o envio de tarefas vazias
  if (insertTask.value === "") {
    e.preventDefault();
  } else {
    newTask();
    insertTask.focus();
    insertTask.value = "";
  }
});

getToDoList();
renderToDoList();
completeTask();
updateTaskCount();
clearCompleted();
