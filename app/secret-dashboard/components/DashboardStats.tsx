"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flower, Users, BookOpen, TrendingUp } from "lucide-react"

interface DashboardStatsProps {
  stats: any
  loading: boolean
}

export default function DashboardStats({ stats, loading }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Flowers"
        value={stats.flowers}
        icon={<Flower className="h-5 w-5" />}
        description="Available products"
        loading={loading}
        color="bg-emerald-100 text-emerald-800 dark:bg-emerald-800/30 dark:text-emerald-300"
      />

      <StatCard
        title="Users"
        value={stats.users}
        icon={<Users className="h-5 w-5" />}
        description="Registered accounts"
        loading={loading}
        color="bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300"
      />

      <StatCard
        title="Blog Posts"
        value={stats.posts}
        icon={<BookOpen className="h-5 w-5" />}
        description="Blog publications"
        loading={loading}
        color="bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-300"
      />

      <StatCard
        title="Total Views"
        value={stats.totalViews}
        icon={<TrendingUp className="h-5 w-5" />}
        description="Across all pages"
        loading={loading}
        color="bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-300"
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  description: string
  loading: boolean
  color: string
}

function StatCard({ title, value, icon, description, loading, color }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
        ) : (
          <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        )}
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

