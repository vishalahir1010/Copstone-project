import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import { addSong } from './actions/songActions';
import App from './App';
import './index.css';

// Part 3: dispatch two addSong actions and log the resulting state
store.dispatch(addSong('Kesariya'));
store.dispatch(addSong('Shape of You'));
console.log('Updated playlist state:', store.getState());
// -> Updated playlist state: ['Kesariya', 'Shape of You']

// Part 4: Provider makes the store available to the whole component tree
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
