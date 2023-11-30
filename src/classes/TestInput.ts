import  StateNode  from '../interfaces/StateNode';

// const testInput: StateNode[] = [
// 	{
// 		currentState: 'a',
// 		input: '',
// 		firstNextState: 'e',
// 		secondNextState: 'e',
// 		output: '1',
// 		secondOutput: '',
// 	},
// 	{
// 		currentState: 'b',
// 		input: '',
// 		firstNextState: 'c',
// 		secondNextState: 'e',
// 		output: '1',
// 		secondOutput: '',

// 	},
// 	{
// 		currentState: 'c',
// 		input: '',
// 		firstNextState: 'i',
// 		secondNextState: 'h',
// 		output: '0',
// 		secondOutput: '',

// 	},
// 	{
// 		currentState: 'd',
// 		input: '',
// 		firstNextState: 'h',
// 		secondNextState: 'a',
// 		output: '1',
// 		secondOutput: '',

// 	},
// 	{
// 		currentState: 'e',
// 		input: '',
// 		firstNextState: 'i',
// 		secondNextState: 'f',
// 		output: '0',
// 		secondOutput: '',

// 	},
// 	{
// 		currentState: 'f',
// 		input: '',
// 		firstNextState: 'e',
// 		secondNextState: 'g',
// 		output: '0',
// 		secondOutput: '',

// 	},
// 	{
// 		currentState: 'g',
// 		input: '',
// 		firstNextState: 'h',
// 		secondNextState: 'b',
// 		output: '1',
// 		secondOutput: '',

// 	},
// 	{
// 		currentState: 'h',
// 		input: '',
// 		firstNextState: 'c',
// 		secondNextState: 'd',
// 		output: '0',
// 		secondOutput: '',

// 	},
//     {
// 		currentState: 'i',
// 		input: '',
// 		firstNextState: 'f',
// 		secondNextState: 'b',
// 		output: '1',
// 		secondOutput: '',

// 	},
// ];

const test2: StateNode[] = [
	{
		currentState: 'a',
		input: '',
		firstNextState: 'h',
		secondNextState: 'c',
		output: '1',
		secondOutput: '0',
	},
	{
		currentState: 'b',
		input: '',
		firstNextState: 'c',
		secondNextState: 'd',
		output: '0',
		secondOutput: '1',

	},
	{
		currentState: 'c',
		input: '',
		firstNextState: 'h',
		secondNextState: 'b',
		output: '0',
		secondOutput: '0',

	},
	{
		currentState: 'd',
		input: '',
		firstNextState: 'f',
		secondNextState: 'h',
		output: '0',
		secondOutput: '0',

	},
	{
		currentState: 'e',
		input: '',
		firstNextState: 'c',
		secondNextState: 'f',
		output: '0',
		secondOutput: '1',

	},
	{
		currentState: 'f',
		input: '',
		firstNextState: 'f',
		secondNextState: 'g',
		output: '0',
		secondOutput: '0',

	},
	{
		currentState: 'g',
		input: '',
		firstNextState: 'g',
		secondNextState: 'c',
		output: '1',
		secondOutput: '0',

	},
	{
		currentState: 'h',
		input: '',
		firstNextState: 'a',
		secondNextState: 'c',
		output: '1',
		secondOutput: '0',

	},

]


// const initialTableData: StateNode[] = [
// 	{
// 		currentState: 'a',
// 		input: '',
// 		firstNextState: 'd',
// 		secondNextState: 'c',
// 		output: '0',
// 	},
// 	{
// 		currentState: 'b',
// 		input: '',
// 		firstNextState: 'f',
// 		secondNextState: 'h',
// 		output: '0',
// 	},
// 	{
// 		currentState: 'c',
// 		input: '',
// 		firstNextState: 'e',
// 		secondNextState: 'd',
// 		output: '1',
// 	},
// 	{
// 		currentState: 'd',
// 		input: '',
// 		firstNextState: 'a',
// 		secondNextState: 'e',
// 		output: '0',
// 	},
// 	{
// 		currentState: 'e',
// 		input: '',
// 		firstNextState: 'c',
// 		secondNextState: 'a',
// 		output: '1',
// 	},
// 	{
// 		currentState: 'f',
// 		input: '',
// 		firstNextState: 'f',
// 		secondNextState: 'b',
// 		output: '1',
// 	},
// 	{
// 		currentState: 'g',
// 		input: '',
// 		firstNextState: 'b',
// 		secondNextState: 'h',
// 		output: '0',
// 	},
// 	{
// 		currentState: 'h',
// 		input: '',
// 		firstNextState: 'c',
// 		secondNextState: 'g',
// 		output: '1',
// 	},
// ];

export default test2 ;  