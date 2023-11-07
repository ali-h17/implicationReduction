import '../styles/Table.css';
import TableRowInterface from '../interfaces/TableRowInterface';
import TableRow from './TableRow';

interface TableProps {
	tableData: TableRowInterface[];
	setTableData: React.Dispatch<React.SetStateAction<TableRowInterface[]>>;
	setRunChart: React.Dispatch<React.SetStateAction<boolean>>;
}
function Table({
	tableData,
	setTableData,
	setRunChart,
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
		key: keyof TableRowInterface,
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
				<button onClick={() => setRunChart(true)}>Run Chart</button>
			</div>
		</div>
	);
}

export default Table;
