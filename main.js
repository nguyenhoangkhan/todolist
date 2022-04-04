const input = document.querySelector(".add-input");
const form = document.querySelector("form");
const taskList = document.querySelector(".task-list");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const val = input.value.trim();
  if (val) {
    addTodo({
      text: val,
      status: "a",
    });
    saveLocalStorage();
  }
  input.value = "";
});

function addTodo(todo) {
  const todoItem = document.createElement("li");
  todoItem.setAttribute("id", "task-item");
  if (todo.status === "completed") {
    todoItem.setAttribute("class", "completed");
  }
  todoItem.innerHTML = `<span>${todo.text}</span> <i class="fas fa-trash"></i> `;
  todoItem.addEventListener("click", function () {
    todoItem.classList.toggle("completed");
    saveLocalStorage();
  });
  todoItem.querySelector("i").addEventListener("click", function (e) {
    e.target.parentElement.remove();
    saveLocalStorage();
  });
  taskList.appendChild(todoItem);
}
function saveLocalStorage() {
  let todoList = document.querySelectorAll("li");
  let todoStorage = [];
  todoList.forEach(function (item) {
    let text = item.querySelector("span").innerText;
    let status = item.getAttribute("class");

    return todoStorage.push({ text, status });
  });
  let todoStr = JSON.stringify(todoStorage);
  localStorage.setItem("todo", todoStr);
  console.log();
}
function init() {
  let data = JSON.parse(localStorage.getItem("todo"));
  data.forEach(function (item) {
    addTodo(item);
  });
}
init();
