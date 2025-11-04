'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Coins } from 'lucide-react'
import { getUserCredits } from '@/app/actions/credits'

export function CreditBadge() {
  const [credits, setCredits] = useState<number | null>(null)

  useEffect(() => {
    const fetchCredits = async () => {
      const result = await getUserCredits()
      if (result.data) {
        setCredits(result.data.remaining_credits)
      }
    }
    fetchCredits()
  }, [])

  if (credits === null) return null

  return (
    <Badge variant="secondary" className="gap-1.5">
      <Coins className="h-3 w-3" />
      {credits} credits
    </Badge>
  )
}



