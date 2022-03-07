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
    <div>
      <span>{label}</span>
      <DebounceInput
        value={inputValue}
        debounceTimeout={300}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default FilterInput;