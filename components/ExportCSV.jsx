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
        data={csvData || ''}
        headers={csvHeaderDefinitions}
        asyncOnClick={true}
        onClick={massageTableData}
      >
      Download Me
    </CSVLink>
  )
}

export default ExportCSV
