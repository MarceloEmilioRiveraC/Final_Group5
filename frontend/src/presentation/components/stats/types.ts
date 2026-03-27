/**
 * Shared TypeScript interfaces for Stats components
 * 
 * WHY: Centralizing types prevents prop interface duplication,
 * makes refactoring easier, and provides a single source of truth
 * for component contracts. This follows the Clean Architecture principle
 * of creating clear contracts between layers.
 */

export interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  icon: React.ReactNode
  trend?: string
}

export interface SummaryRowProps {
  label: string
  value: number
}

export interface IconProps {
  size?: number
  className?: string
}
