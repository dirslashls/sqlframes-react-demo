import React, { useMemo} from "react";

// this is an example to bundle SQL Frames directly into the app
import * as sf from '@sqlframes/repl-app';
import SQLFramesComponent from "./SQLFramesComponent";

// All the top level classes and objects exported in the namespaces
const { REPLView } = sf.repl;
// for autosuggest of the SQL Frames API within the REPL editor
REPLView.addExtraLibs('/api/api.d.ts','api.d.ts');

function REPLReact() {
	const repl = useMemo(() => {
		return new sf.repl.REPL();
	},[]);
	return <SQLFramesComponent value={repl}/>;
}


export { REPLReact };
