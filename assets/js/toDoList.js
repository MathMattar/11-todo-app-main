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

// Adds the HTML tasks to the array
const toDoItem = document.querySelectorAll(".to-do__item");

toDoItem.forEach((item) => {
  const toDo = {
    item: item.querySelector(".to-do__task").textContent,
    completed: item.querySelector(".to-do__complete").checked,
  };

  toDoList.push(toDo);
});

// Removes the HTML tasks in the array
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
      updateTaskCount(); // Removes the excluded task from the count
    }
  });
});

const completeInputs = document.querySelectorAll(".to-do__complete");

completeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const listItem = input.closest(".to-do__item");
    const index = toDoList.findIndex(
      (task) => task.item === listItem.querySelector(".to-do__task").textContent
    );

    if (index !== -1) {
      toDoList[index].completed = input.checked;
      updateTaskCount(); // Change the state of a task and update the count
    }
  });
});

updateTaskCount();
