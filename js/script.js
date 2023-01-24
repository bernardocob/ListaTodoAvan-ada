/* Seleção de Elementos */
const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const editForm= document.querySelector('#editForm');
const editInput = document.querySelector('#editInput');
const cancelEditBtn= document.querySelector('#cancelEditBtn');
var filterSelect = document.querySelector("#filterSelect");

let oldInputValue;

/* Funções */
const saveTodo = (text) => {

    const todo = document.createElement('div')
    todo.classList.add('todo')

    const todoTittle = document.createElement("h3")
    todoTittle.classList.add('todoItemTitle')
    todoTittle.innerText = text
    todo.appendChild(todoTittle);

    const doneBtn = document.createElement('button')
    doneBtn.classList.add('finishTodo')
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn);

    const editBtn = document.createElement('button')
    editBtn.classList.add('editTodo')
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('removeTodo')
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value=""
    todoInput.focus()
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) =>{
        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text
        }
    })
}

/* Eventos */
todoForm.addEventListener("submit", (e) =>{
    e.preventDefault()

    const inputValue = todoInput.value

    if(inputValue){
        saveTodo(inputValue)

    }
});

document.addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finishTodo")) {
        parentEl.classList.toggle("done");
    }

    if(targetEl.classList.contains('removeTodo')) {
        parentEl.remove();
    }

    if(targetEl.classList.contains('editTodo')) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle
    }

});

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) =>{
    e.preventDefault()

    const editInputValue = editInput.value
    if(editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForms()
})


/* filtragem */

function filterTodoList() {
    // pegar o input de filtro
    var filterValue = document.getElementById("searchInput").value.toUpperCase();

    // pegar a lista
    var todoList = document.getElementById("todoList");

    // pegar os itens da lista
    var todoItems = todoList.getElementsByClassName("todoItemTitle");

    // Loop pelos itens 
    for (var i = 0; i < todoItems.length; i++) {
      var todoItem = todoItems[i];
      var todoText = todoItem.textContent || todoItem.innerText;

      // se o item não bater com a filtragem, esconder.
      if (todoText.toUpperCase().indexOf(filterValue) > -1) {
        todoItem.parentNode.style.display = "";
      } else {
        todoItem.parentNode.style.display = "none";
      }
    }
}

filterSelect.addEventListener("change", function() {
    var filterValue = filterSelect.value;
    var todoItems = todoList.getElementsByClassName("todo")

    for (var i = 0; i<todoItems.length; i++){
        var item = todoItems[i];

        if (filterValue === "all"){
            item.style.display = "";
        }else if (filterValue === "done" && item.classList.contains('done')){
            item.style.display = "";
        }else if ( filterValue === "todo" && !item.classList.contains('done')){
            item.style.display = "";
        } else {
            item.style.display = "none"
        }
    }
});





