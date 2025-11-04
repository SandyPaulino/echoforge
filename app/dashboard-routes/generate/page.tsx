import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ContentSourceList } from '@/components/generate/content-source-list'

export default async function GeneratePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: sources } = await supabase
    .from('content_sources')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Generate Content</h1>
          <p className="text-muted-foreground mt-2">
            Transform your content for multiple platforms
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard-routes/upload">
            <Plus className="mr-2 h-4 w-4" />
            Upload New Content
          </Link>
        </Button>
      </div>

      {!sources || sources.length === 0 ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Ready to Amplify Your Message?</CardTitle>
                <CardDescription className="mt-1">
                  Upload your first piece of content to get started
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                EchoForge will transform your content into platform-native posts for:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  Twitter/X
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                  LinkedIn
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-pink-500" />
                  Instagram
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  Email
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                  Blog
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-700" />
                  Facebook
                </div>
              </div>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/dashboard-routes/upload">
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Your First Content
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <ContentSourceList sources={sources} />
      )}
    </div>
  )
}



