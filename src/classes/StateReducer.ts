import StateNode from '../interfaces/StateNode.ts';

class StateReducer {
	private stateTable: StateNode[];
	private dependencyMap: Map<string, string[]> = new Map<string, string[]>();
    private possibleMoves: Map<string, string[]> = new Map<string, string[]>();
	private impossibleSet: Set<string> = new Set<string>();
	private possibleSet: Set<string> = new Set<string>();

    private equivalentClasses: string[][] = [];

	constructor(stateTable: StateNode[]) {
		this.stateTable = stateTable;
        this.buildChart();
	}

    private sortStateStr(str: string): string {
        return str.split('-').sort().join('-');
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
				const posState = this.sortStateStr(
					`${this.stateTable[i].currentState}-${this.stateTable[j].currentState}`
				);
				this.possibleSet.add(posState);

				//if outputs are different, then they are not equivalent
				if (this.stateTable[i].output !== this.stateTable[j].output) {
					const impState = this.sortStateStr(
						`${this.stateTable[i].currentState}-${this.stateTable[j].currentState}`
					);
					this.possibleSet.delete(impState);
					this.impossibleSet.add(impState);
					continue;
				}
				//check dependency for first next state
				if (this.stateTable[i].firstNextState !== this.stateTable[j].firstNextState) {
					const key = this.sortStateStr(
						`${this.stateTable[i].firstNextState}-${this.stateTable[j].firstNextState}`
					);
					const value = this.sortStateStr(
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

					const key = this.sortStateStr(
						`${this.stateTable[i].secondNextState}-${this.stateTable[j].secondNextState}`
					);
					const value = this.sortStateStr(
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

    private buildPossibleMoves(): void {
        for (const state of this.possibleSet) {
            const [first, second] = state.split('-');
            this.possibleMoves.set(first, [...(this.possibleMoves.get(first) || []), second]);
            this.possibleMoves.set(second, [...(this.possibleMoves.get(second) || []), first]);
        }
    }

    private buildEquivalentClasses(): void {
        const visited: Set<string> = new Set<string>();
        this.equivalentClasses = [];
    
        for (const state of this.possibleMoves.keys()) {
            if (!visited.has(state)) {
                const equivalenceClass: string[] = [];
                this.dfs(state, equivalenceClass, visited);
                this.equivalentClasses.push(equivalenceClass);
            }
        }
    }
    
    private dfs(currentState: string, equivalenceClass: string[], visited: Set<string>): void {
        equivalenceClass.push(currentState);
        visited.add(currentState);
    
        const neighbors = this.possibleMoves.get(currentState) || [];
    
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                this.dfs(neighbor, equivalenceClass, visited);
            }
        }
    }
    
    private buildChart(): void {
        this.buildDependencyMap();
        this.removeImpossibleStates();
        this.buildPossibleMoves();
        this.buildEquivalentClasses();
    }

    public getEquivalentClasses(): string[][] {
        return this.equivalentClasses;
    }

    public getDependencyMapStr(): Map<string, string[]> {
        return this.dependencyMap;
    }
   
}

export default StateReducer;
