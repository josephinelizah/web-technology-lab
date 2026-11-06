
var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

var filter = "all";

var form = document.getElementById("taskForm");
var input = document.getElementById("taskInput");
var list = document.getElementById("taskList");
var counter = document.getElementById("counter");


function createTask(text){

    return {
        id: Date.now(),
        text: text,
        done: false
    };

}


function addTask(text){

    tasks.push(createTask(text));

    saveAndRender();

}


function toggleTask(id){

    tasks = tasks.map(t =>
        t.id === id ? {...t, done: !t.done} : t
    );

    saveAndRender();

}


function deleteTask(id){

    tasks = tasks.filter(t => t.id !== id);

    saveAndRender();

}


function getVisible(){

    if(filter === "open"){

        return tasks.filter(t => !t.done);

    }
    else if(filter === "completed"){

        return tasks.filter(t => t.done);

    }

    return tasks;

}


function countOpen(){

    return tasks.filter(t => !t.done).length;

}


function taskItem(t){

    var li = document.createElement("li");

    var span = document.createElement("span");

    span.textContent = t.text;

    if(t.done){

        span.className = "completed";

    }

    var completeBtn = document.createElement("button");

    completeBtn.textContent = t.done ? "Undo" : "Complete";

    completeBtn.onclick = function(){

        toggleTask(t.id);

    };

    var deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";

    deleteBtn.className = "delete";

    deleteBtn.onclick = function(){

        deleteTask(t.id);

    };

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    return li;

}


function renderTasks(){

    list.innerHTML = "";

    getVisible().forEach(t => {

        list.appendChild(taskItem(t));

    });

    counter.textContent = countOpen() + " tasks left";

}


function saveAndRender(){

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();

}


function setFilter(value){

    filter = value;

    renderTasks();

}


function handleSubmit(event){

    event.preventDefault();

    var text = input.value.trim();

    if(text !== ""){

        addTask(text);

    }

    input.value = "";

}


form.addEventListener("submit", handleSubmit);

renderTasks();
