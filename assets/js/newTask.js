export default function createTask() {
  const insertTask = document.getElementById("insertTask").value;
  const list = document.getElementById("toDoList");

  const toDoItem = document.createElement("li");
  toDoItem.classList.add("to-do__item");
  toDoItem.setAttribute("data-value", toDoList.length);

  const toDoComplete = document.createElement("input");
  toDoComplete.type = "checkbox";
  toDoComplete.classList.add("to-do__complete");
  toDoItem.appendChild(toDoComplete);

  const task = document.createElement("span");
  task.classList.add("to-do__task");
  task.textContent = insertTask;
  toDoItem.appendChild(task);

  const toDoDelete = document.createElement("button");
  toDoDelete.type = "button";
  toDoDelete.classList.add("to-do__delete");
  toDoDelete.innerHTML = `<img src="./assets/images/icon-cross.svg" alt="Close icon" class="to-do__delete--icon">`;
  toDoItem.appendChild(toDoDelete);

  const hr = document.createElement("hr");
  list.appendChild(toDoItem);
  list.appendChild(hr);

  // adiciona a nova tarefa à matriz de tarefas
  const toDo = { item: insertTask, completed: false };
  toDoList.push(toDo);
}

const toDoItem = document.querySelectorAll(".to-do__item");

const toDoList = [];

toDoItem.forEach((item) => {
  const toDo = {
    item: item.querySelector(".to-do__task").textContent,
    completed: item.querySelector(".to-do__complete").checked,
  };

  toDoList.push(toDo);
});
