import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'
import { GenerationWorkspace } from '@/components/generate/generation-workspace'

export default async function GenerateDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: source } = await supabase
    .from('content_sources')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (!source) {
    redirect('/dashboard-routes/generate')
  }

  // Get brand voices
  const { data: voices } = await supabase
    .from('brand_voice_profiles')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false })

  // Get existing generated content for this source
  const { data: existingContent } = await supabase
    .from('generated_content')
    .select('*')
    .eq('source_id', params.id)
    .eq('user_id', user.id)

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/dashboard-routes/generate">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Generate
          </Link>
        </Button>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <Badge variant="secondary">{source.content_type}</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">{source.title}</h1>
            <p className="text-muted-foreground mt-2">
              Generate platform-native content from your source
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Source Content</CardTitle>
          <CardDescription>
            {source.metadata?.word_count || source.source_content.split(/\s+/).length} words
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm whitespace-pre-wrap bg-slate-50 dark:bg-slate-900 p-4 rounded-md border max-h-[300px] overflow-y-auto">
            {source.source_content}
          </div>
        </CardContent>
      </Card>

      <GenerationWorkspace 
        source={source} 
        voices={voices || []} 
        existingContent={existingContent || []}
      />
    </div>
  )
}



