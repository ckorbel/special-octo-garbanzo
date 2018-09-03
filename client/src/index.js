import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Sidebar from './components/sidebar/sidebar';

ReactDOM.render(<Sidebar />, document.getElementById('root'));
registerServiceWorker();
