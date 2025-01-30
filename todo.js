// Sistema de Tarefas
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// Elementos
const elements = {
    taskInput: document.getElementById('taskInput'),
    taskList: document.getElementById('taskList'),
    taskCounter: document.getElementById('taskCounter'),
    addTaskBtn: document.getElementById('addTaskBtn'),
    clearCompletedBtn: document.getElementById('clearCompletedBtn'),
    filterBtns: document.querySelectorAll('.filter-btn')
};

// Funções
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const createTaskElement = (task) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;
    li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        <div class="task-actions">
            <button class="edit-btn" type="button">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn" type="button">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    li.querySelector('input').addEventListener('change', () => toggleTask(task.id));
    li.querySelector('.edit-btn').addEventListener('click', () => editTask(task.id));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));
    
    return li;
};

const renderTasks = () => {
    elements.taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        elements.taskList.appendChild(createTaskElement(task));
    });

    updateCounter();
};

const addTask = () => {
    const text = elements.taskInput.value.trim();
    if (text) {
        tasks.push({
            id: Date.now(),
            text,
            completed: false
        });
        elements.taskInput.value = '';
        saveTasks();
        renderTasks();
    }
};

const toggleTask = (id) => {
    tasks = tasks.map(task => 
        task.id === id ? {...task, completed: !task.completed} : task
    );
    saveTasks();
    renderTasks();
};

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
};

const editTask = (id) => {
    const task = tasks.find(task => task.id === id);
    const newText = prompt('Editar tarefa:', task.text);
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
    }
};

const clearCompleted = () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
};

const updateCounter = () => {
    const activeTasks = tasks.filter(task => !task.completed).length;
    elements.taskCounter.textContent = `${activeTasks} ${activeTasks === 1 ? 'tarefa' : 'tarefas'} restante${activeTasks !== 1 ? 's' : ''}`;
};

// Event Listeners
elements.addTaskBtn.addEventListener('click', addTask);
elements.taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

elements.clearCompletedBtn.addEventListener('click', clearCompleted);

elements.filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        elements.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// Inicialização
document.addEventListener('DOMContentLoaded', renderTasks);