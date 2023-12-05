import StateNode from '../interfaces/StateNode';
import StateReducer from '../classes/StateReducer';
import ChartBox from './ChartBox';
import '../styles/Chart.css';
import React from 'react';

interface ChartProps {
  tableData: StateNode[];
  stateReducer: StateReducer;
}

const Chart: React.FC<ChartProps> = React.memo(({ tableData, stateReducer: sr }) => {
  return (
    <div className="chart">
      {tableData.map((rowData, i) => (
        <div key={i} className="row">
          {tableData.slice(0, i).map((_, j) => (
            <ChartBox
              key={`${i}-${j}`}
              position={`${i}${j}`}
              tableData={tableData}
              state={sr.sortStateStr(`${rowData.currentState}-${tableData[j].currentState}`)}
              stateReducer={sr}
            />
          ))}
        </div>
      ))}
    </div>
  );
}, () => {
	return true;
});

export default Chart;
