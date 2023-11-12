import { useState } from 'react';
import Chart from './components/Chart';
import Table from './components/Table';
import StateNode from './interfaces/StateNode';
import './styles/App.css';

const initialTableData: StateNode[] = [
	{
		currentState: 'a',
		input: '',
		firstNextState: 'a',
		secondNextState: 'b',
		output: '0',
	},
	{
		currentState: 'b',
		input: '',
		firstNextState: 'b',
		secondNextState: 'd',
		output: '1',
	},
	{
		currentState: 'c',
		input: '',
		firstNextState: 'c',
		secondNextState: 'd',
		output: '1',
	},
	{
		currentState: 'd',
		input: '',
		firstNextState: 'b',
		secondNextState: 'a',
		output: '0',
	},
];

function App(): JSX.Element {
	const [tableData, setTableData] = useState<StateNode[]>(initialTableData);

	const [runChart, setRunChart] = useState(false);
	const [message, setMessage] = useState(
		'Visualization will only work for 10 states or less.'
	);

	return (
		<div className="container">
			<Table
				tableData={tableData}
				setTableData={setTableData}
				setRunChart={setRunChart}
				setMessage={setMessage}
			/>

			<div className="chart-container">
				{runChart === false ? (
					<div className="warning">
						<span>{message}</span>
					</div>
				) : (
					<Chart tableData={tableData} />
				)}
			</div>
		</div>
	);
}

export default App;
