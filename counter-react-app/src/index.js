import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './Counter';

ReactDOM.render(
  <React.StrictMode>
    <Counter value={5} />
  </React.StrictMode>,
  document.getElementById('root')
);
