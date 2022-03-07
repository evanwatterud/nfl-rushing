import { useCallback, useMemo, useRef, useEffect } from "react"
import { FixedSizeList as List } from "react-window"
import { useTable, useBlockLayout, useSortBy, useFilters } from 'react-table'
import FilterInput from "./FilterInput"

function PlayerTable({ data, columns }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
    setFilter
  } = useTable(
    {
      columns,
      data
    },
    useFilters,
    useSortBy,
    useBlockLayout,
  )

  const PlayerRow = useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)

      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="pl-2 pr-2"
        >
          {row.cells.map((cell, index) => {
            return (
              <div key={index} {...cell.getCellProps()} className="flex items-center pl-2 pr-2">
                {cell.render('Cell')}
              </div>
            )
          })}
        </div>
      )
    },
    [prepareRow, rows]
  )

  return (
    <div className="w-full flex flex-col items-center">
      <FilterInput setFilter={setFilter} filterName="name" label="Player Name" />
      <div {...getTableProps()} className="inline-block border border-black m-4 overflow-x-auto w-11/12 no-scrollbar">
        <div>
          {headerGroups.map((headerGroup, index) => (
            <div key={index} {...headerGroup.getHeaderGroupProps()} className="p-2 bg-slate-300">
              {headerGroup.headers.map((column, index) => (
                <div key={index} {...column.getHeaderProps(column.getSortByToggleProps())} className="flex items-center pl-2 pr-2">
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()}>
          <List
            className="no-scrollbar"
            height={800}
            width={totalColumnsWidth}
            itemCount={rows.length}
            itemSize={55}
          >
            {PlayerRow}
          </List>
        </div>
      </div>
    </div>
  )
}

export default PlayerTable
