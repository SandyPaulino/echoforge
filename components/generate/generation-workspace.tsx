'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { generateContent } from '@/app/actions/generate'
import { PLATFORM_CONFIGS, type Platform, type ContentSource, type GeneratedContent } from '@/types/content'
import type { BrandVoiceProfile } from '@/types/brand'
import { Loader2, Sparkles, CheckCircle } from 'lucide-react'
import { PlatformCard } from './platform-card'
import { useRouter } from 'next/navigation'

interface GenerationWorkspaceProps {
  source: ContentSource
  voices: BrandVoiceProfile[]
  existingContent: GeneratedContent[]
}

export function GenerationWorkspace({ source, voices, existingContent }: GenerationWorkspaceProps) {
  const router = useRouter()
  const [selectedVoice, setSelectedVoice] = useState<string>(voices.find(v => v.is_default)?.id || '')
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<Platform, boolean>>({
    twitter: true,
    linkedin: true,
    instagram: true,
    email: false,
    blog: false,
    facebook: false,
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>(existingContent)
  const [error, setError] = useState<string | null>(null)

  const handlePlatformToggle = (platform: Platform) => {
    setSelectedPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }))
  }

  const handleGenerate = async () => {
    setError(null)
    setIsGenerating(true)

    try {
      const platformsToGenerate = Object.entries(selectedPlatforms)
        .filter(([_, selected]) => selected)
        .map(([platform]) => ({
          platform: platform as Platform,
          format: getDefaultFormat(platform as Platform)
        }))

      if (platformsToGenerate.length === 0) {
        setError('Please select at least one platform')
        setIsGenerating(false)
        return
      }

      const result = await generateContent(
        source.id,
        platformsToGenerate,
        selectedVoice || undefined
      )

      if (result.error) {
        setError(result.error)
      } else if (result.data) {
        setGeneratedContent(result.data)
        router.refresh()
      }
    } catch (err) {
      setError('Failed to generate content')
    } finally {
      setIsGenerating(false)
    }
  }

  const getDefaultFormat = (platform: Platform): string => {
    return PLATFORM_CONFIGS[platform].formats[0]
  }

  const hasGeneratedContent = generatedContent.length > 0

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generation Settings</CardTitle>
          <CardDescription>
            Choose your brand voice and target platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Brand Voice</Label>
            <Select value={selectedVoice} onValueChange={setSelectedVoice}>
              <SelectTrigger>
                <SelectValue placeholder="Select a brand voice" />
              </SelectTrigger>
              <SelectContent>
                {voices.map((voice) => (
                  <SelectItem key={voice.id} value={voice.id}>
                    {voice.name} {voice.is_default && '(Default)'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {voices.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No brand voices yet.{' '}
                <Button variant="link" className="h-auto p-0 text-xs" asChild>
                  <a href="/dashboard-routes/brand-voice/new">Create one</a>
                </Button>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Select Platforms</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(PLATFORM_CONFIGS).map(([platform, config]) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => handlePlatformToggle(platform as Platform)}
                  className={`
                    p-4 rounded-lg border-2 transition-all text-left
                    ${selectedPlatforms[platform as Platform]
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }
                  `}
                >
                  <div className="font-medium">{config.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {config.formats.join(', ')}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
              {error}
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {hasGeneratedContent && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>
                  {generatedContent.length} platform-native outputs
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                Ready to use
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={generatedContent[0]?.platform || 'twitter'} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                {Object.keys(PLATFORM_CONFIGS).map((platform) => {
                  const hasContent = generatedContent.some(c => c.platform === platform)
                  if (!hasContent) return null
                  return (
                    <TabsTrigger key={platform} value={platform} className="capitalize">
                      {PLATFORM_CONFIGS[platform as Platform].name}
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {Object.keys(PLATFORM_CONFIGS).map((platform) => {
                const platformContent = generatedContent.filter(c => c.platform === platform)
                if (platformContent.length === 0) return null

                return (
                  <TabsContent key={platform} value={platform} className="space-y-4 mt-6">
                    {platformContent.map((content) => (
                      <PlatformCard key={content.id} content={content} />
                    ))}
                  </TabsContent>
                )
              })}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}



