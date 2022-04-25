import React, { useRef, useEffect } from 'react';
// Destructuring assignment of the exported namespaces 
import { sqlframes } from '@sqlframes/repl-app';
// to ensure the css is also bundled into the application css bundle
import '@sqlframes/repl-app/styles';

// All the top level classes and objects exported in the namespaces
const { View } = sqlframes;

const DataFrameComponent = function({ df }) {
	const ref = useRef(null);

	useEffect(() => {
		View.render(ref.current,df);
	});

	return (
		<div ref={ref}></div>
	)
}

export { DataFrameComponent };