import TodoList from './TodoList.html'
import store from './store.js'

const todoList = new TodoList({
  target: document.querySelector('main'),
  data: { items: store.fetch() }
})

todoList.observe('items', items => {
  store.save(items)
})