// 🔥 Senior-level, reusable, dynamic, responsive table component system
// Everything below is modular, dynamic, and can be used across any screen.
"use client"
// TableWrapper.tsx
export function TableWrapper({ children }) {
  return (
    <div className="px-3 lg:px-6">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        {children}
      </div>
    </div>
  );
}

// TableHeader.tsx
export function TableHeader({ columns }) {
  return (
    <div className="bg-healthcare-primary text-white rounded-t-lg">
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-7 gap-4 px-6 py-3 text-xs font-medium">
        {columns.map((col, i) => (
          <div key={i}>{col}</div>
        ))}
      </div>
      {/* Mobile */}
      <div className="md:hidden px-4 py-3 text-xs font-medium">
        <div>{columns[0]} List</div>
      </div>
    </div>
  );
}

// StatusBadge.tsx
export function StatusBadge({ status, color }) {
  return (
    <span className={`px-2 py-0.5 text-[10px] rounded font-normal`} style={{ backgroundColor: `${color}26`, color }}>
      {status}
    </span>
  );
}

import { Button } from '@/components/ui/button';
// ActionButtons.tsx
import { Edit3, Trash2, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export function ActionButtons({
  onEdit,
  onDelete,
  onMore,
  showEdit = true,
  showDelete = true,
  moreOptions = []
}) {
  return (
    <div className="flex items-center gap-1">
      {showEdit && (
        <Button variant="ghost" size="icon" className="h-5 w-5 bg-gray-100/50 hover:bg-gray-200 border border-gray-300/50 opacity-50 rounded" onClick={onEdit}>
          <Edit3 className="h-3 w-3 text-healthcare-primary" />
        </Button>
      )}
      {showDelete && (
        <Button variant="ghost" size="icon" className="h-5 w-5 bg-gray-100/50 hover:bg-gray-200 border border-gray-300/50 opacity-50 rounded" onClick={onDelete}>
          <Trash2 className="h-3 w-3 text-[#E53E3E]" />
        </Button>
      )}
      {moreOptions.length > 0 && (
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onMore}>
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </Button>
      )}
    </div>
  );
}



export function DynamicTableRow({ row, columns, badgeGetter, actions }) {
  const badge = badgeGetter(row);
  return (
    <div>
      {/* Desktop */}
      <div className="hidden md:grid grid-cols-7 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
        {columns.map((key, idx) => (
          <div key={idx} className="text-xs text-healthcare-dark-bg capitalize">
            {row[key]}
          </div>
        ))}
        <div className="flex items-center">
          <StatusBadge status={badge.status} color={badge.color} />
        </div>
        {actions}
      </div>
      {/* Mobile */}
      <div className="md:hidden px-4 py-4 space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="text-xs font-medium text-healthcare-dark-bg">{row[columns[0]]}</div>
            <div className="text-xs text-gray-600 capitalize">{row[columns[1]]}</div>
          </div>
          <StatusBadge status={badge.status} color={badge.color} />
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div><span className="text-gray-500">Qty:</span> {row[columns[2]]}</div>
          <div><span className="text-gray-500">UoM:</span> {row[columns[4]]}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-600 truncate">
            <span className="text-gray-500">Remarks:</span> {row[columns[3]]}
          </div>
          {actions}
        </div>
      </div>
    </div>
  );
}

// PaginationControls.tsx
export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center p-4 border-t">
      <div className="flex items-center gap-1 text-sm">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-2 py-1 border rounded flex items-center gap-1"
        >
          ← Previous
        </button>
        {pages.map((page, i) => (
          <button
            key={i}
            onClick={() => onPageChange(page)}
            className={`px-2 py-1 border rounded ${currentPage === page ? 'bg-[#3DD6C4] text-white' : ''}`}
          >
            {page}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-2 py-1 border rounded flex items-center gap-1"
        >
          Next →
        </button>
      </div>
      <div className="flex gap-2">
        <button className="border border-[#3DD6C4] text-[#3DD6C4] px-2 py-1 rounded">❮</button>
        <button className="border border-[#3DD6C4] text-[#3DD6C4] px-2 py-1 rounded">❯</button>
      </div>
    </div>
  );
}

// Final Table.tsx


function Table({
  data,
  columnLabels,
  columnKeys,
  badgeGetter,
  onEdit,
  onDelete,
  moreOptions,
  pageSize = 10
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <TableWrapper>
      <TableHeader columns={columnLabels} />
      <div className="divide-y divide-gray-200">
        {currentData.map((row, idx) => (
          <DynamicTableRow
            key={idx}
            row={row}
            columns={columnKeys}
            badgeGetter={badgeGetter}
            actions={
              <ActionButtons
                showEdit={!!onEdit}
                showDelete={!!onDelete}
                moreOptions={moreOptions ?? []}
                onEdit={() => onEdit?.(row)}
                onDelete={() => onDelete?.(row)}
              />
            }
          />
        ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </TableWrapper>
  );
}
const dummyData = Array.from({ length: 35 }, (_, i) => ({
  itemCode: `IC-${i + 1}`,
  itemName: `Item ${i + 1}`,
  quantity: Math.floor(Math.random() * 100),
  itemRemarks: `Note for item ${i + 1}`,
  issueUom: 'PCS',
  status: i % 2 === 0 ? 'approved' : 'pending',
}));

const columnLabels = ['Item Code', 'Item Name', 'Quantity', 'Item Remarks', 'Issue UoM', 'Item Kit', 'Actions'];
const columnKeys = ['itemCode', 'itemName', 'quantity', 'itemRemarks', 'issueUom'];

export default function DemoTablePage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Inventory Items</h1>
      <Table
        data={dummyData}
        columnLabels={columnLabels}
        columnKeys={columnKeys}
        badgeGetter={(row) => ({
          status: row.status === 'approved' ? 'Approved' : 'Pending',
          color: row.status === 'approved' ? '#05CD99' : '#FF9900',
        })}
        onEdit={(row) => console.log('Edit', row)}
        onDelete={(row) => console.log('Delete', row)}
        moreOptions={['Duplicate', 'Archive']}
        pageSize={10}
      />
    </div>
  );
}