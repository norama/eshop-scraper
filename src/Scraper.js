import React from 'react';
import './Scraper.css';
import './MessageBoxes.css'

import XPathAnalyzer from 'xpath-analyzer';
import validUrl from 'valid-url';
import _ from 'lodash';

import config from './config';

export default class Scraper extends React.PureComponent {
	constructor(props) {
		super(props);
		
		this.config = config.elements.reduce((acc, configItem) => {
			acc[configItem.id] = {
				type: configItem.type,
				mandatory: configItem.mandatory
			};
			return acc;
		}, {});
		
		this.ids = config.elements.reduce((acc, configItem) => {
			acc.push(configItem.id);
			return acc;
		}, []);
		
		let values = {};
		this.ids.forEach((id) => {
			values[id] = '';
		});
		
		this.state = {
			values: values,
			errors: {}
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
 
	render() {
		return(
			<form onSubmit={this.handleSubmit}>
				{this.elements()}
				<input type="submit" value="Submit" />
			</form>
		);
	}
	
	elements() {
		let elements = [];
		
		config.elements.forEach((item) => {
			elements.push(this.element(item));
		});
		
		return elements;

	}

	element(item) {
		const error = this.state.errors[item.id];
		return (
			<div key={item.id}>
				<label>
					{item.name}
					<input type="text" id={item.id} name={item.name} value={this.state.values[item.id] || ''} onChange={this.handleChange} className={!error ? 'validInput' : 'invalidInput'} />
				</label>
				{error ?
				(<div className='error'>
					{error.message}
				</div>) : null}
			</div>
		);
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
		const errors = this.validate();
		if (_.size(errors) > 0) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.setState({
			errors
		}, () => {
			if (_.size(this.state.errors) === 0) {
				// TODO
				console.log('----------- SUCCESS');
			} 
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



