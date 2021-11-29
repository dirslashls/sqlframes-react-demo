import React, { useRef, useEffect } from 'react';
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

export default ReactREPL;

const DataFrameComponent = function({ df }) {
	const ref = useRef(null);

	useEffect(() => {
		View.render(ref.current,df);
	});

	return (
		<div ref={ref}></div>
	)
}