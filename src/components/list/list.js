'use strict';

class List {
  constructor (element, data) {
    if (!element || !(element instanceof window.HTMLUListElement)) {
      throw new Error('give me an unordered list');
    }
    this.element = element;
    if (typeof data === 'object') {
      this.data = data;
    }
  }
  render (data) {
    if (this.data) {
      data = this.data;
    }
    var listItems = getListItems(data)
    this.element.appendChild(listItems);
  }
}

function getListItems (data) {
  return data.reduce((fragment, item) => {
    var element = document.createElement('li');
    element.textContent = item.title;
    fragment.appendChild(element);
    return fragment;
  }, document.createDocumentFragment());
}
export default List;
