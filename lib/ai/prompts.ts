import { Platform } from '@/types/content'
import { ToneType } from '@/types/brand'

export interface PromptContext {
  sourceContent: string
  platform: Platform
  format: string
  tone: ToneType
  styleGuide?: string
  targetAudience?: string
  exampleTexts?: string[]
}

/**
 * Generate system prompt for AI
 */
export function generateSystemPrompt(context: PromptContext): string {
  return `You are an expert content strategist specializing in platform-native content creation.

Your task is to transform source content into ${context.platform}-optimized ${context.format} that:
- Maintains the core message and value
- Adapts to ${context.platform}'s format and audience expectations
- Uses a ${context.tone} tone
${context.styleGuide ? `- Follows this style guide: ${context.styleGuide}` : ''}
${context.targetAudience ? `- Targets: ${context.targetAudience}` : ''}

Key principles:
1. Platform-native content performs 3x better than generic cross-posts
2. Each platform has unique engagement patterns
3. Maintain brand voice while adapting format
4. Focus on value and clarity

${getPlatformGuidelines(context.platform, context.format)}`
}

/**
 * Generate user prompt for content transformation
 */
export function generateUserPrompt(context: PromptContext): string {
  return `Transform this content for ${context.platform}:

SOURCE CONTENT:
${context.sourceContent}

TARGET FORMAT: ${context.format}
TONE: ${context.tone}

${context.exampleTexts && context.exampleTexts.length > 0 ? `
BRAND VOICE EXAMPLES:
${context.exampleTexts.map((ex, i) => `${i + 1}. ${ex}`).join('\n')}
` : ''}

Generate platform-native content that captures the essence of the source while optimizing for ${context.platform}'s format and audience.`
}

/**
 * Platform-specific guidelines
 */
function getPlatformGuidelines(platform: Platform, format: string): string {
  const guidelines: Record<Platform, Record<string, string>> = {
    twitter: {
      thread: `Twitter Thread Guidelines:
- Start with a hook that stops the scroll
- Number tweets (1/, 2/, 3/)
- Keep each tweet under 280 characters
- Use line breaks for readability
- End with a question or call to action
- Max 10-15 tweets for engagement`,
      post: `Twitter Post Guidelines:
- Lead with value in first line
- Use 2-3 relevant hashtags
- Include emojis sparingly
- Stay under 280 characters
- End with engagement prompt`,
      reply: `Twitter Reply Guidelines:
- Be conversational and genuine
- Add value, don't just agree
- Keep it concise
- Use @mentions appropriately`
    },
    linkedin: {
      post: `LinkedIn Post Guidelines:
- Professional yet personable tone
- Use line breaks and emojis (→ • ✓)
- Share insights, not just information
- 1300-2000 characters optimal
- End with a question
- 3-5 relevant hashtags`,
      article: `LinkedIn Article Guidelines:
- Long-form content (1000-2000 words)
- Clear structure with headings
- Data-driven insights
- Professional formatting
- Actionable takeaways`,
      comment: `LinkedIn Comment Guidelines:
- Add genuine value
- Professional tone
- Thoughtful engagement
- Build relationships`
    },
    instagram: {
      caption: `Instagram Caption Guidelines:
- Hook in first line (visible without "more")
- Emojis for visual breaks
- Tell a story
- Include call to action
- 20-30 hashtags (add at end or first comment)
- 2200 character limit`,
      story: `Instagram Story Guidelines:
- Vertical format focus
- Text should be large and readable
- Interactive elements
- Swipe-up worthy
- Mobile-first design`,
      reel: `Instagram Reel Guidelines:
- Hook in first 3 seconds
- Short, punchy text
- Trending audio consideration
- Mobile-optimized
- Clear value proposition`
    },
    email: {
      newsletter: `Email Newsletter Guidelines:
- Compelling subject line
- Personal greeting
- Scannable format
- Clear sections
- Strong CTA
- P.S. for extra engagement`,
      announcement: `Email Announcement Guidelines:
- Exciting subject line
- Get to the point quickly
- Highlight benefits
- Clear next steps
- Professional signature`,
      'follow-up': `Follow-up Email Guidelines:
- Reference previous conversation
- Add value, not just "checking in"
- Clear ask or next step
- Professional but warm`
    },
    blog: {
      article: `Blog Article Guidelines:
- SEO-optimized title
- Clear structure (H2, H3)
- 1500+ words for depth
- Internal/external links
- Conclusion with CTA
- Meta description ready`,
      listicle: `Listicle Guidelines:
- Number in title
- Consistent section format
- Actionable items
- Brief but valuable
- Summary at end`,
      tutorial: `Tutorial Guidelines:
- Step-by-step format
- Screenshots/examples
- Prerequisites section
- Clear instructions
- Troubleshooting tips`
    },
    facebook: {
      post: `Facebook Post Guidelines:
- Conversational tone
- Questions to drive comments
- Visual content support
- Community-building focus
- Emojis and formatting`,
      story: `Facebook Story Guidelines:
- Mobile-first vertical
- Interactive elements
- 24-hour relevance
- Casual, authentic tone`
    }
  }

  return guidelines[platform]?.[format] || 'Follow general best practices for the platform.'
}

/**
 * Generate prompt for brand voice learning
 */
export function generateVoiceAnalysisPrompt(exampleTexts: string[]): string {
  return `Analyze these writing samples and extract the brand voice characteristics:

${exampleTexts.map((text, i) => `Example ${i + 1}:\n${text}`).join('\n\n')}

Identify:
1. Tone (professional, casual, friendly, etc.)
2. Common phrases or vocabulary
3. Sentence structure patterns
4. Use of punctuation and formatting
5. Personality traits

Provide a detailed voice profile that can be used to generate consistent content.`
}

/**
 * Generate optimization prompt
 */
export function generateOptimizationPrompt(
  content: string,
  platform: Platform,
  issues: string[]
): string {
  return `Optimize this ${platform} content to address these issues:

CURRENT CONTENT:
${content}

ISSUES TO FIX:
${issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}

Provide an improved version that maintains the core message while fixing the issues.`
}

