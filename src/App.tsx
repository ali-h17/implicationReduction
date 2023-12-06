import { useState } from 'react';
import Chart from './components/Chart';
import Table from './components/Table';
import StateNode from './interfaces/StateNode';
import './styles/App.css';
import test2 from './classes/TestInput';
import StateReducer from './classes/StateReducer';
import EquivalnceCircle from './components/EquivalenceCircle';

let stateReducer = new StateReducer([]);

function App(): JSX.Element {
	const [tableData, setTableData] = useState<StateNode[]>(test2);
	const [chartData, setChartData] = useState<StateNode[]>([]);
	const [reducedTable, setReducedTable] = useState<boolean>(false);
	const [isMealy, setisMealy] = useState<boolean>(true);
	const [runChart, setRunChart] = useState(false);
	const [message, setMessage] = useState('Click "Run Chart" to see the chart.');

	function handleRunChart() {
		const allStates = new Set<string>();
		//only run if all fields are filled
		for (let i = 0; i < tableData.length; i++) {
			allStates.add(tableData[i].currentState);
		}
		for (let i = 0; i < tableData.length; i++) {
			const row = tableData[i];
		
			if (
				row.currentState === '' ||
				row.firstNextState === '' ||
				row.secondNextState === '' ||
				row.output === '' ||
				(isMealy && row.secondOutput === '')
			) {
				setMessage('Please fill out all fields.');
				return;
			} else if (allStates.size !== tableData.length) {
				setMessage('Please make sure all states are unique.');
				return;
			} else if (allStates.has(row.firstNextState) === false || allStates.has(row.secondNextState) === false) {
				setMessage('Please make sure all next states are valid.');
				return;
			}
		
		}
		
		const currentTableData = [...tableData];
		
		
		stateReducer = new StateReducer(currentTableData);
		setChartData(currentTableData);
		setRunChart(true);
		setReducedTable(true);
	}

	return (
		<div className="container">
			<Table
				tableData={tableData}
				setTableData={setTableData}
				runChart={runChart}
				setRunChart={setRunChart}
				stateReducer={stateReducer}
				reducedTable={reducedTable}
				setReducedTable={setReducedTable}
				isMealy={isMealy}
				setIsMealy={setisMealy}
			/>

			<div className="chart-container">
				{runChart === false ? (
					<div className="box">
						<div className="warning">
							<span>{message}</span>
						</div>
						<button className="run-chart-btn" onClick={handleRunChart}>
							Run Chart
						</button>
					</div>
				) : (
					<>
						<Chart tableData={chartData} stateReducer={stateReducer} />
						<div className="equivalence-circle">
							<EquivalnceCircle stateReducer={stateReducer} />
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default App;
