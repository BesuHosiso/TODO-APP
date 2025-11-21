const formElement = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById("todo-list");

let allTodos = getTodos();
updateTodoList();

formElement.addEventListener('submit', function(e) {
     e.preventDefault();    
       addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if(todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        }
           allTodos.push(todoObject);
           updateTodoList();
           saveTodos();
           todoInput.value = "";
    }   
}

function updateTodoList() {
    todoUl.innerHTML = "";
    allTodos.forEach((todo, todoIndex)=>{
        todoItem = createTodoItem(todo, todoIndex);
        todoUl.append(todoItem);
    })
}

function createTodoItem(todo, todoIndex) {
    const todoId = "todo-"+todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo"; 
    todoLI.innerHTML = `
        <input type="checkbox" name="todo-1" id="${todoId}">
        <label for="${todoId}" id="custom-checkbox"><svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg></label>
        <label for="${todoId}" class="todo-text">${todoText}</label>
        <button class="del-btn">
          <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>`
          const deleteBtn = todoLI.querySelector(".del-btn");
    deleteBtn.addEventListener('click', () => {
        deleteTodoItem(todoIndex);
    })

    const checkbox = todoLI.querySelector("input");
    // This line needs to be here to set the initial checked state
    checkbox.addEventListener("change", ()=> {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
        
    })
    // This line was misplaced after the return statement
    checkbox.checked = todo.completed;
    // Also, apply the 'completed' class for styling if the todo is completed
    if (todo.completed) {
        todoLI.classList.add("completed");
    }
    return todoLI;
}

function saveTodos() {
    const todosJSON = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJSON);
}

function deleteTodoItem(todoIndex) {
     allTodos = allTodos.filter((_, i) => i !== todoIndex);
     saveTodos();
     updateTodoList();
}

function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
