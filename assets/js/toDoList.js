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

// Adiciona data-attributes aos elementos nativos do HTML
const toDoItem = document.querySelectorAll(".to-do__item");

let count = 0;

toDoItem.forEach((item) => {
  item.setAttribute("data-value", count);
  count++;

  // Adiciona os elementos nativos do HTML à matriz toDoList
  const toDo = {
    item: item.querySelector(".to-do__task").textContent,
    completed: item.querySelector(".to-do__complete").checked,
  };

  toDoList.push(toDo);
});

// Remove os elementos nativos do HTML da matriz toDoList
const deleteBtns = document.querySelectorAll(".to-do__delete");

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", (e) => {
    const listItem = e.target.closest(".to-do__item");
    const hr = listItem.nextElementSibling;
    const index = toDoList.findIndex(
      (task) => task.item === listItem.querySelector(".to-do__task").textContent
    );

    if (index !== -1) {
      toDoList.splice(index, 1);
      listItem.remove();
      hr.remove();
      updateTaskCount(); // Remove os elementos excluidos da contagem de tarefas

      // Adiciona o novo data-attributes aos elementos restantes após uma exclusão
      const remainingTasks = document.querySelectorAll(".to-do__item");
      let count = 0;

      remainingTasks.forEach((item) => {
        item.setAttribute("data-value", count);
        count++;
      });
    }
  });
});

// Modifica o estado do checkbox e atuliza a contagem de elementos nativos do HTML
const completeInputs = document.querySelectorAll(".to-do__complete");

completeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const listItem = input.closest(".to-do__item");
    const index = toDoList.findIndex(
      (task) => task.item === listItem.querySelector(".to-do__task").textContent
    );

    if (index !== -1) {
      toDoList[index].completed = input.checked;
      updateTaskCount(); //Modifica o estado e atualiza a contagem
    }
  });
});

updateTaskCount();
