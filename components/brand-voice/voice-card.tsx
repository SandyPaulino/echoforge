'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Star, Trash2, Edit } from 'lucide-react'
import type { BrandVoiceProfile } from '@/types/brand'
import { deleteBrandVoice, updateBrandVoice } from '@/app/actions/brand-voice'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface BrandVoiceCardProps {
  voice: BrandVoiceProfile
}

export function BrandVoiceCard({ voice }: BrandVoiceCardProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${voice.name}"?`)) {
      return
    }

    setIsDeleting(true)
    await deleteBrandVoice(voice.id)
    router.refresh()
  }

  const handleSetDefault = async () => {
    await updateBrandVoice({
      id: voice.id,
      is_default: true
    })
    router.refresh()
  }

  return (
    <Card className={voice.is_default ? 'border-primary' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle>{voice.name}</CardTitle>
              {voice.is_default && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Default
                </Badge>
              )}
            </div>
            <CardDescription className="capitalize">
              {voice.tone} tone
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!voice.is_default && (
                <DropdownMenuItem onClick={handleSetDefault}>
                  <Star className="mr-2 h-4 w-4" />
                  Set as Default
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {voice.target_audience && (
          <div>
            <p className="text-sm font-medium mb-1">Target Audience</p>
            <p className="text-sm text-muted-foreground">{voice.target_audience}</p>
          </div>
        )}

        {voice.style_guide && (
          <div>
            <p className="text-sm font-medium mb-1">Style Guide</p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {voice.style_guide}
            </p>
          </div>
        )}

        {voice.example_texts && voice.example_texts.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Example Texts</p>
            <div className="space-y-2">
              {voice.example_texts.slice(0, 2).map((example, index) => (
                <div
                  key={index}
                  className="text-xs p-2 bg-slate-50 dark:bg-slate-900 rounded border italic line-clamp-2"
                >
                  "{example}"
                </div>
              ))}
              {voice.example_texts.length > 2 && (
                <p className="text-xs text-muted-foreground">
                  +{voice.example_texts.length - 2} more examples
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}



