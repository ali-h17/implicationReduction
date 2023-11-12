import '../styles/ChartBox.css';
import StateNode from '../interfaces/StateNode';

interface ChartBoxProps {
	position: string;
	tableData: StateNode[];
}

function ChartBox({ position, tableData }: ChartBoxProps) {
	const x = parseInt(position[0]);
	const y = parseInt(position[1]);

	return (
		<div className="chart-box-container">
			<div className="chart-box">
				{y === 0 ? (
					<div className="left-state">
						<span>{tableData[x].currentState}</span>
					</div>
				) : null}

				<div className="chart-text">_</div>
			</div>

			{x === tableData.length - 1 ? (
				<div className="bottom-state">
					<span>{tableData[y].currentState}</span>
				</div>
			) : null}
		</div>
	);
}

export default ChartBox;
