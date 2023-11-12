import StateNode from '../interfaces/StateNode.ts';
import TestInput from './TestInput.ts';
/*
interface StateNode {
	currentState: string;
	input: string;
	firstNextState: string;
	secondNextState: string;
	output: string;
}
*/

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

function sortStateStr(str: string): string {
	return str.split('-').sort().join('-');
}

class StateReducer {
	private stateTable: StateNode[];
	private dependencyMap: Map<string, string[]> = new Map<string, string[]>();
	private impossibleSet: Set<string> = new Set<string>();
	private possibleSet: Set<string> = new Set<string>();

	constructor(stateTable: StateNode[]) {
		this.stateTable = stateTable;
	}

	private removeImpossibleStates(): void {

        for (const impState of this.impossibleSet) {

            const dependencies = this.dependencyMap.get(impState);

            if (!dependencies || dependencies.length === 0) {
                continue;
            }

            dependencies.forEach((state) => {
                this.impossibleSet.add(state);
                this.possibleSet.delete(state);
            });
        }
	}

	private buildDependencyMap(): void {
		for (let i = 0; i < this.stateTable.length - 1; i++) {
			for (let j = i + 1; j < this.stateTable.length; j++) {
				//add all possible states to possibleSet
				const posState = sortStateStr(
					`${this.stateTable[i].currentState}-${this.stateTable[j].currentState}`
				);
				this.possibleSet.add(posState);

				//if outputs are different, then they are not equivalent
				if (this.stateTable[i].output !== this.stateTable[j].output) {
					const impState = sortStateStr(
						`${this.stateTable[i].currentState}-${this.stateTable[j].currentState}`
					);
					this.possibleSet.delete(impState);
					this.impossibleSet.add(impState);
					continue;
				}
				//check dependency for first next state
				if (this.stateTable[i].firstNextState !== this.stateTable[j].firstNextState) {
					const key = sortStateStr(
						`${this.stateTable[i].firstNextState}-${this.stateTable[j].firstNextState}`
					);
					const value = sortStateStr(
						`${this.stateTable[i].currentState}-${this.stateTable[j].currentState}`
					);

					if (key !== value)
						this.dependencyMap.set(key, [
							...(this.dependencyMap.get(key) || []),
							value,
						]);
				}

				//check dependency for second next state
				if (this.stateTable[i].secondNextState !== this.stateTable[j].secondNextState) {

					const key = sortStateStr(
						`${this.stateTable[i].secondNextState}-${this.stateTable[j].secondNextState}`
					);
					const value = sortStateStr(
						`${this.stateTable[i].currentState}-${this.stateTable[j].currentState}`
					);

					if (key !== value)
						this.dependencyMap.set(key, [
							...(this.dependencyMap.get(key) || []),
							value,
						]);
				}
			}
		}
	
	}

    public test(): void {
        this.buildDependencyMap();
        this.removeImpossibleStates();

        // console.log(this.dependencyMap);
        // console.log(this.impossibleSet);
    }
}

const sr = new StateReducer(TestInput);

sr.test();

export default StateReducer;
