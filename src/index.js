import React from 'react';
import ReactDOM from 'react-dom';
import Scraper from './Scraper';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import {configCategories, defaultValuesCategories} from './config/categories';

ReactDOM.render(<Scraper config={configCategories} defaultValues={defaultValuesCategories} />, document.getElementById('root'));
registerServiceWorker();
