import { createClient } from '@/utils/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Coins, TrendingUp, Upload, Sparkles, RefreshCw, ArrowUpRight } from 'lucide-react'
import { CREDIT_TIERS, CREDIT_COSTS } from '@/types/credits'
import { formatDistanceToNow } from 'date-fns'

export default async function CreditsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  // Get user credits
  const { data: userCredits } = await supabase
    .from('user_credits')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Get credit usage history
  const { data: usageHistory } = await supabase
    .from('credit_usage_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  const credits = userCredits || { total_credits: 100, used_credits: 0, remaining_credits: 100 }
  const usagePercentage = (credits.used_credits / credits.total_credits) * 100

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Credits</h1>
        <p className="text-muted-foreground mt-2">
          Manage your usage and upgrade your plan
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Credits</CardDescription>
            <CardTitle className="text-4xl">{credits.total_credits}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Monthly allocation
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Used</CardDescription>
            <CardTitle className="text-4xl">{credits.used_credits}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {usagePercentage.toFixed(1)}% of total
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardHeader className="pb-3">
            <CardDescription>Remaining</CardDescription>
            <CardTitle className="text-4xl text-primary">
              {credits.remaining_credits}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Available for use
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage Overview</CardTitle>
          <CardDescription>
            Your credit consumption this month
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Credits Used</span>
              <span className="font-medium">
                {credits.used_credits} / {credits.total_credits}
              </span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
          </div>

          {usagePercentage > 80 && (
            <div className="text-sm bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-md p-3">
              ⚠️ You're running low on credits. Consider upgrading your plan.
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                <Upload className="h-4 w-4" />
                <span className="text-xs">Upload</span>
              </div>
              <div className="text-2xl font-bold">{CREDIT_COSTS.upload}</div>
              <div className="text-xs text-muted-foreground">credits each</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs">Generate</span>
              </div>
              <div className="text-2xl font-bold">{CREDIT_COSTS.generate}</div>
              <div className="text-xs text-muted-foreground">credits each</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
                <RefreshCw className="h-4 w-4" />
                <span className="text-xs">Regenerate</span>
              </div>
              <div className="text-2xl font-bold">{CREDIT_COSTS.regenerate}</div>
              <div className="text-xs text-muted-foreground">credits each</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest credit transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!usageHistory || usageHistory.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No activity yet. Start by uploading content!
            </p>
          ) : (
            <div className="space-y-3">
              {usageHistory.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    {item.operation_type === 'upload' && <Upload className="h-4 w-4 text-muted-foreground" />}
                    {item.operation_type === 'generate' && <Sparkles className="h-4 w-4 text-muted-foreground" />}
                    {item.operation_type === 'regenerate' && <RefreshCw className="h-4 w-4 text-muted-foreground" />}
                    <div>
                      <p className="text-sm font-medium capitalize">{item.operation_type}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    -{item.credits_used} credits
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upgrade Your Plan</CardTitle>
          <CardDescription>
            Get more credits and unlock advanced features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {CREDIT_TIERS.slice(1, 3).map((tier) => (
              <Card key={tier.name} className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{tier.name}</CardTitle>
                      <CardDescription className="mt-2">
                        <span className="text-3xl font-bold text-foreground">
                          ${tier.price}
                        </span>
                        /month
                      </CardDescription>
                    </div>
                    {tier.name === 'Pro' && (
                      <Badge className="bg-primary">Popular</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">{tier.credits}</span>
                    <span className="text-sm text-muted-foreground">credits/month</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={tier.name === 'Pro' ? 'default' : 'outline'}>
                    Upgrade to {tier.name}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



