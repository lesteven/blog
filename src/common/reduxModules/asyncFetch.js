require('es6-promise').polyfill();
require('isomorphic-fetch');


export function fetchData(url) {
  return fetch(url, { credentials: 'same-origin' })
}

