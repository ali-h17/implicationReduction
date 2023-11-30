import StateNode from '../interfaces/StateNode';

interface TableRowProps {
	row: StateNode;
	index: number;
	handleInputChange: (
		index: number,
		field: keyof StateNode,
		value: string
	) => void;
	handleDeleteRow: (index: number) => void;
	twoOutputs: boolean;
}

function TableRow({
	row,
	index,
	handleInputChange,
	handleDeleteRow,
	twoOutputs,
}: TableRowProps) {
	return (
		<tr>
			<td
				style={{
					borderRight: '2px solid hsl(210deg, 30%, 12%)',
					borderBottom: '2px solid hsl(210deg, 30%, 12%)',
				}}
			>
				<input
					type="text"
					value={row.currentState}
					onChange={(e) =>
						handleInputChange(index, 'currentState', e.target.value)
					}
					placeholder="_"
				/>
			</td>

			<td
				style={{
					borderRight: '2px solid hsl(210deg, 30%, 12%)',
					borderBottom: '2px solid hsl(210deg, 30%, 12%)',
				}}
			>
				<div className="row-container">
					<input
						type="text"
						value={row.firstNextState}
						onChange={(e) =>
							handleInputChange(index, 'firstNextState', e.target.value)
						}
						placeholder="_"
					/>
					<input
						type="text"
						value={row.secondNextState}
						onChange={(e) =>
							handleInputChange(index, 'secondNextState', e.target.value)
						}
						placeholder="_"
					/>
				</div>
			</td>

			<td style={{ borderBottom: '2px solid hsl(210deg, 30%, 12%)' }}>
				<div className="output">
					<input
						type="text"
						value={row.output}
						onChange={(e) => handleInputChange(index, 'output', e.target.value)}
						placeholder="_"
					/>
					{twoOutputs ? (
						<input
							type="text"
							value={row.secondOutput}
							onChange={(e) =>
								handleInputChange(index, 'secondOutput', e.target.value)
							}
							placeholder="_"
						/>
					) : null}
				</div>
			</td>

			<td>
				<div className="row-container">
					<button onClick={() => handleDeleteRow(index)}>
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
					</button>
				</div>
			</td>
		</tr>
	);
}
export default TableRow;
