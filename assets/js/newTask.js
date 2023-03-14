// Create the <li> and all child tags to add a new task
export function createTask() {
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

  // Adds the new task to the array
  const toDo = { item: insertTask, completed: false };
  toDoList.push(toDo);

  // Removes the new task from the array
  toDoDelete.addEventListener("click", () => {
    list.removeChild(toDoItem);
    list.removeChild(hr);
    toDoList.splice(toDoList.indexOf(toDo), 1);

    updateTaskCount(); // Update the count
  });

  // Change the state of a task and update the count
  toDoComplete.addEventListener("change", () => {
    const index = parseInt(toDoItem.getAttribute("data-value"));
    toDoList[index].completed = toDoComplete.checked;
    updateTaskCount(); // Update the count
  });

  updateTaskCount(); // Update the count
}

export const toDoList = [];

// Counting the tasks
export function updateTaskCount() {
  const taskCount = toDoList.length;
  const completedCount = toDoList.filter((task) => task.completed).length;
  const remainingCount = taskCount - completedCount;
  const taskCountElement = document.getElementById("taskCount");

  taskCountElement.textContent = `${remainingCount} tasks left`;
}
