import  StateNode  from '../interfaces/StateNode';

const testInput: StateNode[] = [
	{
		currentState: 'a',
		input: '',
		firstNextState: 'e',
		secondNextState: 'e',
		output: '1',
	},
	{
		currentState: 'b',
		input: '',
		firstNextState: 'c',
		secondNextState: 'e',
		output: '1',
	},
	{
		currentState: 'c',
		input: '',
		firstNextState: 'i',
		secondNextState: 'h',
		output: '0',
	},
	{
		currentState: 'd',
		input: '',
		firstNextState: 'h',
		secondNextState: 'a',
		output: '1',
	},
	{
		currentState: 'e',
		input: '',
		firstNextState: 'i',
		secondNextState: 'f',
		output: '0',
	},
	{
		currentState: 'f',
		input: '',
		firstNextState: 'e',
		secondNextState: 'g',
		output: '0',
	},
	{
		currentState: 'g',
		input: '',
		firstNextState: 'h',
		secondNextState: 'b',
		output: '1',
	},
	{
		currentState: 'h',
		input: '',
		firstNextState: 'c',
		secondNextState: 'd',
		output: '0',
	},
    {
		currentState: 'i',
		input: '',
		firstNextState: 'f',
		secondNextState: 'b',
		output: '1',
	},
];

export default testInput;   