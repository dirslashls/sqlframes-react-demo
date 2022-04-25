import React, { Component, createRef} from "react";

// this is an example to bundle SQL Frames directly into the app

// Destructuring assignment of the exported namespaces 
import { sqlframes, repl } from '@sqlframes/repl-app';
// to ensure the css is also bundled into the application css bundle
import '@sqlframes/repl-app/styles';

// All the top level classes and objects exported in the namespaces
const { DataFrame, SQL, Time, View } = sqlframes;
const { REPL, REPLView } = repl;

// for autosuggest of the SQL Frames API within the REPL editor
REPLView.addExtraLibs('/api/api.d.ts','api.d.ts');

class REPLReact extends Component{
	replRef = createRef<HTMLDivElement>();
	render(){
		return(
			<div ref={this.replRef} className="App">
			</div>
		);
	}

	componentDidMount() {
		const _repl = new REPL();
		View.render(this.replRef.current,_repl);
	}
}

export { REPLReact };
