'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FileText, Calendar, ArrowRight } from 'lucide-react'
import type { ContentSource } from '@/types/content'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface ContentSourceListProps {
  sources: ContentSource[]
}

export function ContentSourceList({ sources }: ContentSourceListProps) {
  return (
    <div className="grid gap-4">
      {sources.map((source) => {
        const excerpt = source.source_content.substring(0, 150)
        const wordCount = source.metadata?.word_count || source.source_content.split(/\s+/).length

        return (
          <Card key={source.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="secondary" className="text-xs">
                      {source.content_type}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{source.title}</CardTitle>
                  <CardDescription className="mt-2 line-clamp-2">
                    {excerpt}...
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{wordCount} words</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDistanceToNow(new Date(source.created_at), { addSuffix: true })}
                  </span>
                </div>
                <Button asChild>
                  <Link href={`/dashboard-routes/generate/${source.id}`}>
                    Generate
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}



