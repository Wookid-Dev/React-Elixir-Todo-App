import React from 'react';
import ReactDOM from 'react-dom';

import '../css/app.css';
import TodoApp from './TodoApp';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('TodoApp');
  if (!container) return;
  ReactDOM.render(<TodoApp />, container);
});
