export type OperationType = 'upload' | 'generate' | 'regenerate'

export interface UserCredits {
  id: string
  user_id: string
  total_credits: number
  used_credits: number
  remaining_credits: number
  created_at: string
  updated_at: string
}

export interface CreditUsageHistory {
  id: string
  user_id: string
  operation_type: OperationType
  credits_used: number
  description?: string
  metadata: Record<string, any>
  created_at: string
}

export interface CreateCreditUsageInput {
  operation_type: OperationType
  credits_used: number
  description?: string
  metadata?: Record<string, any>
}

export const CREDIT_COSTS: Record<OperationType, number> = {
  upload: 1,
  generate: 5,
  regenerate: 3
}

export const CREDIT_TIERS = [
  {
    name: 'Free',
    credits: 100,
    price: 0,
    features: [
      '100 credits per month',
      'Basic content generation',
      '5 brand voice profiles',
      'Export to all platforms'
    ]
  },
  {
    name: 'Pro',
    credits: 500,
    price: 29,
    features: [
      '500 credits per month',
      'Advanced AI generation',
      'Unlimited brand voices',
      'Priority generation',
      'Analytics dashboard',
      'API access'
    ]
  },
  {
    name: 'Agency',
    credits: 2000,
    price: 99,
    features: [
      '2000 credits per month',
      'Team collaboration',
      'White-label options',
      'Custom integrations',
      'Dedicated support',
      'Advanced analytics'
    ]
  },
  {
    name: 'Enterprise',
    credits: 10000,
    price: 299,
    features: [
      '10,000+ credits per month',
      'Custom pricing available',
      'Dedicated account manager',
      'Custom AI model training',
      'SLA guarantees',
      'On-premise deployment'
    ]
  }
]



