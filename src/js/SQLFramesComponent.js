import React, { useRef, useEffect, useLayoutEffect } from 'react';
import * as sf from '@sqlframes/repl-app';
// to ensure the css is also bundled into the application css bundle
import '@sqlframes/repl-app/styles';

function SQLFramesComponent({ value }) {
	const ref = useRef(null);
	const { View } = sf.sqlframes;

	useLayoutEffect(() => {
		View.render(ref.current,value);
	},[value]);

	useEffect(() => {
		const e = ref.current;
		return () => { View.render(e,null); };
	},[]);

	return (
		<div className="sf" ref={ref}></div>
	)
}

export default SQLFramesComponent;