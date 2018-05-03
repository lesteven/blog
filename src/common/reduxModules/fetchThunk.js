require('es6-promise').polyfill();
require('isomorphic-fetch');
require('babel-core/register');
require('babel-polyfill');

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

export function postFile(url, method, data, cb) {
  return (dispatch) => {
    fetch(url, {
      method,
      body: data,
  })
    .then(res => res.json())
    .catch(err => console.log('error', err))
    .then(json => {
      if (cb) {
//        console.log(json);
        dispatch(cb(json));
      }
    })
  }
}


