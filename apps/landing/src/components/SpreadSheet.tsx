import { useState } from 'react';
import Spreadsheet, {
  createEmptyMatrix,
  type CellBase,
  type Matrix,
} from 'react-spreadsheet';

const SpreadSheet = () => {
  const [data, setData] = useState<Matrix<CellBase>>(createEmptyMatrix(6, 12));

  return (
    <div className="w-full overflow-x-scroll">
      <Spreadsheet data={data} onChange={setData} />
    </div>
  );
};

export default SpreadSheet;
