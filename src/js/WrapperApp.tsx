import React, { Component} from "react";
import "./App.css";
import Wrapper from './Wrapper';

export default class WrapperApp extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render(){
		if((this.state as any).load) {
			return (
				<Wrapper/>
			)
		}
		return(
			<div className="App">
				<button onClick={this.load}>Load SQL Frames</button>
			</div>
		);
	}

	load = (evt) => {
		this.setState({ load: true });
	}
}