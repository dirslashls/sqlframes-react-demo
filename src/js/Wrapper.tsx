import React from 'react';
import loadable from '@loadable/component';
import { libs, monacoURL } from '@sqlframes/repl-app/client/dependencies';


async function loadDependencies() {
	const require = globalThis.require as any;
	const define = globalThis.define as any;
	require.config({ paths: libs });
	define('monaco-editor',['vs/editor/editor.main'],(m) => m);
	define('htm/preact',['htm','preact'],(htm,preact) => ({ html: htm.bind(preact.h), ...preact}));
	require(['htm/preact'],(m) => {
		globalThis.htm_preact = m;
	});

	// dynamic modlules - these are defined as undefined if not already present so they are loaded ondemand
	define('exceljs',() => globalThis.exceljs ?? void 0);
	define('lunr',() => globalThis.lunr ?? void 0);
	define('cytoscape',() => globalThis.cytoscape ?? void 0);
	define('jsonify',() => JSON);
	define('sqlframes',['htm','preact','echarts','exceljs','monaco-editor','lunr','@yaireo/tagify','acorn','interactjs','dompurify','eta','papaparse','highlightjs','cytoscape'],
						(htm,preact,echarts,exceljs,monaco,lunr,Tagify,acorn,interact,DOMPurify,Eta,papaparse,highlightjs,cytoscape) => {
		globalThis.htm = htm;
		globalThis.preact = preact;
		globalThis.echarts = echarts;
		globalThis.ExcelJS = exceljs;
		globalThis.monaco = monaco;
		globalThis.lunr = lunr;
		globalThis.cytoscape = cytoscape;
		if(!globalThis.Tagify) globalThis.Tagify = Tagify;
		globalThis.acorn = acorn;
		globalThis.interact = interact;
		globalThis.DOMPurify = DOMPurify;
		globalThis.Eta = Eta;
		globalThis.papaparse = papaparse;
		if(!globalThis.hljs) globalThis.hljs = highlightjs;
		globalThis.hljsSql = void 0;
	});
	return new Promise((resolve) => {
		require(['monaco-editor'],(monaco) => {
			globalThis.MonacoEnvironment = {
				getWorkerUrl: function(workerId, label) {
					const js = `/* ${label} */
					self.MonacoEnvironment = {
						baseUrl: '${monacoURL}'
					};
					importScripts('${monacoURL}vs/base/worker/workerMain.js');`;
					var blob = new Blob([js], { type: 'application/javascript' });
					return URL.createObjectURL(blob);
				}
			};
		});
		require(['sqlframes'],(sv) => {
			resolve(sv);
		});
		require(['echarts/extension/dataTool'],(m) => globalThis.dataTool = m);
	});
}

export default loadable(async () => {
	console.debug('loading');
	await loadDependencies();
	return import('./WrapperImpl');
},{
	fallback: <div style={{height:'5em'}}><div className="loader">Loading...</div></div>
})