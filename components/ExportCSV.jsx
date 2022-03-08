import { useState } from 'react'
import { CSVLink } from "react-csv"
import csvHeaderDefinitions from "../util/constants/csvHeaders"

const ExportCSV = ({ rows }) => {
  const [csvData, setCSVData] = useState()

  const massageTableData = async () => {
    const massagedData = rows.map(row => row.original)
    setCSVData(massagedData)
  }

  return (
    <CSVLink
      className="mr-2"
      data={csvData || ''}
      headers={csvHeaderDefinitions}
      asyncOnClick={true}
      onClick={massageTableData}
    >
      <button className="text-slate-200 bg-scoreblue-100 hover:bg-scoreblue-200 h-10 px-5 m-2 transition-colors duration-150 rounded-lg focus:shadow-outline">
        Export CSV
      </button>
    </CSVLink>
  )
}

export default ExportCSV
