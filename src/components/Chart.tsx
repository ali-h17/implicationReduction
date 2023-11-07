import TableRowInterface from '../interfaces/TableRowInterface';
import ChartBox from './ChartBox';
import '../styles/Chart.css';

interface ChartProps {
  tableData: TableRowInterface[];
}

export default function Chart({ tableData }: ChartProps): JSX.Element {
  return (
    <div className='chart'>
      {tableData.map((rowData, i) => {
        // if (i === 0) return null; 

        return (
          <div key={i} className="row">
            {tableData.slice(0, i).map((_, j) => (
              <ChartBox key={`${i}-${j}`} position={`${i}${j}`} tableData={tableData}/>
            ))}
          </div>
        );
      })}
    </div>
  );
}

