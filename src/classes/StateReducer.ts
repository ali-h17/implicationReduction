import StateNode from '../interfaces/StateNode.ts';

class StateReducer {
	private stateTable: StateNode[];
	private readonly originalStateTable: StateNode[] = [];
	private dependencyMap: Map<string, string[]> = new Map<string, string[]>();
	private possibleMoves: Map<string, string[]> = new Map<string, string[]>();
	private chartMap: Map<string, string[]> = new Map<string, string[]>();
	private impossibleSet: Set<string> = new Set<string>();
	private possibleSet: Set<string> = new Set<string>();
	private confirmedSet: Set<string> = new Set<string>();

	private equivalentClasses: string[][] = [];

	constructor(stateTable: StateNode[]) {
		this.stateTable = stateTable;
		this.originalStateTable = JSON.parse(JSON.stringify(stateTable));
		this.buildChart();
	}

	public sortStateStr(str: string): string {
		return str.split('-').sort().join('-');
	}

	private compareOutputs(s1: StateNode, s2: StateNode): boolean {
		return s1.output === s2.output && s1.secondOutput === s2.secondOutput;
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
		let nextStateEqualsState = false;
		let nextStatesEqual = false;

		for (let i = 0; i < this.stateTable.length - 1; i++) {
			for (let j = i + 1; j < this.stateTable.length; j++) {
				//add all possible states to possibleSet
				const posState = this.sortStateStr(
					`${this.stateTable[i].currentState}-${this.stateTable[j].currentState}`
				);
				this.possibleSet.add(posState);

				//if outputs are different, then they are not equivalent
				if (!this.compareOutputs(this.stateTable[i], this.stateTable[j])) {
					const impState = this.sortStateStr(
						`${this.stateTable[i].currentState}-${this.stateTable[j].currentState}`
					);
					this.possibleSet.delete(impState);
					this.impossibleSet.add(impState);
					this.chartMap.set(impState, []);
					continue;
				}

				//check dependency for first next state
				if (
					this.sortStateStr(
						`${this.stateTable[i].firstNextState}-${this.stateTable[j].firstNextState}`
					) ===
					this.sortStateStr(
						`${this.stateTable[i].currentState}-${this.stateTable[j].currentState}`
					)
				) {
					nextStateEqualsState = true;
				} else if (
					this.stateTable[i].firstNextState !==
					this.stateTable[j].firstNextState
				) {
					const key = this.sortStateStr(
						`${this.stateTable[i].firstNextState}-${this.stateTable[j].firstNextState}`
					);
					const value = this.sortStateStr(
						`${this.stateTable[i].currentState}-${this.stateTable[j].currentState}`
					);

					if (key !== value) {
						this.dependencyMap.set(key, [
							...(this.dependencyMap.get(key) || []),
							value,
						]);

						this.chartMap.set(value, [
							...(this.chartMap.get(value) || []),
							key,
						]);
					}
				} else {
					nextStatesEqual = true;
				}

				//check dependency for second next state
				if (
					(this.stateTable[i].secondNextState ===
						this.stateTable[j].secondNextState &&
						nextStateEqualsState) ||
					(this.sortStateStr(
						`${this.stateTable[i].firstNextState}-${this.stateTable[j].firstNextState}`
					) ===
						this.sortStateStr(
							`${this.stateTable[i].currentState}-${this.stateTable[j].currentState}`
						) &&
						nextStatesEqual)
				) {
					this.confirmedSet.add(
						this.sortStateStr(
							`${this.stateTable[i].currentState}-${this.stateTable[j].currentState}`
						)
					);
				} else if (
					this.stateTable[i].secondNextState !==
					this.stateTable[j].secondNextState
				) {
					const key = this.sortStateStr(
						`${this.stateTable[i].secondNextState}-${this.stateTable[j].secondNextState}`
					);
					const value = this.sortStateStr(
						`${this.stateTable[i].currentState}-${this.stateTable[j].currentState}`
					);
					if (key !== value) {
						this.dependencyMap.set(key, [
							...(this.dependencyMap.get(key) || []),
							value,
						]);
						this.chartMap.set(value, [
							...(this.chartMap.get(value) || []),
							key,
						]);
					}
				}
				nextStateEqualsState = false;
				nextStatesEqual = false;
			}
		}
	}

	

	private buildPossibleMoves(): void {
		for (const state of this.possibleSet) {
			const [first, second] = state.split('-');
			this.possibleMoves.set(first, [
				...(this.possibleMoves.get(first) || []),
				second,
			]);
			this.possibleMoves.set(second, [
				...(this.possibleMoves.get(second) || []),
				first,
			]);
		}
	}

	private buildEquivalenceClasses(): void {
		const visited: Set<string> = new Set<string>();
		this.equivalentClasses = [];

		for (const state of this.possibleMoves.keys()) {
			if (!visited.has(state)) {
				const equivalenceClass: string[] = [];
				this.dfs(state, equivalenceClass, visited);
				this.equivalentClasses.push(equivalenceClass);
			}
		}

		let found = false;
		for (const state of this.stateTable) {

			for (const eClass of this.equivalentClasses) { 
				if (eClass.includes(state.currentState)) {
					found = true;
					break;
				}
			}
			if (!found) {
				this.equivalentClasses.push([state.currentState]);
			}
			found = false;

			
		}
	}

	private dfs(
		currentState: string,
		equivalenceClass: string[],
		visited: Set<string>
	): void {
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
		this.buildEquivalenceClasses();
	}

	public getEquivalenceClasses(): string[][] {
		return this.equivalentClasses;
	}

	public getDependencyMap(): Map<string, string[]> {
		return this.dependencyMap;
	}

	public getChartMap(): Map<string, string[]> {
		return this.chartMap;
	}

	public getImpssibleSet(): Set<string> {
		return this.impossibleSet;
	}

	public getConfirmedSet(): Set<string> {
		return this.confirmedSet;
	}

	public getAllEqualStates(): string[] {
		const allStates: string[] = [];
		for (const equivalenceClass of this.equivalentClasses) {
			allStates.push(...equivalenceClass);
		}
		return allStates;
	}

	public getPossibleMoves(): Map<string, string[]> {
		return this.possibleMoves;
	}

	public getAllStates(): string[] {
		const allStates: string[] = [];
		for (const equivalenceClass of this.equivalentClasses) {
			allStates.push(...equivalenceClass);
		}

		allStates.sort();

		return allStates;
	}

	private getMainState(state: string): string {
		for (const equivalenceClass of this.equivalentClasses) {
			if (equivalenceClass.includes(state)) {
				return equivalenceClass.sort()[0];
			}
		}
		return '';
	}

	public getReducedTable(): StateNode[] {
		const newTable: StateNode[] = [];
		
		for (const eClass of this.equivalentClasses) { 
			const mainState = eClass.sort()[0];

			this.stateTable.find((state) => {
				if (state.currentState === mainState) {
					state.firstNextState = this.getMainState(state.firstNextState) || '';
					state.secondNextState = this.getMainState(state.secondNextState) || '';
					newTable.push(state);
					return true;
				}
				return false;
			});
		}
		
		newTable.sort((a, b) => a.currentState.localeCompare(b.currentState) );

		return newTable;
	}

	public getTable(): StateNode[] {
		return this.originalStateTable;
	}
}

export default StateReducer;
