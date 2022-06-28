// Model Section
let todos;

const pomodoroTime = 2500; //2500
let pomodoroPause = false;
const pomodoroPauseTime = 300; //300 sec = 5 min
let pomodoroTimeRounds = 0; //Reset after 4 Rounds

let pTime = pomodoroTime;
let pPTime = pomodoroPauseTime;

let freeTime = 0;

const savedTodos = JSON.parse(localStorage.getItem("key"));
if (Array.isArray(savedTodos)) {
  todos = savedTodos;
} else {
  todos = [
    {
      title: "Task 1",
      priority: "low",
      id: "id1",
    },
    {
      title: "Task 2",
      priority: "medium",
      id: "id2",
    },
    {
      title: "Task 3",
      priority: "high",
      id: "id3",
    },
  ];
}

//My Timer - for pomodoroTime
function myTimer() {
  let minutes = 0;
  let seconds = 0;

  if (pomodoroTimeRounds <= 4) {
    if (pomodoroPause == false) {
      minutes = String(Math.trunc(pTime));
      seconds = String(pTime % 60);
    } else {
      minutes = String(Math.trunc(pPTime));
      seconds = String(pPTime % 60);
    }

    if (minutes.length === 1) {
      minutes = "0" + minutes;
    }

    if (seconds.length === 1) {
      seconds = "0" + seconds;
    }

    return minutes.slice(0, 2) + ":" + minutes.slice(2, 4);
  } else {
    //Reset and Grands special Free Time for compelting full pomodoro
    pomodoroTimeRounds = 4;
  }
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
    deleteButton.onclick = deleteTodo;
    deleteButton.id = todo.id;

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.style = "margin-right: 12px";
    checkboxElement.onchange = checkTodo;
    checkboxElement.dataset.todoId = todo.id;

    if (todo.priority == "low") {
      element.id = "todoTaskStyleLow";
      deleteButton.style =
        "margin-left: 12px; background-color: white;border: none; border-radius: 50px;border-width: 0px;";
    } else if (todo.priority == "medium") {
      element.id = "todoTaskStyleMedium";
            deleteButton.style =
              "margin-left: 12px; background-color: white;border: none; border-radius: 50px;border-width: 0px;";
    } else if (todo.priority == "high") {
      element.id = "todoTaskStyleHigh";
            deleteButton.style =
              "margin-left: 12px; background-color: white;border: none; border-radius: 50px;border-width: 0px;";
    } else if (todo.priority == "today") {
      element.id = "todoTaskStyleToday";
            deleteButton.style =
              "margin-left: 12px; background-color: white;border: none; border-radius: 50px;border-width: 0px;";
    }
    element.appendChild(deleteButton);

    
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

function myTimerRender() {
  const countContainer = document.getElementById("time-remaining");
  countContainer.innerText = myTimer();
}

function renderTime() {}

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

function startTimerFocus(event) {
  timerID = setInterval(runCountDown, 500);
}

function runCountDown() {
  if (pomodoroPause) {
    pPTime -= 1;
  } else {
    pTime -= 1;
  }
  myTimerRender();
}

function startTimerFreeTime(event) {}

render();
