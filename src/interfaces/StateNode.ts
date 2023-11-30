interface StateNode {
	currentState: string;
	input: string;
	firstNextState: string;
	secondNextState: string;
	output: string;
	secondOutput: string;
}

export default StateNode;
