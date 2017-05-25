import React from 'react';
import ReactDOM from 'react-dom';
import Scraper from './Scraper';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import {configCategories, defaultValuesCategories} from './config/categories';
import {configProducts, defaultValuesProducts} from './config/products';
import {configProductDetails, defaultValuesProductDetails} from './config/productDetails';


ReactDOM.render(<div><Scraper config={configCategories} defaultValues={defaultValuesCategories} /><Scraper config={configProducts} defaultValues={defaultValuesProducts} /><Scraper config={configProductDetails} defaultValues={defaultValuesProductDetails} /></div>, document.getElementById('root'));
registerServiceWorker();
