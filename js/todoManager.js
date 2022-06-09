// Model Section
let todos;

const savedTodos = JSON.parse(localStorage.getItem("key"));
if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [
    {
      title: "Get groceries",
      priority: "low",
      id: "id1",
    },
    {
      title: "Make Dinner",
      priority: "medium",
      id: "id2",
    },
    {
      title: "Train",
      priority: "high",
      id: "id3",
    },
  ];
}

// Creates a todo
function createTodo(title, priority) {
  const id = " " + new Date().getTime();

  todos.push({
    title: title,
    priority: priority,
    id: id,
  });

  saveTodos();
}
// Deletes a todo
function removeTodo(idToDelete) {
  todos = todos.filter(function (todo) {
    if (todo.id == idToDelete) {
      return false;
    } else {
      return true;
    }
  });

  saveTodos();
}

//Save Todos
function saveTodos() {
  localStorage.setItem("key", JSON.stringify(todos));
}

// Check todo
function toggleTodo(idToCheck) {
  todos.forEach(function (todo) {
    if (todo.id === idToCheck) {
      if (todo.isDone == true) {
        todo.isDone = false;
      } else {
        todo.isDone = true;
      }
    }
  });
}

// View - Section
function render() {
  //   reset div
  document.getElementById("todo-list").innerHTML = "";

  todos.forEach(function (todo) {
    const element = document.createElement("div");
    element.innerText = todo.title + " " + "(" + todo.priority + ")";

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.style = "margin-left: 12px";
    deleteButton.onclick = deleteTodo;
    deleteButton.id = todo.id;
    element.appendChild(deleteButton);

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.style = "margin-right: 12px";
    checkboxElement.onchange = checkTodo;
    checkboxElement.dataset.todoId = todo.id;

    if (todo.isDone == true) {
      checkboxElement.checked = true;
    } else {
      checkboxElement.checked = false;
    }
    element.prepend(checkboxElement);

    const dotoList = document.getElementById("todo-list");
    dotoList.appendChild(element);
  });
}

// Controller - Section
function addTodo() {
  const textbox = document.getElementById("todo-title");
  const title = textbox.value;

  const prioritySelector = document.getElementById("priority-selector");
  const priority = prioritySelector.value;

  createTodo(title, priority);
  render();
}

function deleteTodo(event) {
  const deleteButton = event.target;
  const idToDelete = deleteButton.id;

  removeTodo(idToDelete);
  render();
}

function checkTodo(event) {
  let name = event.target;
  let id = name.dataset.todoId;

  toggleTodo(id);
  render();
}

render();
