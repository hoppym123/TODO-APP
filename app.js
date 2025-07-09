document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load todos from localStorage
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodoToDOM(todo));
    }

    // Save todos to localStorage
    function saveTodos() {
        const todos = [];
        document.querySelectorAll('#todo-list li').forEach(li => {
            todos.push({
                text: li.querySelector('.todo-text').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Add todo to DOM
    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    // Add new todo
    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            addTodoToDOM({ text, completed: false });
            saveTodos();
            todoInput.value = '';
        }
    });

    // Handle complete and delete
    todoList.addEventListener('click', function(e) {
        if (e.target.classList.contains('todo-text')) {
            e.target.parentElement.classList.toggle('completed');
            saveTodos();
        } else if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove();
            saveTodos();
        }
    });

    loadTodos();
});