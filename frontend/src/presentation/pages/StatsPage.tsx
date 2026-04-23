/**
 * StatsPage Component
 *
 * Architecture Decisions:
 *
 * 1. Clean Separation of Concerns:
 *    - This page handles: layout, data flow, and error states
 *    - Child components handle: individual UI rendering (StatCard, SummaryRow, Icons)
 *    This follows the Container/Presentational pattern for better testability
 *
 * 2. Extracted Data Validation:
 *    The validateStatsData function ensures API responses are safe before rendering.
 *    WHY: Protects against API schema changes, missing fields, and invalid data types
 *
 * 3. Separate Files for Sub-Components:
 *    Icons, StatCard, and SummaryRow are in their own files because:
 *    - Single Responsibility Principle: Each file has one reason to change
 *    - Reusability: These components can be used elsewhere without duplication
 *    - Testability: Easier to unit test isolated components
 *    - Maintainability: Designer/dev can work on StatCard.tsx without touching this file
 */

import React from 'react'
import { Header } from '@presentation/components/common/Header'
import { useStats } from '@presentation/hooks/useStats'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { StatCard, SummaryRow } from '@presentation/components/stats'
import { PostIcon, UserIcon, TrendIcon, StarIcon } from '@presentation/components/stats/StatsIcons'

import type { Stats } from '@domain/entities/Stats'

/**
 * Validates that the stats object contains all required fields with correct types.
 *
 * @param stats - The stats object to validate
 * @returns true if stats object is valid and safe to render
 */
const validateStatsData = (stats: Stats | null): stats is Stats => {
  if (!stats) return false

  return (
    typeof stats.totalPosts === 'number' &&
    typeof stats.totalUsers === 'number' &&
    typeof stats.totalLikes === 'number' &&
    Array.isArray(stats.postsPerMonth) &&
    // topPost can be null, but if present must have required fields
    (stats.topPost === null || (
      typeof stats.topPost.title === 'string' &&
      typeof stats.topPost.likes === 'number' &&
      typeof stats.topPost.imageUrl === 'string'
    ))
  )
}

export default function StatsPage(): React.ReactElement {
  const { stats, loading, error } = useStats()
  const isValidStats = validateStatsData(stats)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="p-8">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">Analytics Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back! Here's what's happening on the platform today.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center h-64 text-gray-400">
            Loading stats…
          </div>
        )}

        {/* Error / invalid-data state */}
        {!loading && (error || !isValidStats) && (
          <div className="flex items-center justify-center h-64 text-red-400">
            {error ?? 'Unable to load stats. Please try again later.'}
          </div>
        )}

        {/* Main content — only rendered when data is ready */}
        {!loading && isValidStats && (
          <>
            {/* Stat cards grid
                WHY 4-column grid: Desktop-first responsive design
                1 col on mobile, 2 on tablet, 4 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                label="Total Posts"
                value={stats.totalPosts.toLocaleString()}
                icon={<PostIcon />}
                trend="+12.5%"
              />
              <StatCard
                label="Active Users"
                value={stats.totalUsers.toLocaleString()}
                icon={<UserIcon />}
                trend="+8.2%"
              />
              <StatCard
                label="Total Likes"
                value={stats.totalLikes.toLocaleString()}
                icon={<TrendIcon />}
                trend="+5.1%"
              />
              <StatCard
                label="Most Liked Post"
                value={stats.topPost?.title ?? '—'}
                sub={stats.topPost ? `${stats.topPost.likes} likes` : undefined}
                icon={<StarIcon />}
              />
            </div>

            {/* Chart Card */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-800">Posts over time</h2>
                  <p className="text-xs text-gray-400">Monthly post activity</p>
                </div>
              </div>

              {/* WHY: ResponsiveContainer ensures chart adapts to screen sizes */}
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={stats.postsPerMonth.map(m => ({ month: m._id, posts: m.count }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#9ca3af' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      fontSize: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="posts"
                    stroke="#7c3aed"
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#7c3aed', strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bottom row: Featured post + Summary stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Top post spotlight */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-gray-800">Top post</h2>
                </div>

                {stats.topPost ? (
                  <div className="flex items-center gap-4">
                    <img
                      src={stats.topPost.imageUrl}
                      alt={stats.topPost.title}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{stats.topPost.title}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {stats.topPost.likes} likes
                      </p>
                      <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                        Most liked
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No posts yet</p>
                )}
              </div>

              {/* Summary stats */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-base font-semibold text-gray-800 mb-4">Summary</h2>
                <ul className="space-y-4">
                  <SummaryRow label="Total posts" value={stats.totalPosts} />
                  <SummaryRow label="Total users" value={stats.totalUsers} />
                  <SummaryRow label="Total likes" value={stats.totalLikes} />
                  {/* Guard against division by zero */}
                  <SummaryRow
                    label="Avg likes/post"
                    value={
                      stats.totalPosts > 0
                        ? +(stats.totalLikes / stats.totalPosts).toFixed(1)
                        : 0
                    }
                  />
                </ul>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  )
}
