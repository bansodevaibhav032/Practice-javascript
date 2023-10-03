document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage()
})

function addTask() {
    const taskInput = document.getElementById('taskInput')
    const taskText = taskInput.value.trim()

    if (taskText === '') {
        alert('Please enter a task.')
        return
    }

    const taskList = document.getElementById('taskList')
    const li = document.createElement('li')
    li.innerHTML = `<span class="edited">${taskText}</span>
      <button onclick="editTask(this)">Edit</button>
      <button onclick="deleteTask(this)">Delete</button>`
    taskList.appendChild(li)

    saveTaskToLocalStorage(taskText)

    taskInput.value = ''
}

function deleteTask(button) {
    const taskList = document.getElementById('taskList')
    taskList.removeChild(button.parentNode)

    const taskText = button.parentNode.querySelector('.edited').textContent.trim()
    removeTaskFromLocalStorage(taskText)
}

function editTask(button) {
    const taskText = button.previousSibling
    const newText = prompt('Edit task:', taskText.textContent.trim())

    if (newText !== null && newText !== '') {
        taskText.textContent = newText
        taskText.classList.add('edited')
        updateTaskInLocalStorage(taskText.textContent.trim(), newText)
    }
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeTaskFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks = tasks.filter(item => item !== task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function updateTaskInLocalStorage(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    const index = tasks.findIndex(item => item === oldTask)
    if (index !== -1) {
        tasks[index] = newTask
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
}

function loadTasksFromLocalStorage() {
    const taskList = document.getElementById('taskList')
    taskList.innerHTML = '' // Clear existing list

    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach(task => {
        const li = document.createElement('li')
        li.innerHTML = `
        <span class="edited">${task}</span>
        <button onclick="editTask(this)">Edit</button>
        <button onclick="deleteTask(this)">Delete</button>
      `
        taskList.appendChild(li)
    })
}
