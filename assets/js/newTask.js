// Cria o elemento <li>, <checkbox>, <span> e <button> necessarios para nova task.
export function createTask() {
  const insertTask = document.getElementById("insertTask").value;
  const list = document.getElementById("toDoList");

  const toDoItem = document.createElement("li");
  toDoItem.classList.add("to-do__item");
  toDoItem.setAttribute("data-value", toDoList.length); // Adiciona data-attribute a todos elemento <li> criados

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

  // Adiciona os elementos criados à matriz toDoList
  const toDo = { item: insertTask, completed: false };

  toDoList.push(toDo);

  // Remove os elementos excluidos da matriz toDoList
  toDoDelete.addEventListener("click", () => {
    list.removeChild(toDoItem);
    list.removeChild(hr);
    toDoList.splice(toDoList.indexOf(toDo), 1); // Remove o elemento de acordo com o indice da matriz

    // Atualiza os data-attributes dos elementos após exclusão
    const remainingTasks = document.querySelectorAll(
      ".to-do__item[data-value]"
    );

    remainingTasks.forEach((task) => {
      const taskValue = parseInt(task.getAttribute("data-value"));

      if (taskValue > toDoItem.getAttribute("data-value")) {
        task.setAttribute("data-value", taskValue - 1);
      }
    });

    updateTaskCount(); // Atualiza a contagem de elementos
  });

  // Adiciona um evento de mudança ao checkbox para modificar o estado da tarefa e atualizar a contagem de tarefas
  toDoComplete.addEventListener("change", () => {
    const index = parseInt(toDoItem.getAttribute("data-value"));

    toDoList[index].completed = toDoComplete.checked;
    updateTaskCount(); // Atualiza a contagem de elementos
  });

  updateTaskCount(); // Atualiza a contagem de elementos
}

export const toDoList = [];

// Contagem dos elementos
export function updateTaskCount() {
  const taskCount = toDoList.length;
  const completedCount = toDoList.filter((task) => task.completed).length; // Filtra a lista de tarefas para contar quantas estão concluídas
  const remainingCount = taskCount - completedCount;
  const taskCountElement = document.getElementById("taskCount");

  taskCountElement.textContent = `${remainingCount} tasks left`;
}
