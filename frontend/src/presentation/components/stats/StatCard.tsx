/**
 * StatCard Component
 * 
 * WHY: Extracting this to its own file provides:
 * - Clear separation of concerns: this component only handles card UI
 * - Easier testing: can test styling, truncation, and prop rendering separately
 * - Better reusability: can be used in other dashboards without duplication
 * - Simpler parent component: StatsPage becomes cleaner and more readable
 * - Easier to maintain consistency: any card changes happen in one place
 */

import type { StatCardProps } from './types'

/**
 * Reusable card component for displaying statistics
 * 
 * @param label - The label describing the stat (e.g., "Total Posts")
 * @param value - The main value to display (number or string)
 * @param sub - Optional secondary text (e.g., "2 likes")
 * @param icon - React node for the icon to display
 * @param trend - Optional trend indicator (e.g., "+12.5%")
 * 
 * @example
 * <StatCard
 *   label="Total Posts"
 *   value={stats.totalPosts}
 *   icon={<PostIcon />}
 *   trend="+12.5%"
 * />
 */
export const StatCard = ({
  label,
  value,
  sub,
  icon,
  trend,
}: StatCardProps): React.ReactElement => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        
        {/* WHY truncate: Prevents card from breaking layout if value is too long */}
        <p className="text-xl font-semibold text-gray-800 truncate max-w-[140px]">
          {value}
        </p>

        {/* Conditional rendering: Only show if provided */}
        {sub && (
          <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
        )}

        {/* Trend badge: Shows growth indicator if provided */}
        {trend && (
          <p className="text-xs text-emerald-500 font-medium mt-1">{trend}</p>
        )}
      </div>

      {/* Icon container with fixed size to prevent layout shift */}
      <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
        {icon}
      </div>
    </div>
  )
}
