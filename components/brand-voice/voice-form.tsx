'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createBrandVoice } from '@/app/actions/brand-voice'
import { TONE_OPTIONS } from '@/types/brand'
import type { ToneType } from '@/types/brand'
import { Loader2, CheckCircle, Plus, X } from 'lucide-react'

export function BrandVoiceForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [tone, setTone] = useState<ToneType>('professional')
  const [styleGuide, setStyleGuide] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [exampleTexts, setExampleTexts] = useState<string[]>(['', '', ''])
  const [isDefault, setIsDefault] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleAddExample = () => {
    setExampleTexts([...exampleTexts, ''])
  }

  const handleRemoveExample = (index: number) => {
    setExampleTexts(exampleTexts.filter((_, i) => i !== index))
  }

  const handleExampleChange = (index: number, value: string) => {
    const newExamples = [...exampleTexts]
    newExamples[index] = value
    setExampleTexts(newExamples)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setIsLoading(true)

    try {
      const validExamples = exampleTexts.filter(text => text.trim().length > 0)
      
      const result = await createBrandVoice({
        name,
        tone,
        style_guide: styleGuide || undefined,
        target_audience: targetAudience || undefined,
        example_texts: validExamples.length > 0 ? validExamples : undefined,
        is_default: isDefault
      })

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push('/dashboard-routes/brand-voice')
          router.refresh()
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
        <Label htmlFor="name">Profile Name *</Label>
        <Input
          id="name"
          placeholder="e.g., Professional Tech, Casual Creator"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading || success}
        />
        <p className="text-xs text-muted-foreground">
          Give this voice profile a memorable name
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tone">Tone *</Label>
        <Select value={tone} onValueChange={(value) => setTone(value as ToneType)} disabled={isLoading || success}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TONE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="target-audience">Target Audience</Label>
        <Input
          id="target-audience"
          placeholder="e.g., B2B tech executives, Content creators, Startup founders"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          disabled={isLoading || success}
        />
        <p className="text-xs text-muted-foreground">
          Who are you communicating with?
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="style-guide">Style Guide</Label>
        <Textarea
          id="style-guide"
          placeholder="Describe your writing style, vocabulary preferences, formatting rules, and any specific guidelines...

Example: Clear and concise. Use industry terminology but remain accessible. Avoid jargon when simpler words work. Always use active voice."
          value={styleGuide}
          onChange={(e) => setStyleGuide(e.target.value)}
          className="min-h-[100px]"
          disabled={isLoading || success}
        />
      </div>

      <div className="space-y-2">
        <Label>Example Texts</Label>
        <p className="text-xs text-muted-foreground mb-3">
          Provide 3-5 examples of your writing to help the AI learn your voice
        </p>
        <div className="space-y-3">
          {exampleTexts.map((example, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                placeholder={`Example ${index + 1}: Write a sample in your typical voice...`}
                value={example}
                onChange={(e) => handleExampleChange(index, e.target.value)}
                className="min-h-[80px]"
                disabled={isLoading || success}
              />
              {exampleTexts.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveExample(index)}
                  disabled={isLoading || success}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        {exampleTexts.length < 5 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddExample}
            disabled={isLoading || success}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Example
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is-default"
          checked={isDefault}
          onChange={(e) => setIsDefault(e.target.checked)}
          disabled={isLoading || success}
          className="rounded border-gray-300"
        />
        <Label htmlFor="is-default" className="cursor-pointer">
          Set as default voice profile
        </Label>
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
          {error}
        </div>
      )}

      {success && (
        <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-md p-3 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          Brand voice created successfully! Redirecting...
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading || success}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || success || !name} className="flex-1">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : success ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Created!
            </>
          ) : (
            'Create Profile'
          )}
        </Button>
      </div>
    </form>
  )
}



