import React, { Component} from "react";
import "./App.css";

import { sqlframes, repl, repl_react } from '@sqlframes/repl-app/react';
import '@sqlframes/repl-app/styles';

const { DataFrame, SQL, Time, View } = sqlframes;
const { Scope, REPLView } = repl;
const { ReactREPL } = repl_react;

REPLView.addExtraLibs('/api/api.d.ts','api.d.ts');

class App extends Component{
	render(){
		return(
			<div className="App">
				<ReactREPL scope={Scope}/>
			</div>
		);
	}
}

export default App;