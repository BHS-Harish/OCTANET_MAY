document.getElementById("menu-open-icon").addEventListener('click', () => {
    document.getElementById("sidebar").style.transform = "translateX(0px)";
})
document.getElementById("menu-close-icon").addEventListener('click', () => {
    document.getElementById("sidebar").style.transform = "translateX(-250px)";
})

document.getElementById("addTaskBtn").addEventListener('click', () => {
    window.open('./addtask.html', '_self')
})
document.getElementById("year").innerHTML=new Date().getFullYear()

var currentTodos = generateIndex(JSON.parse(localStorage.getItem("todobee")))

// Generate Index
function generateIndex(todos) {
    return todos.map((todo, index) => {
        return { ...todo, index }
    })
}

loadTodos(currentTodos)

// It will loads the todos in the dom
function loadTodos(todos) {
    document.getElementById("tasks-container").innerHTML = ``;
    todos.map((todo) => {
        document.getElementById('tasks-container').innerHTML += `
        <div class="todo-container">
        <div class="category-container">
            <p>${todo.category}</p>
        </div>
        <p class="taskName">${todo.taskName}</p>
        <p class="dueDate">Due on : ${todo.dueDate}</p>
        <p class="isCompleted">Status : ${todo.isCompleted ? "Completed" : "Pending"}</p>
        <p class="priority">${todo.priority}</p>
        <button onclick="deleteTodo(${todo.index})" class="deleteBtn" title="Delete">x</button>
        ${
            !todo.isCompleted?
            `<button onclick="markAsCompletedTodo(${todo.index})" class="markAsDoneBtn" title="Mark as Done">
                <img width="15" height="15" src="./check-mark.svg" alt="mark"/>
            </button>`
            :
            ""
        }
    </div> 
        `;
    })
}

// To delete the Todo Based on index
function deleteTodo(index) {
    var oldTodos = JSON.parse(localStorage.getItem("todobee"));
    oldTodos.splice(index, 1)
    currentTodos = generateIndex(oldTodos);
    temp = currentTodos
    localStorage.setItem("todobee", JSON.stringify(currentTodos))
    loadTodos(temp)
}

//Mark as complete functionality
function markAsCompletedTodo(index){
    var oldTodos = JSON.parse(localStorage.getItem("todobee"));
    oldTodos[index].isCompleted=true;
    console.log(oldTodos)
    currentTodos = generateIndex(oldTodos);
    temp = currentTodos
    localStorage.setItem("todobee", JSON.stringify(currentTodos))
    loadTodos(temp)
}

// Functionalities for Side Menu
var temp = currentTodos
document.getElementById('allTasks').addEventListener('click', () => {
    temp=currentTodos
    loadTodos(currentTodos)
    document.getElementById("sidebar").style.transform = "translateX(-250px)";
})

document.getElementById('completedTasks').addEventListener('click', () => {
    temp = currentTodos.filter((todo) => {
        return todo.isCompleted == true
    })
    loadTodos(temp)
    document.getElementById("sidebar").style.transform = "translateX(-250px)";
})

document.getElementById('pendingTasks').addEventListener('click', () => {
    temp = currentTodos.filter((todo) => {
        return todo.isCompleted == false
    })
    loadTodos(temp)
    document.getElementById("sidebar").style.transform = "translateX(-250px)";
})

document.getElementById('expiredTasks').addEventListener('click', () => {
    temp = currentTodos.filter((todo) => {
        return Date.parse(todo.dueDate) < Date.parse(new Date().toISOString().split('T')[0])
    })
    loadTodos(temp)
    document.getElementById("sidebar").style.transform = "translateX(-250px)";
})

// Filter Functionalities
var category = "All"
var priority = "All"
document.getElementById("category").addEventListener('change', () => {
    category = document.getElementById("category").value;
    filterTodos();
})
document.getElementById("priority").addEventListener('change', () => {
    priority = document.getElementById("priority").value;
    filterTodos();
})

function filterTodos() {
    var result = []
    if (category == "All" && priority == "All")
        result = temp
    else if (category == "All")
        result = temp.filter((todo) => {
            return todo.priority == priority
        })
    else if (priority == "All")
        result = temp.filter((todo) => {
            return todo.category == category
        })
    else
        result = temp.filter((todo) => {
            return (todo.category == category) && (todo.priority == priority)
        })
    loadTodos(result)
}
