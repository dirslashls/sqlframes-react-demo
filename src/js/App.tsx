import React, { Component, useRef, useEffect, createRef} from "react";
import "./App.css";

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

class App extends Component{
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

const ChartApp = () => {
	const chartRef = useRef(null);
	const df = DataFrame.fromURL('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
	const { groupBy, where: { eq }, agg: { count } } = SQL;
	const chart = () => {
		const gdf = df.gdf(groupBy('type'));
		return gdf.chart.bar('type','Count')
					.resize(600,400)
					.svg();
	};

	useEffect(() =>{
		View.render(chartRef.current,chart());
	});

	return (
		<div>
			<div ref={chartRef}></div>
		</div>
	)
}

export default App;

export { ChartApp };