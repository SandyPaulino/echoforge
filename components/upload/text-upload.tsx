'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createContentSource } from '@/app/actions/content'
import { Loader2, CheckCircle } from 'lucide-react'

export function TextUpload() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  const charCount = content.length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setIsLoading(true)

    try {
      const result = await createContentSource({
        title: title || 'Untitled Content',
        content_type: 'text',
        source_content: content,
        metadata: {
          word_count: wordCount,
          character_count: charCount
        }
      })

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        // Redirect to generate page after a brief delay
        setTimeout(() => {
          router.push('/dashboard-routes/generate')
        }, 1500)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Give your content a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading || success}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Paste or type your content here...

This could be a blog post, article, podcast transcript, video script, or any text you want to transform into platform-native content."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] font-mono text-sm"
          required
          disabled={isLoading || success}
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
        </div>
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
          {error}
        </div>
      )}

      {success && (
        <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-md p-3 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Content uploaded successfully! Redirecting to generation...
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading || success || !content.trim()}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : success ? (
          <>
            <CheckCircle className="mr-2 h-4 w-4" />
            Uploaded!
          </>
        ) : (
          'Upload Content'
        )}
      </Button>
    </form>
  )
}



