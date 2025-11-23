const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const filterBtns = document.querySelectorAll(".filter-btn");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks(tasks);

// Add task
addBtn.addEventListener("click", () => {
  const taskText = input.value.trim();
  if(taskText === "") return;
  
  const task = { text: taskText, completed: false };
  tasks.push(task);
  saveTasks();
  renderTasks(tasks);
  input.value = "";
});

// Render tasks
function renderTasks(taskArray) {
  todoList.innerHTML = "";
  taskArray.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if(task.completed) li.classList.add("completed");

    li.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks(tasks);
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks(tasks);
    });

    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

// Filter tasks
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    if(filter === "all") renderTasks(tasks);
    else if(filter === "completed") renderTasks(tasks.filter(t => t.completed));
    else if(filter === "pending") renderTasks(tasks.filter(t => !t.completed));
  });
});

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
