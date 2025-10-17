const React = require('react');
const ReactDOM = require('react-dom/client');
const axe = require('@axe-core/react');

module.exports = function initAxe() {
  if (process.env.NODE_ENV !== 'production') {
    axe(React, ReactDOM, 1000);
  }
};

