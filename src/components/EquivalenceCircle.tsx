import { useCallback } from 'react';
import StateReducer from '../classes/StateReducer';

interface EquivalenceCircleProps {
	stateReducer: StateReducer;
}

const colors = [
	'hsl(333deg, 100%, 52%)',
	'hsl(230deg, 100%, 69%)',
	'#F4BF96',
	'#FCf657',
];

const stateCoOrdinates = new Map<string, number[]>();
const equivalenceClassesColors = new Map<string, string>();

function EquivalnceCircle({ stateReducer: sr }: EquivalenceCircleProps) {
	const states = sr.getAllEqualStates();
	const moves = sr.getPossibleMoves();

	const setStateColors = useCallback((sr: StateReducer) => {
		sr.getEquivalenceClasses().forEach(
			(equivalenceClass: string[], index: number) => {
				equivalenceClass.forEach((state: string) => {
					equivalenceClassesColors.set(state, colors[index]);
				});
			}
		);
	}, []);

	setStateColors(sr);

	const radius = 100;
	const centerX = 150;
	const centerY = 150;
	const angleIncrement = 360 / states.length;

	return (
		<svg width="300" height="300">
			<circle
				cx={centerX}
				cy={centerY}
				r={radius}
				fill="none"
				stroke="beige"
				strokeWidth={3}
			/>
			{states.map((state, index) => {
				const angle = -90 + index * angleIncrement;
				const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
				const y = centerY + radius * Math.sin((angle * Math.PI) / 180);
				stateCoOrdinates.set(state, [x, y]);

				return (
					<g key={state}>
						{moves.get(state)?.map((move) => {
							if (stateCoOrdinates.has(move)) {
								const [x2, y2] = stateCoOrdinates.get(move) as number[];
								const color = equivalenceClassesColors.get(state) as string;

								return (
									<line
										key={`${state}-${move}`}
										x1={x}
										y1={y}
										x2={x2}
										y2={y2}
										stroke={color}
										strokeWidth={2}
									/>
								);
							}
						})}
					</g>
				);
			})}
			//loop over stateCoOrdinates and draw circles with radius 15 at each
			coordinate
			{Array.from(stateCoOrdinates.entries()).map(([state, [x, y]]) => (
				<>
					<circle
						cx={x}
						cy={y}
						r={15}
						fill={`hsl(210deg, 30%, 8%)`}
						stroke="beige"
						strokeWidth={2}
					/>
					<text x={x} y={y} textAnchor="middle" dy=".35em" fill="white">
						{state}
					</text>
				</>
			))}
		</svg>
	);
}

export default EquivalnceCircle;

