'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import TransactionsDropdown from './transactions-dropdown'
import { getClientCookieValue, setClientCookieValue } from '@/lib/utils'

const EXPIRY_DAYS = 3

const TransactionsDropdownWrapper = ({ selectedMonth, selectedYear }: DashboardFiltersProps) => {
  const router = useRouter()
  const hasInitialized = useRef(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasParams = params.has("month") && params.has("year")

    if (!hasParams) {
      const savedMonth = getClientCookieValue('selectedMonth');
      const savedYear = getClientCookieValue('selectedYear');

      if (savedMonth && savedYear) {
        router.push(`/dashboard?month=${savedMonth}&year=${savedYear}`)
      }
    }
  },[])

  useEffect(() => {
    // Only save to cookies after initial load to avoid overwriting with defaults
    if (!hasInitialized.current) {
      hasInitialized.current = true
      return
    }

    const maxAge = EXPIRY_DAYS * 24 * 60 * 60
    setClientCookieValue('selectedMonth', selectedMonth, maxAge)
    setClientCookieValue('selectedYear', selectedYear.toString(), maxAge)
  }, [selectedMonth, selectedYear])

  return (
    <TransactionsDropdown
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      onMonthChange={(month) => router.push(`/dashboard?month=${month}&year=${selectedYear}`)}
      onYearChange={(year) => router.push(`/dashboard?month=${selectedMonth}&year=${year}`)}
    />
  )
}

export default TransactionsDropdownWrapper