document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const input = document.getElementById('input');
    const todos = document.getElementById('list');
    const completed = document.getElementById('completed');
    const deleted = document.getElementById('deleted');
    const clear = document.querySelectorAll('.clear');

    function saveTodos() {
        const todosElements = todos.querySelectorAll('li');
        const completedElements = completed.querySelectorAll('li');
        const deletedElements = deleted.querySelectorAll('li');

        const todosArray = [];
        const completedArray = [];
        const deletedArray = [];

        todosElements.forEach((todo) => {
            todosArray.push({
                text: todo.innerText,
                completed: false,
                deleted: false
            });
        });

        completedElements.forEach((todo) => {
            completedArray.push({
                text: todo.innerText,
                completed: true,
                deleted: false
            });
        });

        deletedElements.forEach((todo) => {
            deletedArray.push({
                text: todo.innerText,
                completed: false,
                deleted: true
            });
        });

        localStorage.setItem('todos', JSON.stringify(todosArray));
        localStorage.setItem('completed', JSON.stringify(completedArray));
        localStorage.setItem('deleted', JSON.stringify(deletedArray));
    }

    function loadTodos() {
        const todosArray = JSON.parse(localStorage.getItem('todos'));
        const completedArray = JSON.parse(localStorage.getItem('completed'));
        const deletedArray = JSON.parse(localStorage.getItem('deleted'));

        if (todosArray) {
            todosArray.forEach((todo) => {
                const todoElement = document.createElement('li');
                todoElement.innerText = todo.text;

                todoElement.addEventListener('click', () => {
                    todoElement.classList.toggle('completed');
                    if (todoElement.classList.contains('completed')) {
                        completed.appendChild(todoElement);
                        todos.removeChild(todoElement);
                    }
                    saveTodos();
                });

                todoElement.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    todoElement.classList.toggle('deleted');
                    if(todoElement.classList.contains('deleted')) {
                        deleted.appendChild(todoElement);
                        todos.removeChild(todoElement);
                    }
                    saveTodos();
                });

                todos.appendChild(todoElement);
            });
        }

        if (completedArray) {
            completedArray.forEach((todo) => {
                const todoElement = document.createElement('li');
                todoElement.innerText = todo.text;
                todoElement.classList.add('completed');

                todoElement.addEventListener('click', () => {
                    todoElement.classList.toggle('completed');
                    if (todoElement.classList.contains('completed')) {
                        completed.appendChild(todoElement);
                        todos.removeChild(todoElement);
                    }
                    saveTodos();
                });

                todoElement.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    todoElement.classList.toggle('deleted');
                    if(todoElement.classList.contains('deleted')) {
                        deleted.appendChild(todoElement);
                        todos.removeChild(todoElement);
                    }
                    saveTodos();
                });

                completed.appendChild(todoElement);
            });
        }

        if (deletedArray) {
            deletedArray.forEach((todo) => {
                const todoElement = document.createElement('li');
                todoElement.innerText = todo.text;
                todoElement.classList.add('deleted');

                todoElement.addEventListener('click', () => {
                    todoElement.classList.toggle('completed');
                    if (todoElement.classList.contains('completed')) {
                        completed.appendChild(todoElement);
                        deleted.removeChild(todoElement);
                    }
                    saveTodos();
                });

                todoElement.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    todoElement.classList.toggle('deleted');
                    if(todoElement.classList.contains('deleted')) {
                        deleted.appendChild(todoElement);
                        todos.removeChild(todoElement);
                    }
                    saveTodos();
                });

                deleted.appendChild(todoElement);
            });
        }
    }

    loadTodos();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTodo();
        saveTodos();
    });

    function addTodo() {
        const todoText = input.value;

        if (todoText) {
            const todo = document.createElement('li');
            todo.innerText = todoText;

            todos.appendChild(todo);

            todo.addEventListener('click', () => {
                todo.classList.toggle('completed');
                if (todo.classList.contains('completed')) {
                    completed.appendChild(todo);
                    todos.removeChild(todo);
                }
            });

            todo.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                todo.classList.toggle('deleted');
                if(todo.classList.contains('deleted')) {
                    deleted.appendChild(todo);
                    todos.removeChild(todo);
                }
            });

            input.value = '';
        }
    }

    clear.forEach((btn) => {
        console.log(btn);
        btn.addEventListener('click', () => {
            if (btn.classList.contains('clear-todos')) {
                todos.innerHTML = '';
            } else if (btn.classList.contains('clear-completed')) {
                completed.innerHTML = '';
            } else if (btn.classList.contains('clear-deleted')) {
                deleted.innerHTML = '';
            } else if (btn.classList.contains('clear-all')) {
                todos.innerHTML = '';
                completed.innerHTML = '';
                deleted.innerHTML = '';
            }
            saveTodos();
        });
    });

    window.addEventListener('beforeunload', saveTodos);



});