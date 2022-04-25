import React, { Component, useRef, useEffect } from "react";
import "./App.css";
import { REPLReact } from "./REPLReact";
import { DataFrameComponent } from "./DataFrameComponent";

// this is an example to bundle SQL Frames directly into the app

// Destructuring assignment of the exported namespaces 
import { sqlframes, repl } from '@sqlframes/repl-app';
// to ensure the css is also bundled into the application css bundle
import '@sqlframes/repl-app/styles';

// All the top level classes and objects exported in the namespaces
const { DataFrame, SQL, Time, View } = sqlframes;

class App extends Component{
	render(){
		return <REPLReact/>
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
			<DataFrameComponent df={df}/>
		</div>
	)
}

export default App;

export { ChartApp };