import { useCallback } from 'react';
import StateReducer from '../classes/StateReducer';
import React from 'react';

interface EquivalenceCircleProps {
	stateReducer: StateReducer;
}

const colors = [
	'hsl(333, 100%, 52%)',
	`hsl(220, 30%, 90%)`,
	'hsl(360, 83%, 33%)',
	'hsl(189, 100%, 40%)',
	'hsl(245, 100%, 23%)',
	`hsl(120, 70%, 50%)`,
	'hsl(230, 100%, 69%)',
	'hsl(2, 100%, 69%)',
	
];

const stateCoOrdinates = new Map<string, number[]>();
const equivalenceClassesColors = new Map<string, string>();

const EquivalnceCircle: React.FC<EquivalenceCircleProps> = React.memo(
	({ stateReducer: sr }) => {
		const states = sr.getAllStates();
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

				{Array.from(stateCoOrdinates.entries()).map(([state, [x, y]]) => (
					<>
						<circle
							key={`${x}-${y}`}
							cx={x}
							cy={y}
							r={15}
							fill={`hsl(210deg, 30%, 8%)`}
							stroke="beige"
							strokeWidth={2}
						/>
						<text key={state} x={x} y={y} textAnchor="middle" dy=".35em" fill="white">
							{state}
						</text>
					</>
				))}
			</svg>
		);
	},
	() => {
		return true;
	}
);

export default EquivalnceCircle;
