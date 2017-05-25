import React from 'react';
import styles from './Scraper.css';

export default class Scraper extends React.PureComponent {
	constructor(props) {
		super(props);
		
		this.state = {
			xpath: ''
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
 
	render() {
		return(
			<form onSubmit={this.handleSubmit}>
				<label>
				XPath:
				<input type="text" name="xpath" value={this.state.xpath} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
	
	handleChange(event) {
		const xpath = event.target.value;
		console.log('xpath', xpath);
		this.setState({
			xpath
		});
	}
	
	handleSubmit() {
		alert(this.state.xpath);
	}
};

