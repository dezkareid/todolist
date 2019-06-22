/* global fetch */
const BASE_URL = 'http://localhost:3000/'

function loadList () {
  getList()
    .then(createList)
    .catch(console.error)
}

function getList () {
  return fetch(`${BASE_URL}items`)
    .then(response => response.json())
}

function createList (listItems) {
  const elementId = 'todo-list'
  const listElement = document.getElementById(elementId)
  for (const item of listItems) {
    const itemElement = createListItem(item)
    listElement.appendChild(itemElement)
  }
}

function createListItem (item) {
  const liElement = document.createElement('li')
  liElement.innerHTML = `
    <p>${item.text}</p>
    <button>Eliminar</button>
  `
  return liElement
}

function createTask () {
  const text = document.getElementById('add-task-area').value
  const task = { text }
  saveTask(task)
    .then(console.log)
    .catch(console.error)
}

function saveTask (task) {
  return fetch(`${BASE_URL}items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
    .then(response => response.json())
}

function onSubmitFormAddTask (event) {
  event.preventDefault()
  createTask()
}

function suscribeToFormAddTaskSubmit () {
  const form = document.getElementById('add-task')
  form.addEventListener('submit', onSubmitFormAddTask)
}

window.addEventListener('load', function () {
  loadList()
  suscribeToFormAddTaskSubmit()
})
