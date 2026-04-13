import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from '@presentation/components/common/Buttons'

describe('Button Component', () => {
  it('should render with children text', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  it('should apply primary variant styles by default', () => {
    render(<Button>Primary</Button>)
    const btn = screen.getByText('Primary')
    expect(btn.className).toContain('bg-blue-500')
  })

  it('should apply secondary variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const btn = screen.getByText('Secondary')
    expect(btn.className).toContain('bg-gray-300')
  })

  it('should apply danger variant styles', () => {
    render(<Button variant="danger">Danger</Button>)
    const btn = screen.getByText('Danger')
    expect(btn.className).toContain('bg-red-500')
  })

  it('should show "Loading..." when loading prop is true', () => {
    render(<Button loading>Submit</Button>)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByText('Submit')).not.toBeInTheDocument()
  })

  it('should be disabled when loading', () => {
    render(<Button loading>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick} disabled>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
