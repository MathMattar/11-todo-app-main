import { createTask, toDoList, updateTaskCount } from "./newTask.js";

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
    updateTaskCount();
  }
});

// Adiciona data-attributes aos elementos nativos do HTML para identificação
const toDoItem = document.querySelectorAll(".to-do__item");

let count = 0;

toDoItem.forEach((item) => {
  item.setAttribute("data-value", count); // Adiciona data-attribute para identificação
  count++;

  // Adiciona as tarefas da lista HTML na matriz toDoList
  const toDo = {
    item: item.querySelector(".to-do__task").textContent,
    completed: item.querySelector(".to-do__complete").checked,
  };

  toDoList.push(toDo);
});

// Remove os elementos nativos do HTML da matriz toDoList quando excluídos pelo usuário
const deleteBtns = document.querySelectorAll(".to-do__delete");

// Seleciona o item e a divisória correspondente ao botão de exclusão clicado. Encontra o índice da tarefa a ser excluída na matriz toDoList
deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    const listItem = e.target.closest(".to-do__item");
    const hr = listItem.nextElementSibling;
    const index = toDoList.findIndex(
      (task) => task.item === listItem.querySelector(".to-do__task").textContent
    );

    // Verifica se a tarefa foi encontrada na matriz. Remove a tarefa, o item e a divisória, também, atualiza a contagem.
    if (index !== -1) {
      toDoList.splice(index, 1);
      listItem.remove();
      hr.remove();
      updateTaskCount();

      // Atualiza os data-attributes dos itens restantes após a exclusão
      const remainingTasks = document.querySelectorAll(".to-do__item");
      let count = 0;

      remainingTasks.forEach((item) => {
        item.setAttribute("data-value", count);
        count++;
      });
    }
  });
});

// Modifica o estado do checkbox de uma tarefa e atualiza a contagem de tarefas
const completeInputs = document.querySelectorAll(".to-do__complete");

// Seleciona o item da lista correspondente ao checkbox clicado e encontra o índice da tarefa na matriz toDoList
completeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const listItem = input.closest(".to-do__item");
    const index = toDoList.findIndex(
      (task) => task.item === listItem.querySelector(".to-do__task").textContent
    );

    //Verifica se a tarefa foi encontrada na matriz, modifica o estado de acordo com o valor do checkbox e atualiza a comtagem de elementos
    if (index !== -1) {
      toDoList[index].completed = input.checked;
      updateTaskCount();
    }
  });
});

updateTaskCount();
