'use strict';

import { fetchData, xhrData } from '../lib/helpers/data';
import List from './components/list/list';
const fn = {};

fn.dom = function dom () {
  const subtree = document.getElementById('subtree');
  const attribute = document.getElementById('attribute');
  const nodeRemoval = document.getElementById('node-removal');
  const domBreakpoints = document.getElementById('dom-breakpoints');

  subtree.addEventListener('click', function () {
    const node = document.createElement('p');
    node.id = 'remove-me';
    node.className = 'bg-info';
    node.textContent = 'remove me';
    if (!document.getElementById('remove-me')) {
      domBreakpoints.appendChild(node)
    }
  });

  attribute.addEventListener('click', function () {
    domBreakpoints.querySelector('p').classList.add('hightlight');
  });

  nodeRemoval.addEventListener('click', function () {
    const removeMe = document.getElementById('remove-me');
    if (removeMe) {
      domBreakpoints.removeChild(removeMe);
    }
  });
}

fn.navigation = function navigate () {
  const navigation = document.querySelector('[data-trigger="navigation"]')
  const button = navigation.querySelector('button');
  var upperScopeVariable = 'foo';

  function upperScopeFunction (param) {
    var scopedVariable = param + 'bar';
    scopedVariable = scopedVariable.toUpperCase();
    return scopedFunction(scopedVariable);
  }
  function scopedFunction (anotherParam) {
    var scopedVariable = anotherParam.slice(1).toLowerCase();
    return anotherParam.slice(0, 1) + scopedVariable;
  }

  button.addEventListener('click', () => {
    var sillyCapFirst = upperScopeFunction(upperScopeVariable);
    var returnValue = `hello ${sillyCapFirst}`
    console.log(returnValue);
    return returnValue;
  });
}

fn.xhr = function xhr () {
  const section = document.querySelector('[data-trigger="xhr"]');
  const form = section.querySelector('form');
  const list = new List(document.getElementById('my-list'));
  const url = '//localhost:3000';
  const badJSONurl = '//localhost:3000/badjson';
  const getUrl = item => `${url}/${encodeURIComponent(item)}`;
  const badJSON = document.getElementById('bad-json');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const xhrURL = getUrl(this.elements[0].value);
    // set an XHR breakpoint
    fetchData(xhrURL).then(data => {
      list.render(data);
    });
  });
  badJSON.addEventListener('click', function () {
    xhrData(badJSONurl).then(data => {
      list.render(data);
    });
  });
}

Array.from(document.querySelectorAll('[data-trigger]')).forEach(section => {
  const trigger = section.dataset.trigger;
  const func = fn[trigger];
  const label = section.querySelector('[data-label]');
  section.addEventListener('click', () => {
    if (typeof func === 'function' && !section.dataset.initialized) {
      func();
      section.dataset.initialized = true;
      label.classList.remove('hidden')
    }
  });
});
