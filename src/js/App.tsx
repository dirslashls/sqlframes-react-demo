import React, { Component, useMemo } from "react";
import "./App.css";
import { REPLReact } from "./REPLReact";

// this is an example to bundle SQL Frames directly into the app

// Destructuring assignment of the exported namespaces 
import { sqlframes } from '@sqlframes/repl-app';
import SQLFramesComponent from "./SQLFramesComponent";

// All the top level classes and objects exported in the namespaces
const { DataFrame, SQL, Time, View } = sqlframes;

class App extends Component{
	render(){
		return <REPLReact/>
	}
}

const ChartApp = () => {
	const [df,chart] = useMemo(() => {
		const df = DataFrame.fromURL('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
		const { groupBy, where: { eq }, agg: { count } } = SQL;
		const gdf = df.gdf(groupBy('type'));
		return [df,gdf.chart.bar('type','Count')
					.resize(600,400)
					.svg()];
	},[]);

	return (
		<>
			<SQLFramesComponent value={chart}/>
			<SQLFramesComponent value={df}/>
		</>
	)
}

export default App;

export { ChartApp };