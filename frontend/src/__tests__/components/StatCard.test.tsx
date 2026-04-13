import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StatCard } from '@presentation/components/stats/StatCard'

describe('StatCard Component', () => {
  const defaultProps = {
    label: 'Total Posts',
    value: '42',
    icon: <span data-testid="icon">icon</span>,
  }

  it('should render label and value', () => {
    render(<StatCard {...defaultProps} />)
    expect(screen.getByText('Total Posts')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('should render the icon', () => {
    render(<StatCard {...defaultProps} />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('should render sub text when provided', () => {
    render(<StatCard {...defaultProps} sub="2 likes" />)
    expect(screen.getByText('2 likes')).toBeInTheDocument()
  })

  it('should not render sub text when not provided', () => {
    render(<StatCard {...defaultProps} />)
    expect(screen.queryByText('2 likes')).not.toBeInTheDocument()
  })

  it('should render trend when provided', () => {
    render(<StatCard {...defaultProps} trend="+12.5%" />)
    expect(screen.getByText('+12.5%')).toBeInTheDocument()
  })

  it('should not render trend when not provided', () => {
    const { container } = render(<StatCard {...defaultProps} />)
    const trendEl = container.querySelector('.text-emerald-500')
    expect(trendEl).toBeNull()
  })

  it('should render numeric values as strings', () => {
    render(<StatCard label="Count" value={100} icon={<span>i</span>} />)
    expect(screen.getByText('100')).toBeInTheDocument()
  })
})
