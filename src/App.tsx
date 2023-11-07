import { useState } from 'react';
import Chart from './components/Chart';
import Table from './components/Table';
import TableRowInterface from './interfaces/TableRowInterface';
import './styles/App.css';

const initialTableData: TableRowInterface[] = [
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
	const [tableData, setTableData] =
		useState<TableRowInterface[]>(initialTableData);

	const [runChart, setRunChart] = useState(false);

	return (
		<div className="container">
			<Table
				tableData={tableData}
				setTableData={setTableData}
				setRunChart={setRunChart}
			/>

			{runChart &&<Chart tableData={tableData} />}
		</div>
	);
}

export default App;
