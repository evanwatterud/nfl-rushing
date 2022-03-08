import { useState } from 'react'
import { DebounceInput } from "react-debounce-input";

const FilterInput = ({ label, setFilter, filterName }) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event) => {
    const value = event.target.value || ''
    setInputValue(value)
    setFilter(filterName, value)
  }

  return (
    <DebounceInput
      className="p-2 pl-4 ml-2 border-2 border-scoreblue-100/50 hover:border-scoreblue-100/75 focus:border-scoreblue-100 focus:outline-none rounded-lg"
      placeholder="Player Name"
      name="filter-input"
      value={inputValue}
      debounceTimeout={300}
      onChange={handleInputChange}
    />
  )
}

export default FilterInput;