import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Zap, MessageSquare } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to EchoForge</h1>
        <p className="text-muted-foreground">
          Signed in as <span className="font-medium text-foreground">{user?.email}</span>
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>AI Engine</CardTitle>
            </div>
            <CardDescription>
              Transform your content with intelligent automation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The AI engine is ready to amplify your messages across multiple platforms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-primary" />
              <CardTitle>Quick Actions</CardTitle>
            </div>
            <CardDescription>
              Get started with common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create your first content transformation campaign in minutes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <CardTitle>Distribution</CardTitle>
            </div>
            <CardDescription>
              Reach your audience everywhere
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              One message, infinite echoes across all your channels.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Follow these steps to set up your content automation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start space-x-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                1
              </span>
              <div>
                <p className="font-medium">Configure your brand voice</p>
                <p className="text-muted-foreground">
                  Let EchoForge learn your unique style and tone
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                2
              </span>
              <div>
                <p className="font-medium">Connect your platforms</p>
                <p className="text-muted-foreground">
                  Link your social media and content channels
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                3
              </span>
              <div>
                <p className="font-medium">Start creating</p>
                <p className="text-muted-foreground">
                  Upload your content and watch it transform
                </p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

