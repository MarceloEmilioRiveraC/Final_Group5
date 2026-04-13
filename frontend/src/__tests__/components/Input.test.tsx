import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Input } from '@presentation/components/common/Inputs'

describe('Input Component', () => {
  it('should render an input element', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('should render a label when provided', () => {
    render(<Input label="Email" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('should not render a label when not provided', () => {
    const { container } = render(<Input />)
    expect(container.querySelector('label')).toBeNull()
  })

  it('should display an error message when provided', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('should apply error border style when error is present', () => {
    render(<Input error="Required" placeholder="test" />)
    const input = screen.getByPlaceholderText('test')
    expect(input.className).toContain('border-red-500')
  })

  it('should apply normal border when no error', () => {
    render(<Input placeholder="test" />)
    const input = screen.getByPlaceholderText('test')
    expect(input.className).toContain('border-gray-300')
  })

  it('should call onChange when value changes', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} placeholder="test" />)
    fireEvent.change(screen.getByPlaceholderText('test'), { target: { value: 'hello' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('should pass through HTML input attributes', () => {
    render(<Input type="password" required placeholder="pw" />)
    const input = screen.getByPlaceholderText('pw')
    expect(input).toHaveAttribute('type', 'password')
    expect(input).toBeRequired()
  })
})
