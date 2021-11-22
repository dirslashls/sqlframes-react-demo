import React, { Component} from "react";
import "./App.css";

// this is an example to bundle SQL Frames directly into the app

// Destructuring assignment of the exported namespaces 
import { sqlframes, repl, repl_react } from '@sqlframes/repl-app/react';
// to ensure the css is also bundled into the application css bundle
import '@sqlframes/repl-app/styles';

// All the top level classes and objects exported in the namespaces
const { DataFrame, SQL, Time, View } = sqlframes;
const { REPL, REPLView } = repl;
const { ReactREPL } = repl_react;

// for autosuggest of the SQL Frames API within the REPL editor
REPLView.addExtraLibs('/api/api.d.ts','api.d.ts');

class App extends Component{
	render(){
		return(
			<div className="App">
				<ReactREPL/>
			</div>
		);
	}
}

export default App;