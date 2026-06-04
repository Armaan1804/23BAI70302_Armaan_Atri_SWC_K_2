let todos = [];

const todoInput = document.getElementById("todo-text");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

function renderTodos() {

    todoList.innerHTML = "";

    todos.forEach(todo => {

        const li = document.createElement("li");
        li.classList.add("todo-item");

        li.innerHTML = `
            <div class="todo-left">

                <input
                    type="checkbox"
                    ${todo.isCompleted ? "checked" : ""}
                    onchange="toggleTodo(${todo.id})"
                >

                <span class="${todo.isCompleted ? "completed" : ""}">
                    ${todo.text}
                </span>

            </div>

            <div class="btn-group">

                <button
                    class="edit-btn"
                    onclick="editTodo(${todo.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTodo(${todo.id})"
                >
                    Delete
                </button>

            </div>
        `;

        todoList.appendChild(li);
    });
}

function addTodo() {

    const text = todoInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: text,
        isCompleted: false
    };

    todos.push(newTodo);

    todoInput.value = "";

    renderTodos();
}

function toggleTodo(id) {

    todos = todos.map(todo => {

        if (todo.id === id) {
            return {
                ...todo,
                isCompleted: !todo.isCompleted
            };
        }

        return todo;
    });

    renderTodos();
}

function deleteTodo(id) {

    todos = todos.filter(todo => todo.id !== id);

    renderTodos();
}

function editTodo(id) {

    const todo = todos.find(t => t.id === id);

    const updatedText = prompt(
        "Edit Task",
        todo.text
    );

    if (
        updatedText === null ||
        updatedText.trim() === ""
    ) {
        return;
    }

    todo.text = updatedText.trim();

    renderTodos();
}

addBtn.addEventListener("click", addTodo);

todoInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        addTodo();
    }
});