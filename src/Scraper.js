import React from 'react';
import './Scraper.css';
import './MessageBoxes.css'

import XPathAnalyzer from 'xpath-analyzer';
import validUrl from 'valid-url';
import _ from 'lodash';

import api from './api';


export default class Scraper extends React.PureComponent {
	constructor(props) {
		super(props);
		
		this.config = this.props.config.elements.reduce((acc, configItem) => {
			acc[configItem.id] = {
				type: configItem.type,
				mandatory: configItem.mandatory
			};
			return acc;
		}, {});
		
		this.ids = this.props.config.elements.reduce((acc, configItem) => {
			acc.push(configItem.id);
			return acc;
		}, []);
				
		this.state = {
			values: this.props.defaultValues,
			errors: {},
			categories: {},
			categoriesError: null
		};
		
		this.api = new api();
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showCategories = this.showCategories.bind(this);
		this.failCategories = this.failCategories.bind(this);
	}
 
	render() {
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					{this.elements()}
					<input type="submit" value="Submit" />
				</form>
				<div className='categories'>
					{this.categories()}
				</div>
			</div>
		);
	}
	
	elements() {
		let elements = [];
		
		this.props.config.elements.forEach((item) => {
			elements.push(this.element(item));
		});
		
		return elements;

	}

	element(item) {
		const error = this.state.errors[item.id];
		return (
			<div key={item.id}>
				<label>
					{item.name + ' (' + this.config[item.id].type + ')'}
					<input type="text" id={item.id} name={item.name} value={this.state.values[item.id] || ''} onChange={this.handleChange} className={!error ? 'validInput' : 'invalidInput'} />
				</label>
				{error ?
				(<div className='error'>
					{error.message}
				</div>) : null}
			</div>
		);
	}

	categories() {
		return this.state.categoriesError ?
				(<div className='error'>
					{this.state.categoriesError.message}
				</div>) : 
			(<pre>{JSON.stringify(this.state.categories, undefined, 4)}</pre>);
	}
	
	handleChange(event) {
		let values = _.clone(this.state.values);
		values[event.target.id] = event.target.value;
		let errors = _.clone(this.state.errors);
		delete errors[event.target.id];
		this.setState({
			values,
			errors
		});
	}
	
	handleSubmit(event) {
		event.preventDefault();
		event.stopPropagation();
		
		const errors = this.validate();

		this.setState({
			errors
		}, () => {
			if (_.size(this.state.errors) === 0) {
				this.api.get(this.props.config.url, this.state.values, this.showCategories, this.failCategories);
			}
		});
	}

	showCategories(categories) {
		this.setState({
			categories: categories
		});
	}

	failCategories(jqXHR, textStatus, errorThrown) {
		this.setState({
			categoriesError: errorThrown
		});
	}

	validate() {
		let errors = {};
		this.ids.forEach((id) => {
			let error = this.validateItem(id);
			if (error) {
				errors[id] = error;
			}
		});
		return errors;
	}

	validateItem(id) {
		const value = this.state.values[id];
		if (!this.config[id].mandatory && value.trim().length === 0) {
			return null;
		}
		
		switch (this.config[id].type) {
			case 'url': 
				return this.validateUrl(value);
			case 'xpath':
				return this.validateXPath(value);
			default:
				console.error('Unknown type for id: ' + id, this.config[id].type);
				return null;
		}
	}

	validateUrl(value) {
		const valid = validUrl.isUri(value);
		if (valid) {
			return null;
		} else {
			console.error('URL syntax check failed.', value);
			return new ValidationException('Invalid URL: '+value);
		}
	}

	validateXPath(value) {
		try {
			const analyzer = new XPathAnalyzer(value);
			analyzer.parse();

			return null;
		} catch (ex) {
			console.error('XPath syntax check failed.', ex);

			return ex;
		}
	}
};

function ValidationException(message) {
	this.message = message;
	this.name = 'Validation';
}



