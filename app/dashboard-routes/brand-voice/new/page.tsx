import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BrandVoiceForm } from '@/components/brand-voice/voice-form'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NewBrandVoicePage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/dashboard-routes/brand-voice">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Brand Voices
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create Brand Voice Profile</h1>
        <p className="text-muted-foreground mt-2">
          Define your unique communication style
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>
            Help EchoForge understand how you want to communicate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BrandVoiceForm />
        </CardContent>
      </Card>
    </div>
  )
}



