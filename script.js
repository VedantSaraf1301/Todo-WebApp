document.addEventListener("DOMContentLoaded",function(){
    const todoInput = document.getElementById("todo-input");
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks"))  || []

    tasks.forEach((task) =>renderTask(task))

    addTaskBtn.addEventListener('click',()=>{
        let content = todoInput.value.trim()
        if(content===null) return
        const newTask = {
            id : Date.now(),
            text : content,
            completed : false
        }
        tasks.push(newTask)
        saveTasks()
        renderTask(newTask)
        todoInput.value = ""
    })

    function renderTask(task){
        const li = document.createElement('li')
        li.setAttribute('data-id',task.id)
        li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>`
        
        
        li.addEventListener('click',(e) => {
            if(e.target.tagName === "BUTTON")  return;
            task.completed = !task.completed
            li.classList.toggle("completed")
            saveTasks()
        })

        li.querySelector("button").addEventListener('click',(e) => {
            e.stopPropagation() //prevent toggle from firing
            tasks = tasks.filter((t) => t.id !== task.id  )    
            li.remove()
            saveTasks()
        })
        todoList.appendChild(li)
    }


    function saveTasks(){
        localStorage.setItem("tasks",JSON.stringify(tasks))
    }
})