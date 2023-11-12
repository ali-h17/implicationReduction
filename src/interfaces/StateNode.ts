interface StateNode {
	currentState: string;
	input: string;
	firstNextState: string;
	secondNextState: string;
	output: string;
}

export default StateNode;
