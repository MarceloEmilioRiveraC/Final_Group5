/**
 * SVG Icons for Stats Dashboard
 * 
 * WHY: Separating icons into their own file makes them:
 * - Reusable across multiple components
 * - Easier to update styling consistently
 * - Simpler to add accessibility attributes (aria-label, role)
 * - Cleaner to test in isolation
 * - Easier to replace with icon library later (e.g., react-icons)
 */

import type { IconProps } from './types'

/**
 * Post/Document icon
 * Used to represent total posts count
 */
export const PostIcon = ({ size = 16, className = '' }: IconProps): React.ReactNode => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
    className={className}
    role="img"
    aria-label="Post icon"
  >
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M7 8h10M7 12h7" />
  </svg>
)

/**
 * User/Profile icon
 * Used to represent active users count
 */
export const UserIcon = ({ size = 16, className = '' }: IconProps): React.ReactNode => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
    className={className}
    role="img"
    aria-label="User icon"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
)

/**
 * Trending/Graph icon
 * Used to represent total likes/engagement
 */
export const TrendIcon = ({ size = 16, className = '' }: IconProps): React.ReactNode => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
    className={className}
    role="img"
    aria-label="Trending icon"
  >
    <path d="M3 17l5-5 4 4 9-9" />
  </svg>
)

/**
 * Star/Favorite icon
 * Used to represent the most liked/featured post
 */
export const StarIcon = ({ size = 16, className = '' }: IconProps): React.ReactNode => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
    className={className}
    role="img"
    aria-label="Star icon"
  >
    <path d="M12 2l3 6.5 7 1-5 5 1.2 7L12 18l-6.2 3.5L7 14.5l-5-5 7-1z" />
  </svg>
)
