import { ContentSource, ContentType } from '@/types/content'

export const sampleContentSources: Omit<ContentSource, 'id' | 'user_id' | 'created_at' | 'updated_at'>[] = [
  {
    title: 'Product Launch Announcement',
    content_type: 'text',
    source_content: `We're excited to announce the launch of EchoForge, the AI engine for modern communication. 

EchoForge transforms a single message into platform-specific content across Twitter, LinkedIn, Instagram, and more. It's not just about creating content—it's about distributing it effectively.

With adaptive AI that learns your brand voice, you can maintain consistency while reaching audiences on every channel. One upload, infinite echoes.

Built for creators, agencies, and brands who want to scale their reach without scaling their workload.`,
    metadata: {
      word_count: 85,
      estimated_read_time: '30 seconds'
    }
  },
  {
    title: 'Podcast Episode Summary',
    content_type: 'text',
    source_content: `In this week's episode, we dive deep into the future of AI-powered content creation. Our guest, Sarah Chen, discusses how automation is changing the creator economy and why distribution is the next frontier.

Key takeaways:
- Content creation tools are abundant, but distribution remains manual
- Successful creators spend 70% of their time on repurposing
- Platform-native content performs 3x better than cross-posts
- AI can maintain brand voice across different formats
- The future is about amplification, not just creation

Sarah shares her framework for building a content distribution system that scales without burning out.`,
    metadata: {
      duration: '45 minutes',
      word_count: 120
    }
  },
  {
    title: 'Customer Success Story',
    content_type: 'text',
    source_content: `When marketing agency BrightPath started using EchoForge, they were managing 15 clients and spending 20+ hours weekly on content repurposing.

The challenge: Each client needed content adapted for 5-7 platforms, maintaining unique brand voices while meeting tight deadlines.

The solution: EchoForge's brand voice profiles and automated transformation reduced their repurposing time by 80%.

Results after 3 months:
- 20 hours saved per week
- 300% increase in content output
- Maintained consistent brand voice across all platforms
- Took on 8 new clients without hiring

"EchoForge didn't just save us time—it transformed our business model," says founder Maria Rodriguez.`,
    metadata: {
      client: 'BrightPath Agency',
      result_metric: '80% time saved'
    }
  }
]

export const sampleVideoContent: Omit<ContentSource, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
  title: 'How to 10x Your Content Reach',
  content_type: 'video',
  source_content: 'Transcript: Hey everyone! Today I want to share the exact system I use to take one piece of content and turn it into 50 platform-specific posts. This isn't about copy-pasting—it's about strategic adaptation. Let me show you how...',
  source_url: 'https://youtube.com/watch?v=example',
  metadata: {
    duration: '8:45',
    views: '12.5K',
    platform: 'YouTube'
  }
}

export const sampleAudioContent: Omit<ContentSource, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
  title: 'The Creator Economy Podcast Ep. 42',
  content_type: 'audio',
  source_content: 'Transcript: Welcome back to The Creator Economy. Today we're talking about something every creator struggles with: distribution. You make amazing content, but getting it in front of people? That's the real challenge...',
  metadata: {
    duration: '32:15',
    episode: 42,
    platform: 'Spotify'
  }
}



