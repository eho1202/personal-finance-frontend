// components/section-cards-wrapper.tsx
'use client'

import { useEffect, useState } from 'react'
import { SectionCards } from "@/components/dashboard/section-cards"
import { getGPTSummaryData } from "@/lib/actions/transaction.actions"
import { SectionCardsSkeleton } from '@/components/dashboard/section-card-skeleton';

export function SectionCardsWrapper({ month, year }: { month: string; year: number }) {
  const [gpt_summary, setGptSummary] = useState<GPTSummaryParams | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGPTSummaryData(month, year)
        setGptSummary(data)
      } catch (error) {
        console.error('Failed to fetch GPT summary:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [month, year])

  if (loading) {
    return <SectionCardsSkeleton /> // Or use a skeleton component
  }

  if (!gpt_summary) {
    return <div>Failed to load insights</div>
  }

  return (
    <SectionCards
      month={month}
      year={year}
      spending_insights={gpt_summary.spending_insights}
      month_over_month={gpt_summary.month_over_month}
    />
  )
}