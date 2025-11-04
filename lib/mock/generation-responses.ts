import { Platform } from '@/types/content'

interface MockGenerationResponse {
  platform: Platform
  format: string
  content: string
  metadata?: Record<string, any>
}

export function generateMockContent(
  sourceContent: string,
  platform: Platform,
  format: string,
  brandVoice?: string
): MockGenerationResponse {
  // Extract first sentence or create a hook
  const hook = sourceContent.split('.')[0] + '.'
  const mainPoint = sourceContent.substring(0, 150).trim()

  const responses: Record<Platform, Record<string, string>> = {
    twitter: {
      thread: `🧵 Thread: ${hook}

1/ ${mainPoint}...

2/ Here's why this matters: [Platform-native content performs 3x better]

3/ The key is adapting your message to each platform's unique format and audience expectations.

4/ That's where AI comes in—maintaining your voice while optimizing for each channel.

5/ Want to see this in action? Try transforming one piece of content across all your platforms.`,
      post: `${hook.substring(0, 220)}... 

Transform one message into platform-native content across all channels. 

#ContentStrategy #AI`,
      reply: `Great point! ${mainPoint.substring(0, 200)}... 

This is exactly why platform-native content matters.`
    },
    linkedin: {
      post: `${hook}

${mainPoint}

Here's what I've learned:

→ Distribution beats creation
→ Platform-native wins every time
→ Consistency requires automation
→ Your brand voice should stay constant

The future isn't about creating more content. It's about amplifying what you already have.

What's your biggest content distribution challenge?

#ContentStrategy #AI #Marketing`,
      article: `# ${hook}

## The Challenge

${mainPoint}

## Why This Matters

In today's digital landscape, creating great content is only half the battle. The real challenge is getting that content in front of your audience—on every platform where they spend their time.

## The Solution

Platform-native content that maintains your brand voice while adapting to each channel's unique format and audience expectations.

## Key Takeaways

• Focus on distribution, not just creation
• Adapt content for each platform's format
• Maintain consistent brand voice
• Use AI to scale without burning out

## Moving Forward

The creators and brands that thrive will be those who master the art of amplification.`,
      comment: `Insightful post! ${mainPoint.substring(0, 150)}...

This aligns perfectly with what we're seeing in the market. Would love to hear more about your approach.`
    },
    instagram: {
      caption: `${hook.substring(0, 100)} ✨

${mainPoint.substring(0, 150)}...

Here's the truth: great content deserves great distribution.

💡 Tips:
• Platform-native wins
• Maintain your voice
• Automate what you can
• Focus on impact

What's your content strategy? Drop a 💭 below!

#ContentCreator #SocialMediaTips #MarketingStrategy`,
      story: `${hook}

Swipe up to learn more 👆

#ContentStrategy`,
      reel: `POV: You just learned how to 10x your content reach 🎯

${mainPoint.substring(0, 100)}...

Save this for later! 📌

#ContentTips #CreatorEconomy`
    },
    email: {
      newsletter: `Subject: ${hook}

Hey there,

${mainPoint}

Here's what you need to know:

**The Problem:**
Most creators spend 70% of their time repurposing content manually.

**The Solution:**
Platform-native content that adapts automatically while maintaining your unique voice.

**Why It Works:**
→ Consistent presence across platforms
→ Better engagement (3x on average)
→ More time for strategy

**What You Can Do:**
Start by identifying your core content pieces. Then, ask yourself: how can each piece be adapted for different platforms?

The goal isn't more content—it's better distribution.

Talk soon,
[Your Name]

P.S. Reply to this email and let me know your biggest content challenge!`,
      announcement: `🎉 Exciting News!

${hook}

${mainPoint}

This changes everything for creators and marketers who want to scale their reach without burning out.

Ready to learn more? Click here →

Best,
[Your Name]`,
      'follow-up': `Hey [Name],

Following up on ${hook.toLowerCase()}

${mainPoint.substring(0, 120)}...

Wanted to make sure this was on your radar. Would love to hear your thoughts!

Best,
[Your Name]`
    },
    blog: {
      article: `# ${hook}

## Introduction

${mainPoint}

In this article, we'll explore why distribution has become the critical bottleneck for content creators and how AI-powered tools are changing the game.

## The Distribution Challenge

Creating great content has never been easier. But getting that content in front of your audience? That's where most creators struggle.

Research shows that successful creators spend up to 70% of their time on content repurposing and distribution—leaving only 30% for actual creation.

## Why Platform-Native Matters

Platform-native content consistently outperforms generic cross-posts by 3-5x. Here's why:

• Each platform has unique audience expectations
• Format matters as much as message
• Timing and context vary by channel
• Engagement patterns differ significantly

## The Solution

The future belongs to creators who can maintain their authentic voice while adapting seamlessly to each platform's unique requirements.

## Conclusion

${hook} The question isn't whether to distribute your content broadly—it's how to do it effectively at scale.`,
      listicle: `# 5 Ways to ${hook.replace('.', '')}

${mainPoint}

Here's your complete guide:

## 1. Start With Strong Source Content

Quality in = quality out. Make sure your original content is valuable and well-structured.

## 2. Understand Platform Nuances

Twitter loves threads. LinkedIn wants insights. Instagram needs visuals.

## 3. Maintain Your Brand Voice

Consistency across platforms builds trust and recognition.

## 4. Optimize for Each Format

Don't just copy-paste. Adapt the format, length, and style.

## 5. Measure and Iterate

Track what works on each platform and refine your approach.

## Conclusion

Distribution is the new creation. Master it, and you'll 10x your impact.`,
      tutorial: `# How to ${hook.replace('.', '')} - Step-by-Step Guide

${mainPoint}

## What You'll Need

• Your source content
• Understanding of each platform's format
• Brand voice guidelines
• Time for adaptation (or AI tools to help)

## Step 1: Identify Your Core Message

Start with your key takeaway. What's the one thing you want audiences to remember?

## Step 2: Map to Platform Formats

Twitter: Thread or single post?
LinkedIn: Post or article?
Instagram: Feed, story, or reel?

## Step 3: Adapt, Don't Duplicate

Tailor the message, format, and tone for each platform's audience.

## Step 4: Maintain Voice Consistency

Your brand should be recognizable across all channels.

## Step 5: Schedule and Publish

Use a scheduling tool or automation to maintain consistency.

## Conclusion

${hook} Follow this framework and watch your reach multiply.`
    },
    facebook: {
      post: `${hook} 🎯

${mainPoint}

Here's what I've discovered about content distribution...

[Rest of your content adapted for Facebook's format]

What do you think? Drop a comment below! 💬

#ContentStrategy #SocialMedia`,
      story: `${hook.substring(0, 80)}

Tap for more 👆

[Adapted for Facebook Stories format]`
    }
  }

  const content = responses[platform]?.[format] || `${hook}\n\n${mainPoint}\n\n[Content adapted for ${platform} - ${format}]`

  return {
    platform,
    format,
    content,
    metadata: {
      generated_at: new Date().toISOString(),
      character_count: content.length,
      estimated_engagement: Math.floor(Math.random() * 100) + 50
    }
  }
}

export const mockGenerationExamples = {
  twitter: generateMockContent(
    'EchoForge transforms your content into platform-native posts automatically.',
    'twitter',
    'thread'
  ),
  linkedin: generateMockContent(
    'EchoForge transforms your content into platform-native posts automatically.',
    'linkedin',
    'post'
  ),
  instagram: generateMockContent(
    'EchoForge transforms your content into platform-native posts automatically.',
    'instagram',
    'caption'
  )
}



