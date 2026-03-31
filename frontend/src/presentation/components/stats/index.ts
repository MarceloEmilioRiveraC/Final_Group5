/**
 * Stats Components Barrel Export
 * 
 * WHY: Barrel exports (index.ts) provide:
 * - Cleaner imports: `import { StatCard } from '@presentation/components/stats'`
 *   instead of long relative paths
 * - Encapsulation: Can reorganize files without breaking imports
 * - Clear API surface: Shows what's publicly exported from this folder
 * - Easier refactoring: Change import paths in one place if needed
 */

export { StatCard }  from './StatCard'
export { SummaryRow } from './SummaryRow'
export { PostIcon, UserIcon, TrendIcon, StarIcon } from './StatsIcons'
export type { StatCardProps, SummaryRowProps, IconProps } from './types'
