import { useState } from 'react'
import { DebounceInput } from "react-debounce-input";

const FilterInput = ({ placeholder, onChange, debounceMS }) => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event) => {
    const value = event.target.value || ''
    setInputValue(value)
    onChange(value)
  }

  return (
    <DebounceInput
      className="p-2 pl-4 ml-2 border-2 border-scoreblue-100/50 hover:border-scoreblue-100/75 focus:border-scoreblue-100 focus:outline-none rounded-lg"
      placeholder={placeholder}
      name="filter-input"
      value={inputValue}
      debounceTimeout={debounceMS}
      onChange={handleInputChange}
    />
  )
}

export default FilterInput;