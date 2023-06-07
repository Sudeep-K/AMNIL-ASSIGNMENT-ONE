const addTodo = (elem) => {
    const todoListContainerSelector = document.querySelector('.todo-list');
    let textValue = document.querySelector('input').value;
    
    if (elem) {
        textValue = elem.text;
    }

    const todoDivSelector = document.createElement('div');
    todoDivSelector.classList.add('todo');
    todoDivSelector.innerHTML = `
        <div class="checkbox ${ elem && elem.completed ? "active-checkbox" : "" }">
            <img src="./images/icon-check.svg" alt="checkbox">
        </div>
        <p>${textValue}</p>
        <button class="close">
            <img src="./images/icon-cross.svg" alt="cross">
        </button>
    `
    todoListContainerSelector.prepend(todoDivSelector);
    saveTodo();

    const deleteButtonSelector = document.querySelector('.close');
    deleteButtonSelector.addEventListener('click', () => {
        todoDivSelector.remove();
        saveTodo();
    });

    const checkboxSelector = document.querySelector('.checkbox');
    checkboxSelector.addEventListener('click', () => {
        checkboxSelector.classList.toggle('active-checkbox');
        saveTodo();
    })

    document.querySelector('input').value = '';
}

const filterAddTodo = (elem) => {
    const todoListContainerSelector = document.querySelector('.todo-list');
    let textValue = document.querySelector('input').value;
    
    if (elem) {
        textValue = elem.text;
    }

    const todoDivSelector = document.createElement('div');
    todoDivSelector.classList.add('todo');
    todoDivSelector.innerHTML = `
        <div class="checkbox ${ elem && elem.completed ? "active-checkbox" : "" }">
            <img src="./images/icon-check.svg" alt="checkbox">
        </div>
        <p>${textValue}</p>
        <button class="close">
            <img src="./images/icon-cross.svg" alt="cross">
        </button>
    `
    todoListContainerSelector.prepend(todoDivSelector);
    
    const deleteButtonSelector = document.querySelector('.close');
    deleteButtonSelector.addEventListener('click', () => {
        todoDivSelector.remove();
    });

    const checkboxSelector = document.querySelector('.checkbox');
    checkboxSelector.addEventListener('click', () => {
        checkboxSelector.classList.toggle('active-checkbox');
    })
}

const saveTodo = () => {
    /* count of items now */
    const itemsCount = document.querySelector('.items-count');
    itemsCount.innerText = document.querySelectorAll('.todo').length  + ' items left';

    const todoValueSelector = document.querySelectorAll('.todo > p');
    const todosArr = [];

    todoValueSelector.forEach((todo) => {
        todosArr.push({
            text: todo.innerText,
            completed: todo.previousElementSibling.classList.contains('active-checkbox')
        });
    })

    localStorage.clear();
    localStorage.setItem('todosArr', JSON.stringify(todosArr));
}

const formSelector = document.querySelector('form');
formSelector.addEventListener('submit', (event) => {
    event.preventDefault();
    addTodo(null);
});

/* fetch from localstorage and update accordingly */
const todosArr = JSON.parse(localStorage.getItem('todosArr'));
if (todosArr) {
    todosArr.forEach((todo) => {
        addTodo(todo);
    })
}

const renderFilterData = (filterType) => {
    let todoListContainerSelector = document.querySelector('.todo-list');
    while (todoListContainerSelector.childNodes.length > 2) {
        todoListContainerSelector.removeChild(todoListContainerSelector.firstChild);
    }

    if (filterType == 'all') {
        if (JSON.parse(localStorage.getItem('todosArr'))) {
            JSON.parse(localStorage.getItem('todosArr')).forEach((todo) => {
                filterAddTodo(todo);
            })
        }
    } else if (filterType == 'active') {
        if (JSON.parse(localStorage.getItem('todosArr'))) {
            const todosArrayRender = JSON.parse(localStorage.getItem('todosArr')).filter((todo) => {
                return todo.completed == false;
            })
            todosArrayRender.forEach((todo) => {
                filterAddTodo(todo);
            })
        }
    } else if (filterType == 'completed') {
        if (JSON.parse(localStorage.getItem('todosArr'))) {
            const todosArrayRender = JSON.parse(localStorage.getItem('todosArr')).filter((todo) => {
                return todo.completed == true;
            })
            todosArrayRender.forEach((todo) => {
                filterAddTodo(todo);
            })
        }
    }
}

const filterSelectors = document.querySelectorAll('.filter-choice>div');
filterSelectors.forEach((filter) => {
    filter.addEventListener('click', () => {
        filterSelectors.forEach((fil) => {
            fil.classList.remove('active-filter');
        })
        filter.classList.add('active-filter');
        
        if (filter.classList.contains('all')) {
            renderFilterData('all');
        } else if (filter.classList.contains('active')) {
            renderFilterData('active');
        } else if (filter.classList.contains('completed')) {
            renderFilterData('completed');
        }
    })
})

const clearCompleted = document.querySelector('.clear-completed');
clearCompleted.addEventListener('click', () => {
    let todosArr = JSON.parse(localStorage.getItem('todosArr'));
    todosArr = todosArr.filter((todo) => todo.completed == false);
    localStorage.setItem('todosArr', JSON.stringify(todosArr));

    let todoListContainerSelector = document.querySelector('.todo-list');
    while (todoListContainerSelector.childNodes.length > 2) {
        todoListContainerSelector.removeChild(todoListContainerSelector.firstChild);
    }
    
    if (todosArr) {
        todosArr.forEach((todo) => {
            addTodo(todo);
        })
    }
})