const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

addBtn.addEventListener("click", () => {
    const task = input.value.trim();
    if (task !== "") {
        const li = document.createElement("li");
        li.textContent = task;

        li.addEventListener("click", () => {
            li.classList.toggle("completed"); // mark task done
        });

        todoList.appendChild(li);
        input.value = "";
    }
});
