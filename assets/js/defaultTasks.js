export function getToDoList() {
  const toDo = JSON.parse(localStorage.getItem("toDoList")) || [];

  const defaultTask0 = {
    id: 0,
    toDo: "Complete online JavaScript course",
    completed: true,
  };
  const defaultTask1 = {
    id: 1,
    toDo: "Jog around the park 3x",
    completed: false,
  };
  const defaultTask2 = {
    id: 2,
    toDo: "10 minutes meditation",
    completed: false,
  };
  const defaultTask3 = {
    id: 3,
    toDo: "Read for 1 hour",
    completed: false,
  };
  const defaultTask4 = {
    id: 4,
    toDo: "Pick up groceries",
    completed: false,
  };
  const defaultTask5 = {
    id: 5,
    toDo: "Complete Todo App on Frontend Mentor",
    completed: false,
  };

  if (toDo.length === 0) {
    toDo.push(
      defaultTask0,
      defaultTask1,
      defaultTask2,
      defaultTask3,
      defaultTask4,
      defaultTask5
    );

    localStorage.setItem("toDoList", JSON.stringify(toDo));
  }
}
