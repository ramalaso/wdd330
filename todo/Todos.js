const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const newTodo = document.getElementById('newTodo');
const addBtn = document.getElementById('btn');
const activeBtn = document.getElementById('active');
const allBtn = document.getElementById('all');
const completedBtn = document.getElementById('completed');
const chkStatus = document.getElementById('status');

const localStorageTransactions = JSON.parse(localStorage.getItem('tasks'));
let tasks = localStorage.getItem('tasks') !== null ? localStorageTransactions : [] ;

addBtn.addEventListener('click', addTask);
activeBtn.addEventListener('click', selectActiveTasks);
allBtn.addEventListener('click', selectAll);
completedBtn.addEventListener('click', selectCompletedTasks);

function addTransactionDOM(task) {
    const item = document.createElement('li');
    item.innerHTML = `
    <input type="checkbox" id="status" ${task.completed === true ? 'checked' : ''} onclick="updateTask(${task.id})"/>
    <label class="label-for-check" for="idinput">${task.text}</label> <button class="delete-btn" onclick="removeTask(${task.id})">x</button>
    `;
    list.appendChild(item);
};

function init() {
    list.innerHTML = '';
    tasks.forEach(addTransactionDOM);
    countLefttasks(tasks);
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    countLefttasks();
}

function updateTask(id) {
    const tasksIndex = tasks.map( transaction => transaction.id);
    const index = tasksIndex.indexOf(id);
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    init();
}

function addTask(event) {
    event.preventDefault();
    if (newTodo.value === '') {
        alert('Please add a text.')
    } else {
        const task = {
            id: Date.now(),
            text: newTodo.value,
            completed: false
        }
        tasks.push(task);
        console.log(tasks);
        newTodo.value = '';
        console.log(task)
        addTransactionDOM(task);
        updateLocalStorage();
    }
    countLefttasks(tasks);
}

function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateLocalStorage();
    init();
};

function selectActiveTasks() {
    list.innerText = '';
    filteredTasks = tasks.filter(task => task.completed === false);
    filteredTasks.forEach(addTransactionDOM);
}

function selectCompletedTasks() {
    list.innerText = '';
    filteredTasks = tasks.filter(task => task.completed === true);
    filteredTasks.forEach(addTransactionDOM);
}

function selectAll() {
    init();
}

function countLefttasks() {
    document.getElementById('tasksLeft').innerText = tasks.filter(task => task.completed === false).length;
}

init();
