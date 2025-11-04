import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { BrandVoiceCard } from '@/components/brand-voice/voice-card'

export default async function BrandVoicePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: voices } = await supabase
    .from('brand_voice_profiles')
    .select('*')
    .eq('user_id', user.id)
    .order('is_default', { ascending: false })
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Brand Voice Profiles</h1>
          <p className="text-muted-foreground mt-2">
            Define how EchoForge should communicate on your behalf
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard-routes/brand-voice/new">
            <Plus className="mr-2 h-4 w-4" />
            New Profile
          </Link>
        </Button>
      </div>

      {!voices || voices.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Brand Voices Yet</CardTitle>
            <CardDescription>
              Create your first brand voice profile to maintain consistency across all platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard-routes/brand-voice/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Profile
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {voices.map((voice) => (
            <BrandVoiceCard key={voice.id} voice={voice} />
          ))}
        </div>
      )}

      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-100">
            What is a Brand Voice?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
          <p>
            Your brand voice is how you communicate with your audience. It includes your tone,
            style, vocabulary, and personality.
          </p>
          <p>
            EchoForge uses your brand voice to ensure all generated content maintains consistency
            across every platform while adapting to each platform's unique format.
          </p>
          <ul className="list-disc list-inside space-y-1 mt-3">
            <li>Define multiple voices for different audiences</li>
            <li>Provide examples to train the AI</li>
            <li>Set one as your default</li>
            <li>Update anytime as your brand evolves</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}



