import '../styles/ChartBox.css';
import StateNode from '../interfaces/StateNode';
import StateReducer from '../classes/StateReducer';

interface ChartBoxProps {
	position: string;
	tableData: StateNode[];
	state: string;
	stateReducer: StateReducer;
}

function ChartBox({
	position,
	tableData,
	state,
	stateReducer: sr,
}: ChartBoxProps) {
	const x = parseInt(position[0]);
	const y = parseInt(position[1]);

	const neededStates = sr.getChartMap().get(state) || [];
	const isImpossible = sr.getImpssibleSet().has(state) && neededStates.length !== 0;

	return (
		<div className="chart-box-container">
			<div className="chart-box">
				{y === 0 ? (
					<div className="left-state">
						<span>{tableData[x].currentState}</span>
					</div>
				) : null}

				<div className="chart-text">
					{neededStates.length > 0 ? (
						neededStates.map((state, i) => <span key={i}>{state}</span>)
					) : (
						<svg
							height="24px"
							id="Layer_1"
							version="1.1"
							viewBox="0 0 24 24"
							width="24px"
							xmlns="http://www.w3.org/2000/svg"
							fill="beige"
						>
							<path d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z" />
						</svg>
					)}
				</div>

				{isImpossible ? (
					<svg
						className='impossible-cross'
						height="48px"
						id="Layer_1"
						version="1.1"
						viewBox="0 0 24 24"
						width="48px"
						xmlns="http://www.w3.org/2000/svg"
						fill="hsl(210deg, 30%, 12%, 0.72)"
					>
						<path d="M22.245,4.015c0.313,0.313,0.313,0.826,0,1.139l-6.276,6.27c-0.313,0.312-0.313,0.826,0,1.14l6.273,6.272  c0.313,0.313,0.313,0.826,0,1.14l-2.285,2.277c-0.314,0.312-0.828,0.312-1.142,0l-6.271-6.271c-0.313-0.313-0.828-0.313-1.141,0  l-6.276,6.267c-0.313,0.313-0.828,0.313-1.141,0l-2.282-2.28c-0.313-0.313-0.313-0.826,0-1.14l6.278-6.269  c0.313-0.312,0.313-0.826,0-1.14L1.709,5.147c-0.314-0.313-0.314-0.827,0-1.14l2.284-2.278C4.308,1.417,4.821,1.417,5.135,1.73  L11.405,8c0.314,0.314,0.828,0.314,1.141,0.001l6.276-6.267c0.312-0.312,0.826-0.312,1.141,0L22.245,4.015z" />
					</svg>
				) : null}
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
