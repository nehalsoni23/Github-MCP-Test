class TodoApp {
    constructor() {
        this.taskInput = document.getElementById('taskInput');
        this.taskList = document.getElementById('taskList');
        this.tasks = this.loadTasks();
        
        this.bindEvents();
        this.renderTasks();
    }
    
    loadTasks() {
        try {
            return JSON.parse(localStorage.getItem('tasks')) || [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    }
    
    saveTasks() {
        try {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    }
    
    bindEvents() {
        // Form submission is handled via onsubmit in HTML
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addTask(e);
            }
        });
    }
    
    renderTasks() {
        this.taskList.innerHTML = '';
        this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            const button = document.createElement('button');
            
            span.textContent = task.text;
            span.className = task.completed ? 'completed' : '';
            span.addEventListener('click', () => this.toggleTask(index));
            
            button.textContent = 'Delete';
            button.addEventListener('click', () => this.deleteTask(index));
            
            li.appendChild(span);
            li.appendChild(button);
            this.taskList.appendChild(li);
        });
        
        this.saveTasks();
    }
    
    addTask(e) {
        e.preventDefault();
        const text = this.taskInput.value.trim();
        
        if (text) {
            this.tasks.push({
                text,
                completed: false,
                createdAt: new Date().toISOString()
            });
            
            this.taskInput.value = '';
            this.renderTasks();
        }
    }
    
    toggleTask(index) {
        if (this.tasks[index]) {
            this.tasks[index].completed = !this.tasks[index].completed;
            this.renderTasks();
        }
    }
    
    deleteTask(index) {
        if (this.tasks[index]) {
            this.tasks.splice(index, 1);
            this.renderTasks();
        }
    }
}

// Initialize the app
const todoApp = new TodoApp();
