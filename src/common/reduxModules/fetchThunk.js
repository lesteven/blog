require('es6-promise').polyfill();
require('isomorphic-fetch');
// action thunk

export function fetchData(url, cb) {
  return (dispatch) => {
    fetch(url, { credentials: 'same-origin' })
      .then(res => res.json())
      .then((data) => {
        if (cb) {
          cb(data);
        }
      });
  };
}

export function postData(url, method, data, cb) {
  return (dispatch) => {
    fetch(url, {
      method,
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then((json) => {
        if (cb) {
          cb(json);
        }
      })
      .catch((err) => {
        console.error('there was an error', err);
      });
  };
}
