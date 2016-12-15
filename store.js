const KEY = 'todomvc-amcd';

export default {
  fetch: () => JSON.parse(localStorage.getItem(KEY) || '[]'),
  save: items => { localStorage.setItem(KEY, JSON.stringify(items)) }
}