import { getToDoList } from "./defaultTasks.js";
import { renderToDoList } from "./newTasks.js";

// Completar a tarefa
export function completeTask() {
  const completeButtons = document.querySelectorAll(".to-do__complete");

  completeButtons.forEach((completeButton) => {
    completeButton.addEventListener("change", (e) => {
      const index = completeButton.parentNode.getAttribute("data-value"); // Obtém o ID da tarefa a partir do atributo data-value do pai do botão
      const toDo = JSON.parse(localStorage.getItem("toDoList")) || []; // Obtém a lista de tarefas armazenada no localStorage ou cria uma lista vazia
      const todoIndex = toDo.findIndex((todo) => todo.id === Number(index)); // Encontra o índice da tarefa a partir do ID

      // Se a tarefa existe no array, atualiza o status
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

// Excluir a tarefa
export function excludeTask() {
  const deleteButtons = document.querySelectorAll(".to-do__delete");

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();

      const index = deleteButton.parentNode.getAttribute("data-value"); // Pega o ID a partir do atributo data-value do pai
      const toDo = JSON.parse(localStorage.getItem("toDoList")) || []; // Obtém a lista de tarefas armazenada no localStorage ou cria uma lista vazia
      const filterToDo = toDo.filter((task) => task.id != index); // Filtra as tarefas que não possuem o ID selecionado e salva no localStorage
      localStorage.setItem("toDoList", JSON.stringify(filterToDo));

      // Atualiza o ID dos itens restantes no localStorage
      filterToDo.forEach((task, i) => {
        task.id = i;
      });

      localStorage.setItem("toDoList", JSON.stringify(filterToDo));

      renderToDoList();
    });
  });
}

// Limpar tarefas concluídas
export function clearCompleted() {
  const clearButton = document.getElementById("clear-complete");

  clearButton.addEventListener("click", () => {
    const toDo = JSON.parse(localStorage.getItem("toDoList")) || [];

    // Filtra as tarefas concluídas e incompletas e salva apenas as incompletas no localStorage
    const completedTasks = toDo.filter((task) => task.completed);
    const incompleteTasks = toDo.filter((task) => !task.completed);

    localStorage.setItem("toDoList", JSON.stringify(incompleteTasks));

    renderToDoList();
    updateTaskCount();

    // Atualiza o ID das tarefas restantes no localStorage
    incompleteTasks.forEach((task, i) => {
      task.id = i;
    });

    localStorage.setItem("toDoList", JSON.stringify(incompleteTasks));
  });
}

// Atualizar o contador de taregas incompletas
export function updateTaskCount(filter) {
  const taskCount = document.getElementById("task-count");

  const toDo = JSON.parse(localStorage.getItem("toDoList")) || [];
  const incompleteTasks = toDo.filter((task) => task.completed === false);

  taskCount.innerHTML = `${incompleteTasks.length} items left`;
}

// Adiciona ouvintes aos botões de filtro
function filterTasks() {
  const allTasks = document.getElementById("filter-all");
  const activeTasks = document.getElementById("filter-active");
  const completedTasks = document.getElementById("filter-completed");

  allTasks.classList.add("active");

  allTasks.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      activeTasks.classList.contains("active") ||
      completedTasks.classList.contains("active")
    ) {
      activeTasks.classList.remove("active");
      completedTasks.classList.remove("active");
      allTasks.classList.add("active");
    }

    renderToDoList("all");
  });

  activeTasks.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      allTasks.classList.contains("active") ||
      completedTasks.classList.contains("active")
    ) {
      allTasks.classList.remove("active");
      completedTasks.classList.remove("active");
      activeTasks.classList.add("active");
    }

    renderToDoList("active");
  });

  completedTasks.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      allTasks.classList.contains("active") ||
      activeTasks.classList.contains("active")
    ) {
      allTasks.classList.remove("active");
      activeTasks.classList.remove("active");
      completedTasks.classList.add("active");
    }

    renderToDoList("completed");
  });
}

const list = document.querySelector(".sortable");

Sortable.create(list, {
  animation: 150,
  handle: ".to-do__drag",
  onEnd: () => {
    // Obtém a lista ordenada de tarefas
    const taskList = Array.from(list.children).map((task, index) => {
      // atualiza o atributo 'data-value' do elemento com a nova posição
      task.setAttribute("data-value", index);

      return {
        id: parseInt(task.getAttribute("data-value")),
        toDo: task.querySelector(".to-do__task").innerText,
        completed: task.querySelector(".to-do__complete").checked,
        order: index,
      };
    });

    // Atualiza o LocalStorage com a nova ordem das tarefas
    localStorage.setItem("toDoList", JSON.stringify(taskList));

    // Atualiza a exibição da lista
    renderToDoList();
  },
});

filterTasks();
