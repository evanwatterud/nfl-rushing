import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import FilterInput from './FilterInput'

describe('FilterInput', () => {
  it('displays placeholder text', () => {
    render(<FilterInput placeholder="Test Placeholder" />)

    expect(screen.queryByPlaceholderText("Test Placeholder")).not.toBeNull()
  })

  it('calls onChange on input value change', () => {
    const onChange = jest.fn()
  
    render(<FilterInput placeholder="Test Placeholder" debounceMS={0} onChange={onChange} />)

    const input = screen.getByPlaceholderText('Test Placeholder')
    fireEvent.change(input, { target: { value: 'some value' } })

    expect(onChange).toHaveBeenCalledWith('some value')
  })
})