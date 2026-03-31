/**
 * SummaryRow Component
 * 
 * WHY: Extracting this reusable item into its own file:
 * - Reduces duplication in list rendering
 * - Makes styling changes affect all rows consistently
 * - Allows easy unit testing of row formatting
 * - Improves readability in parent component (less JSX nesting)
 */

import type { SummaryRowProps } from './types'

/**
 * Displays a label-value pair in a summary list
 * 
 * @param label - The description of the stat
 * @param value - The numeric value to display (auto-formatted with locale)
 * 
 * @example
 * <SummaryRow label="Total posts" value={stats.totalPosts} />
 */
export const SummaryRow = ({ label, value }: SummaryRowProps): React.ReactElement => {
  return (
    <li className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{label}</span>
      
      {/* WHY toLocaleString(): Makes large numbers more readable (1000 → 1,000) */}
      <span className="text-sm font-semibold text-gray-800">
        {value.toLocaleString()}
      </span>
    </li>
  )
}
