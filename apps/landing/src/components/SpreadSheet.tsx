import type { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { DataTable } from './DataTable';
import { Checkbox } from './ui/checkbox';
import { useState } from 'react';
import { DatePicker } from './DatePicker';
import { Button } from './ui/button';

export interface Sheet {
  A: string | number;
  B: string | number;
  C: string | number;
  D: string | number;
  E: string | number;
  F: string | number;
  G: string | number;
  H: string | number;
  //   I: string | number;
  //   J: string | number;
  //   K: string | number;
  //   L: string | number;
  //   M: string | number;
  //   N: string | number;
  //   O: string | number;
  //   P: string | number;
  //   Q: string | number;
  //   R: string | number;
  //   S: string | number;
  //   T: string | number;
  //   U: string | number;
  //   V: string | number;
  //   W: string | number;
  //   X: string | number;
  //   Y: string | number;
  //   Z: string | number;
}

const columns: ColumnDef<Sheet>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    size: 32,
  },
  {
    accessorKey: 'A',
    header: 'A',
  },
  {
    accessorKey: 'B',
    header: 'B',
  },
  {
    accessorKey: 'C',
    header: 'C',
  },
  {
    accessorKey: 'D',
    header: 'D',
  },
  {
    accessorKey: 'E',
    header: 'E',
  },
  {
    accessorKey: 'F',
    header: 'F',
  },
  {
    accessorKey: 'G',
    header: 'G',
  },
  {
    accessorKey: 'H',
    header: 'H',
  },
];

const defaultData: Sheet[] = [
  {
    A: 'A1',
    B: 'B1',
    C: 'C1',
    D: 'D1',
    E: 'E1',
    F: 'F1',
    G: 'G1',
    H: 'H1',
  },
  {
    A: 'A2',
    B: 'B2',
    C: 'C2',
    D: 'D2',
    E: 'E2',
    F: 'F2',
    G: 'G2',
    H: 'H2',
  },
  {
    A: 'A3',
    B: 'B3',
    C: 'C3',
    D: 'D3',
    E: 'E3',
    F: 'F3',
    G: 'G3',
    H: 'H3',
  },
  {
    A: 'A4',
    B: 'B4',
    C: 'C4',
    D: 'D4',
    E: 'E4',
    F: 'F4',
    G: 'G4',
    H: 'H4',
  },
  {
    A: 'A5',
    B: 'B5',
    C: 'C5',
    D: 'D5',
    E: 'E5',
    F: 'F5',
    G: 'G5',
    H: 'H5',
  },
  {
    A: 'A6',
    B: 'B6',
    C: 'C6',
    D: 'D6',
    E: 'E6',
    F: 'F6',
    G: 'G6',
    H: 'H6',
  },
];

export default function SpreadSheet() {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
  return (
    <div className="flex flex-col gap-6 size-full p-2">
      <div className="flex justify-end items-center gap-3">
        <DatePicker />
        <DatePicker />
        <Button variant="outline">Clear</Button>
      </div>
      <DataTable
        columns={columns}
        data={defaultData}
        rowSelection={selectedRows}
        onRowSelectionChange={setSelectedRows}
      />
    </div>
  );
}
