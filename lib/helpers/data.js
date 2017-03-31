'use strict';

export const fetchData = url => {
  return window.fetch(url).then(res => res.json());
}
export const xhrData = url => {
  return new Promise(function xhrPromise (resolve, reject) {
    var xhr = new window.XMLHttpRequest();
    xhr.addEventListener('readystatechange', function readyStateListener () {
      if (xhr.readyState === window.XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const json = JSON.parse(xhr.responseText);
          return resolve(json);
        }
        return reject(new Error('no sir'))
      }
    })
    xhr.open('GET', url, true);
    xhr.send();
  });
}
