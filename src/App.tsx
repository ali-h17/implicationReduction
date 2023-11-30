import { useState, useMemo } from 'react';
import Chart from './components/Chart';
import Table from './components/Table';
import StateNode from './interfaces/StateNode';
import './styles/App.css';
// import testInput from './classes/TestInput'; 
import test2 from './classes/TestInput';
import StateReducer from './classes/StateReducer';
import EquivalnceCircle from './components/EquivalenceCircle';

function App(): JSX.Element {
	const [tableData, setTableData] = useState<StateNode[]>(test2);
	const stateReducer = useMemo(() => new StateReducer(tableData), [tableData]);


//	const [dependencyMap, setDependencyMap] = useState<Map<string, string[]>>();

	const [runChart, setRunChart] = useState(false);
	const [message, setMessage] = useState(
		'Visualization will only work for 10 states or less.'
	);

	function handleRunChart() {
		//only run if all fields are filled
		for (let i = 0; i < tableData.length; i++) {
			const row = tableData[i];
			if (
				row.currentState === '' ||
				//row.input === '' ||
				row.firstNextState === '' ||
				row.secondNextState === '' ||
				row.output === '' ||
				row.secondOutput === ''
			) {
				setMessage('Please fill out all fields.');
				return;
			}
		}
		setRunChart(true);
	}

	return (
		<div className="container">
			<Table
				tableData={tableData}
				setTableData={setTableData}
			/>
			

			<div className="chart-container">
				{runChart === false ? (
					<div className='box'>
						<div className="warning">
							<span>{message}</span>
						</div>
						<button className='run-chart-btn' onClick={handleRunChart}>Run Chart</button>
					</div>
				) : (
					<>
						<Chart tableData={tableData} stateReducer={stateReducer} />
						<div className='equivalence-circle'>
							<EquivalnceCircle stateReducer={stateReducer} />
						</div>
					</>
				)}

			</div>

		</div>
	);
}

export default App;
