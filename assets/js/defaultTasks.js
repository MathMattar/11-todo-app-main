// Busca a lista de tarefas no localStorage
export function getToDoList() {

  const toDo = JSON.parse(localStorage.getItem("toDoList")) || []; // Obtém a lista de tarefas armazenada no localStorage ou cria uma lista vazia

  // Define tarefas padrão que serão adicionadas caso não existam no localStorage
  const defaultTask0 = {
    id: 0,
    toDo: "Complete online JavaScript course",
    completed: true,
    order: 0,
  };
  const defaultTask1 = {
    id: 1,
    toDo: "Jog around the park 3x",
    completed: false,
    order: 1,
  };
  const defaultTask2 = {
    id: 2,
    toDo: "10 minutes meditation",
    completed: false,
    order: 2,
  };
  const defaultTask3 = {
    id: 3,
    toDo: "Read for 1 hour",
    completed: false,
    order: 3,
  };
  const defaultTask4 = {
    id: 4,
    toDo: "Pick up groceries",
    completed: false,
    order: 4,
  };
  const defaultTask5 = {
    id: 5,
    toDo: "Complete Todo App on Frontend Mentor",
    completed: false,
    order: 5,
  };

  // Se a lista estiver vazia, adiciona as tarefas padrão ao array toDo e salva no localStorage
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
