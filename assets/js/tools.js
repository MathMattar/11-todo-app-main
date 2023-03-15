import { renderToDoList } from "./newTasks.js";

export function completeTask() {
  const completeButtons = document.querySelectorAll(".to-do__complete");

  completeButtons.forEach((completeButton) => {
    completeButton.addEventListener("change", (e) => {
      const index = completeButton.parentNode.getAttribute("data-value");
      const toDo = JSON.parse(localStorage.getItem("toDoList")) || [];
      const todoIndex = toDo.findIndex((todo) => todo.id === Number(index));

      if (todoIndex > -1) {
        const todo = toDo[todoIndex];
        todo.completed = completeButton.checked;
        toDo[todoIndex] = todo;
        localStorage.setItem("toDoList", JSON.stringify(toDo));
      }

      updateTaskCount();
    });
  });
}

export function excludeTask() {
  const deleteButtons = document.querySelectorAll(".to-do__delete");

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();

      const index = deleteButton.parentNode.getAttribute("data-value"); // pega o ID a partir do atributo data-value do pai
      const toDo = JSON.parse(localStorage.getItem("toDoList")) || [];
      const filterToDo = toDo.filter((task) => task.id != index);
      localStorage.setItem("toDoList", JSON.stringify(filterToDo));

      // atualiza o ID dos itens restantes no localStorage
      filterToDo.forEach((task, i) => {
        task.id = i;
      });

      localStorage.setItem("toDoList", JSON.stringify(filterToDo));

      renderToDoList();
    });
  });
}

export function clearCompleted() {
  const clearButton = document.getElementById("clear-complete");

  clearButton.addEventListener("click", () => {
    const toDo = JSON.parse(localStorage.getItem("toDoList")) || [];
    const completedTasks = toDo.filter((task) => task.completed);
    const incompleteTasks = toDo.filter((task) => !task.completed);

    localStorage.setItem("toDoList", JSON.stringify(incompleteTasks));

    renderToDoList();
    updateTaskCount();

    incompleteTasks.forEach((task, i) => {
      task.id = i;
    });

    localStorage.setItem("toDoList", JSON.stringify(incompleteTasks));
  });
}

export function updateTaskCount() {
  const taskCount = document.getElementById("task-count");

  const toDo = JSON.parse(localStorage.getItem("toDoList")) || [];
  const incompleteTasks = toDo.filter((task) => task.completed === false);

  taskCount.innerHTML = `${incompleteTasks.length} items left`;
}
