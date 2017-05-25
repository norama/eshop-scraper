import React from 'react';
import ReactDOM from 'react-dom';
import Scraper from './Scraper';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Scraper />, document.getElementById('root'));
registerServiceWorker();
