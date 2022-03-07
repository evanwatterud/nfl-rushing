import { useCallback } from "react"
import { FixedSizeList as List } from "react-window"
import { useTable, useBlockLayout } from 'react-table'

function PlayerTable({ data, columns }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth
  } = useTable(
    {
      columns,
      data
    },
    useBlockLayout
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
        >
          {row.cells.map((cell, index) => {
            return (
              <div key={index} {...cell.getCellProps()}>
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
    <div {...getTableProps()} className="inline-block border border-black">
      <div>
        {headerGroups.map((headerGroup, index) => (
          <div key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <div key={index} {...column.getHeaderProps()}>
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()}>
        <List
          height={800}
          width={totalColumnsWidth}
          itemCount={data.length}
          itemSize={55}
        >
          {PlayerRow}
        </List>
      </div>
    </div>
  )
}

export default PlayerTable
