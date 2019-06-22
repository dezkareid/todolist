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

window.addEventListener('load', function () {
  loadList()
})
