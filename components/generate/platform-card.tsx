'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Copy, Download, RefreshCw, Edit, Check, MoreVertical } from 'lucide-react'
import type { GeneratedContent } from '@/types/content'
import { updateGeneratedContent, regenerateContent } from '@/app/actions/generate'
import { useRouter } from 'next/navigation'

interface PlatformCardProps {
  content: GeneratedContent
}

export function PlatformCard({ content }: PlatformCardProps) {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(content.generated_text)
  const [isCopied, setIsCopied] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content.generated_text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([content.generated_text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${content.platform}-${content.format}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSave = async () => {
    setIsSaving(true)
    await updateGeneratedContent(content.id, {
      generated_text: editedText,
      status: 'edited'
    })
    setIsEditing(false)
    setIsSaving(false)
    router.refresh()
  }

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    const result = await regenerateContent(content.id)
    if (result.data) {
      setEditedText(result.data.generated_text)
    }
    setIsRegenerating(false)
    router.refresh()
  }

  const charCount = content.generated_text.length
  const wordCount = content.generated_text.split(/\s+/).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="capitalize">{content.format}</CardTitle>
              {content.status === 'edited' && (
                <Badge variant="secondary" className="text-xs">
                  Edited
                </Badge>
              )}
            </div>
            <CardDescription>
              {wordCount} words • {charCount} characters
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsEditing(!isEditing)}>
                <Edit className="mr-2 h-4 w-4" />
                {isEditing ? 'Cancel Edit' : 'Edit'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleRegenerate} disabled={isRegenerating}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                Regenerate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <Textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={isSaving} size="sm">
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button onClick={() => {
                setIsEditing(false)
                setEditedText(content.generated_text)
              }} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="whitespace-pre-wrap text-sm bg-slate-50 dark:bg-slate-900 p-4 rounded-md border">
              {content.generated_text}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCopy} variant="outline" size="sm">
                {isCopied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
              <Button onClick={handleDownload} variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}



