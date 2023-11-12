import '../styles/Table.css';
import StateNode from '../interfaces/StateNode';
import TableRow from './TableRow';

interface TableProps {
	tableData: StateNode[];
	setTableData: React.Dispatch<React.SetStateAction<StateNode[]>>;
	setRunChart: React.Dispatch<React.SetStateAction<boolean>>;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
}
function Table({
	tableData,
	setTableData,
	setRunChart,
	setMessage,
}: TableProps): JSX.Element {
	const handleAddRow = () => {
		setTableData([
			...tableData,
			{
				currentState: '',
				input: '',
				firstNextState: '',
				secondNextState: '',
				output: '',
			},
		]);
	};

	const handleInputChange = (
		index: number,
		key: keyof StateNode,
		value: string
	) => {
		const updatedData = [...tableData];
		updatedData[index][key] = value;
		setTableData(updatedData);
	};

	const handleDeleteRow = (index: number) => {
		if (tableData.length === 1) return;
		const updatedData = tableData.filter((_, i) => i !== index);
		setTableData(updatedData);
	};

	function handleRunChart() {
		//only run if all fields are filled
		if (tableData.some((row) => Object.values(row).some((value) => !value))) {
			setMessage('Please fill all fields');
			return;
		}
		setRunChart(true);
	}

	return (
		<div className="table">
			<table>
				<thead>
					<tr>
						<th>Current State</th>
						<th>Next State</th>
						<th>Output</th>
					</tr>
				</thead>
				<tbody>
					{tableData.map((row, index) => (
						<TableRow
							key={index}
							row={row}
							index={index}
							handleInputChange={handleInputChange}
							handleDeleteRow={handleDeleteRow}
						/>
					))}
				</tbody>
			</table>
			<div className="add-row">
				<button onClick={handleAddRow}>Add Row</button>
				<button onClick={handleRunChart}>Run Chart</button>
			</div>
		</div>
	);
}

export default Table;
