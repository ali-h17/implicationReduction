import StateNode from '../interfaces/StateNode';
import StateReducer from '../classes/StateReducer';
import ChartBox from './ChartBox';
import '../styles/Chart.css';

interface ChartProps {
	tableData: StateNode[];
	stateReducer: StateReducer;
}

function Chart({ tableData, stateReducer: sr }: ChartProps): JSX.Element {


	return (
		<div className="chart">
			{tableData.map((rowData, i) => {

				return (
					<div key={i} className="row">
						{tableData.slice(0, i).map((_, j) => (
							<ChartBox
								key={`${i}-${j}`}
								position={`${i}${j}`}
								tableData={tableData}
								state={sr.sortStateStr(`${rowData.currentState}-${tableData[j].currentState}`)}
								stateReducer={sr}
							/>
						))}
					</div>
				);
			})}
		</div>
	);
}

export default Chart;
