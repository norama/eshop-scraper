import React from 'react';
import './Scraper.css';
import './MessageBoxes.css'

import XPathAnalyzer from 'xpath-analyzer';

export default class Scraper extends React.PureComponent {
	constructor(props) {
		super(props);
		
		this.state = {
			xpath: '',
			xpathError: null
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
 
	render() {
		return(
			<form onSubmit={this.handleSubmit}>
				<label>
				XPath:
				<input type="text" name="xpath" value={this.state.xpath} onChange={this.handleChange} className={!this.state.xpathError ? 'validInput' : 'invalidInput'} />
				</label>
				{this.state.xpathError ?
				(<div className='error'>
					{this.state.xpathError.message}
				</div>) : null}
				<input type="submit" value="Submit" />
			</form>
		);
	}
	
	handleChange(event) {
		const xpath = event.target.value;
		this.setState({
			xpath,
			xpathError: null
		});
	}
	
	handleSubmit(event) {
		const xpathError = validateXPath(this.state.xpath);
		if (xpathError) {
			event.preventDefault();
			event.stopPropagation();
		}
		this.setState({
			xpathError
		}, () => {
			if (!this.state.xpathError) {
				// TODO
				console.log('xpath', this.state.xpath);
			} 
		});
	}
};

function validateXPath(xpath) {
	try {
		const analyzer = new XPathAnalyzer(xpath);
		analyzer.parse();
		
		return null;
	} catch (ex) {
		console.error('XPath syntax check failed.', ex);
		
		return ex;
	}
}

