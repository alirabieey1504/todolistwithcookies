const itemInput = document.getElementById('itemInput')

const addButton = document.getElementById('addButton')

const clearButton = document.getElementById('clearButton')
const todoListelem = document.getElementById('todoList')


function addnewtodo(title) {
   
    let todo = {
        id: getcookies().length + 1,
        'title': title,
        iscomplete: false
    }

    setcookie(todo)
}


addButton.addEventListener('click', () => {
    addnewtodo(itemInput.value)

    settodoitem(getcookies())

    itemInput.focus()
})

function setcookie(todo) {

    let array = getcookies()

    array.push(todo)


    const date = new Date()
    date.setTime(date.getTime() + 2 * 24 * 60 * 60 * 1000)
    expires = 'expires=' + date.toUTCString()
    document.cookie = `todos=${JSON.stringify(array)};${expires};path=/`
}


function settodoitem(todos) {

    if(todos==[]){
        console.log( document.querySelectorAll('.todo'));
        return;
    }
    todoListelem.innerHTML = ''
    todos.forEach((todo) => {
        const linew = document.createElement('li')
        let labelnew = document.createElement('label')
        let btncom = document.createElement('button')
        let btnde = document.createElement('button')
        linew.className = 'todo completed well'

        linew.append(labelnew, btncom, btnde)
        todoListelem.append(linew)
        labelnew.innerHTML = todo.title
        itemInput.value = ''

        btncom.className = 'btn btn-success'
        btnde.className = 'btn btn-danger'

        btncom.innerHTML = 'Complete'
        btnde.innerHTML = 'Delete'
        console.log(todo);
        if (todo.iscomplete == true) {
            linew.classList.replace('completed', 'uncompleted')
            btncom.innerHTML = 'UnComplete'
        }
        else if (todo.iscomplete == false) {
            linew.classList.replace("uncompleted", "completed")
            btncom.innerHTML = 'Complete'

        }

        btnde.setAttribute('onclick', 'removecokie(' + JSON.stringify(todo) + ')')
        btncom.setAttribute('onclick', 'edittodo(' + JSON.stringify(todo) + ')')

    });
}


function edittodo(todo) {

    console.log(todo);
    let array = getcookies()
    console.log(array);
    array.map(function (item) {
        if (todo.id == item.id) {
            item.iscomplete = !item.iscomplete
            console.log(item);
            return item
        }
    })

    const date = new Date()
    date.setTime(date.getTime() + 2 * 24 * 60 * 60 * 1000)
    expires = 'expires=' + date.toUTCString()

    document.cookie = `todos=${JSON.stringify(array)};${expires};path=/`

    settodoitem(array)


}



function removecokie(todo) {

    let array = getcookies()

    let indexo = array.findIndex(function (arr) {
        if (todo.id == arr.id) {
            return arr
        }

    })
    array.splice(indexo, 1)

    let newarray=[]
    for(let i=0;i<array.length;i++){
       let todo=  array[i]
       todo.id=i+1
       newarray.push(todo)
    }
    const date = new Date()
    date.setTime(date.getTime() + 2 * 24 * 60 * 60 * 1000)
    expires = 'expires=' + date.toUTCString()

    document.cookie = `todos=${JSON.stringify(newarray)};${expires};path=/`

    settodoitem(array)


}

function getcookies() {
    let me = null
    let a = getCookie("todos")

    let data = a ? a : "[]"
    return JSON.parse(data)
}

function getCookie(cname) {
    let name = cname + "=";

    let cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];

        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return "";
}





window.addEventListener('load', () => {
    let list = getcookies()

    settodoitem(list)

})

setcooki([])
todoListelem.innerHTML = ''


function clearecookie() {

    const date = new Date()
    date.setTime(date.getTime() - 2 * 24 * 60 * 60 * 1000)
    expires = 'expires=' + date.toUTCString()
    document.cookie = `todos=${JSON.stringify([])};${expires};path=/`
    settodoitem([])
}



clearButton.addEventListener('click', clearecookie)

function keypenter(event) {
    if (event.keyCode === 13) {
        addnewtodo(itemInput.value)

        settodoitem(getcookies())

        itemInput.focus()

    }

}

itemInput.addEventListener('keypress', keypenter)
