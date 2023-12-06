import { useEffect } from 'react';
import '../styles/Table.css';
import StateNode from '../interfaces/StateNode';
import TableRow from './TableRow';
import StateReducer from '../classes/StateReducer';

interface TableProps {
	tableData: StateNode[];
	setTableData: React.Dispatch<React.SetStateAction<StateNode[]>>;
	runChart: boolean;
	setRunChart: React.Dispatch<React.SetStateAction<boolean>>;
	stateReducer: StateReducer;
	reducedTable: boolean;
	setReducedTable: React.Dispatch<React.SetStateAction<boolean>>;
	isMealy: boolean;
	setIsMealy: React.Dispatch<React.SetStateAction<boolean>>;
}

function Table({
	tableData,
	setTableData,
	runChart,
	setRunChart,
	stateReducer: sr,
	reducedTable,
	setReducedTable,
	isMealy,
	setIsMealy,
}: TableProps): JSX.Element {
	useEffect(() => {
		if (reducedTable) {
			const redTable = sr.getReducedTable();
			setTableData([...redTable]);
		}
	}, [reducedTable, setTableData, sr]);

	const handleAddRow = () => {
		setTableData((tableData) => [
			...tableData,
			{
				currentState: '',
				input: '',
				firstNextState: '',
				secondNextState: '',
				output: '',
				secondOutput: '',
			},
		]);
		setRunChart(false);
	};

	const handleInputChange = (
		index: number,
		key: keyof StateNode,
		value: string
	) => {
		const updatedData = [...tableData];

		updatedData[index][key] = value;

		setTableData(updatedData);
		setRunChart(false);
	};

	const handleDeleteRow = (index: number) => {
		if (tableData.length === 1) return;
		const updatedData = tableData.filter((_, i) => i !== index);
		setTableData(updatedData);
		setRunChart(false);
	};

	const handleReducedChart = () => {
		if (reducedTable) {
			const table = sr.getTable();
			setTableData(table);
			setReducedTable(false);
			return;
		}
		const redTable = sr.getReducedTable();
		setTableData([...redTable]);
		setReducedTable(true);
	};

	const btnText = reducedTable ? 'Original table' : 'Reduced table';

	return (
		<div className="table">
			<h2>Implication Table Reduction</h2>

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
							isMealy={isMealy}
							reducedTable={reducedTable}
						/>
					))}
				</tbody>
			</table>
			<div className="add-row">
				{!reducedTable ? (
					<>
						<button onClick={handleAddRow}>Add Row</button>
						<button
							onClick={() => {
								setIsMealy((isMealy) => !isMealy);
								setRunChart(false);
							}}
						>
							Set {isMealy ? 'Moore' : 'Mealy'}
						</button>
						<button
							onClick={() => {
								setTableData([
									{
										currentState: '',
										input: '',
										firstNextState: '',
										secondNextState: '',
										output: '',
										secondOutput: '',
									},
								]);
								setRunChart(false);
							}}
						>
							Clear
						</button>
					</>
				) : null}

				{runChart ? (
					<button onClick={handleReducedChart}>{btnText}</button>
				) : null}
			</div>
		</div>
	);
}

export default Table;
