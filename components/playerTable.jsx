import { useCallback, useMemo, useRef, useEffect } from "react"
import { FixedSizeList as List } from "react-window"
import { useTable, useBlockLayout, useSortBy, useFilters } from 'react-table'
import FilterInput from "./FilterInput"
import ExportCSV from "./ExportCSV"

function PlayerTable({ data, columns }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
    setFilter,
    state
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
          className={`pl-2 pr-2 ${index % 2 === 0 && 'bg-scoreyellow/20'}`}
        >
          {row.cells.map((cell, index) => {
            return (
              <div key={index} {...cell.getCellProps()} className="flex text-slate-800 items-center pl-2 pr-2">
                {cell.render('Cell')}
              </div>
            )
          })}
        </div>
      )
    },
    [prepareRow, rows]
  )

  const onFilterInputChange = (inputValue) => {
    setFilter('name', value)
  }

  return (
    <div className="w-full flex flex-col items-center font-sans">
      <div className="flex justify-between items-center w-11/12 pt-9">
        <FilterInput onChange={onFilterInputChange} placeholder="Player Name" debounceMS={300} />
        <ExportCSV rows={rows} />
      </div>
      <div {...getTableProps()}
        className="inline-block shadow-xl m-4 overflow-x-auto w-11/12 no-scrollbar rounded-t-xl border-b-scoreyellow border-b-4"
      >
        <div>
          {headerGroups.map((headerGroup, index) => (
            <div key={index} {...headerGroup.getHeaderGroupProps()} className="pl-2 pr-2 bg-scoreblue-100">
              {headerGroup.headers.map((column, index) => (
                <div
                  key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`flex text-slate-200 font-semibold items-center pl-2 pr-2 border-t-4 border-b-4 border-transparent ${
                    column.isSorted ? (column.isSortedDesc ? ' border-t-scoreyellow' : ' border-b-scoreyellow') : ''
                  }`}
                >
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
