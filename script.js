var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = [];

function renderTodos() {
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  for (var i = 0; i < todos.length; i++) {
    var li = document.createElement("li");
    li.textContent = todos[i];
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Complete";

    li.appendChild(button);
    todoList.appendChild(li);
  }
}

function init() {
  if (!localStorage.getItem("todos")) { return; }
  todos = JSON.parse(localStorage.getItem("todos"));
  console.log(todos);
  renderTodos();

}

function storeTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function add(event) {
  event.preventDefault();
  var todoText = todoInput.value.trim();

  if (todoText === "") {
    alert("Type something!");
    return;
  }
  console.log("プッシュ！：" + todoText);
  todos.push(todoText);
  todoInput.value = "";

  storeTodos();
  renderTodos();
}

function dlt(event) {
  if (event.target.matches("button")) {
    var index = event.target.parentElement.getAttribute("data-index");
    todos.splice(index, 1);
    storeTodos();
    renderTodos();
  }
}

todoForm.addEventListener("submit", add);
todoList.addEventListener("click", dlt);
init();
