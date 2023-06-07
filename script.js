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
}

const saveTodo = () => {
    /* count of items now */
    const itemsCount = document.querySelector('.items-count');
    itemsCount.innerText = document.querySelectorAll('.todosArr').length + ' items left';
    
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