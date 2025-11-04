import { Platform, PLATFORM_CONFIGS } from '@/types/content'
import { ToneType } from '@/types/brand'

export interface TemplateContext {
  sourceContent: string
  platform: Platform
  format: string
  tone: ToneType
  targetAudience?: string
  brandName?: string
}

export function generateFromTemplate(context: TemplateContext): string {
  const { sourceContent, platform, format, tone } = context
  
  // Extract key information from source
  const firstSentence = sourceContent.split(/[.!?]/)[0].trim()
  const mainContent = sourceContent.substring(0, 500).trim()
  
  const templates = getTemplatesForPlatform(platform, format, tone)
  const template = templates[0] || createFallbackTemplate(context)
  
  return processTemplate(template, {
    hook: firstSentence,
    content: mainContent,
    ...context
  })
}

function getTemplatesForPlatform(
  platform: Platform,
  format: string,
  tone: ToneType
): string[] {
  const key = `${platform}-${format}-${tone}`
  return platformTemplates[key] || platformTemplates[`${platform}-${format}`] || []
}

function processTemplate(
  template: string,
  variables: Record<string, any>
): string {
  let result = template
  
  Object.entries(variables).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`
    result = result.replace(new RegExp(placeholder, 'g'), String(value))
  })
  
  return result
}

function createFallbackTemplate(context: TemplateContext): string {
  return `{{hook}}

{{content}}

[Optimized for ${context.platform} - ${context.format}]`
}

// Platform-specific templates
const platformTemplates: Record<string, string[]> = {
  // Twitter templates
  'twitter-thread': [
    `🧵 {{hook}}

1/ {{content}}

2/ Here's what this means for you...

[Thread continues with platform-optimized content]

What are your thoughts? Reply below! 💬`
  ],
  'twitter-post': [
    `{{hook}}

{{content}}

[Engaging closer or question]

#Hashtag1 #Hashtag2`
  ],

  // LinkedIn templates
  'linkedin-post-professional': [
    `{{hook}}

{{content}}

Key insights:
→ Point 1
→ Point 2
→ Point 3

What's your experience with this?

#Industry #Hashtags`
  ],
  'linkedin-post-casual': [
    `{{hook}} 💡

Here's what I've learned:

{{content}}

Drop a comment if this resonates!

#GrowthMindset #Learning`
  ],
  'linkedin-article': [
    `# {{hook}}

## Introduction

{{content}}

## The Big Picture

[Detailed analysis]

## Key Takeaways

• Insight 1
• Insight 2
• Insight 3

## Conclusion

[Summary and call to action]`
  ],

  // Instagram templates
  'instagram-caption': [
    `{{hook}} ✨

{{content}}

💡 Quick tip: [actionable advice]

Save this for later! 📌

#Hashtag #Instagram #Content`
  ],
  'instagram-story': [
    `{{hook}}

[Swipe up to learn more]

#ContentTip`
  ],
  'instagram-reel': [
    `POV: {{hook}} 🎯

{{content}}

Follow for more! 💫

#Reels #Content #Tips`
  ],

  // Email templates
  'email-newsletter': [
    `Subject: {{hook}}

Hey {{firstName}},

{{content}}

Here's what you need to know:

[Key points]

[Call to action]

Talk soon,
{{senderName}}`
  ],
  'email-announcement': [
    `🎉 Exciting News!

{{hook}}

{{content}}

[CTA Button]

Best,
{{senderName}}`
  ],

  // Blog templates
  'blog-article': [
    `# {{hook}}

## Introduction

{{content}}

## Main Content

[Detailed sections]

## Conclusion

[Summary and next steps]`
  ],
  'blog-listicle': [
    `# [Number] Ways to {{topic}}

{{hook}}

## 1. First Point

{{content}}

## 2. Second Point

[Continue with more points]

## Conclusion

[Wrap up]`
  ],

  // Facebook templates
  'facebook-post': [
    `{{hook}} 🎯

{{content}}

What do you think? Drop a comment! 💬

#Facebook #Content`
  ]
}

export default platformTemplates



