'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createContentSource } from '@/app/actions/content'
import { Loader2, Link2, CheckCircle } from 'lucide-react'

export function UrlImport() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString)
      return true
    } catch {
      return false
    }
  }

  const extractPlatform = (url: string): string => {
    try {
      const urlObj = new URL(url)
      const hostname = urlObj.hostname.replace('www.', '')
      
      if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
        return 'YouTube'
      } else if (hostname.includes('substack.com')) {
        return 'Substack'
      } else if (hostname.includes('medium.com')) {
        return 'Medium'
      } else if (hostname.includes('notion.so')) {
        return 'Notion'
      }
      
      return hostname
    } catch {
      return 'Unknown'
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL')
      return
    }

    setIsLoading(true)

    try {
      const platform = extractPlatform(url)
      
      // For MVP, we'll create a placeholder
      // In production, this would fetch and parse the content
      const result = await createContentSource({
        title: `Imported from ${platform}`,
        content_type: 'url',
        source_content: `Content imported from: ${url}

[Note: URL import feature coming soon. For now, please copy and paste the content manually in the Text tab.]

This is a placeholder for the imported content. In production, EchoForge will automatically fetch and parse content from:
- YouTube videos (transcripts)
- Blog posts (articles)
- Podcasts (transcripts)
- And more...`,
        source_url: url,
        metadata: {
          platform,
          imported_at: new Date().toISOString()
        }
      })

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push('/dashboard-routes/generate')
        }, 1500)
      }
    } catch (err) {
      setError('Failed to import URL')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="url">Content URL</Label>
        <div className="relative">
          <Link2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="url"
            type="url"
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-10"
            disabled={isLoading || success}
            required
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Supported: YouTube, Substack, Medium, Notion, and more
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md p-4">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          How it works
        </h4>
        <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
          <li>• YouTube: Extracts video transcript</li>
          <li>• Blog posts: Parses article content</li>
          <li>• Podcasts: Fetches episode transcript</li>
          <li>• Notion: Imports page content</li>
        </ul>
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
          {error}
        </div>
      )}

      {success && (
        <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-md p-3 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          URL imported successfully! Redirecting...
        </div>
      )}

      <Button type="submit" className="w-full" disabled={!url || isLoading || success}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Importing...
          </>
        ) : success ? (
          <>
            <CheckCircle className="mr-2 h-4 w-4" />
            Imported!
          </>
        ) : (
          'Import from URL'
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        MVP Note: URL parsing is simplified. Full integration coming in next release.
      </p>
    </form>
  )
}



