import '../styles/Table.css';
import StateNode from '../interfaces/StateNode';
import TableRow from './TableRow';

interface TableProps {
	tableData: StateNode[];
	setTableData: React.Dispatch<React.SetStateAction<StateNode[]>>;
}

function Table({
	tableData,
	setTableData,
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
			</div>
		</div>
	);
}

export default Table;
