import React from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Zap, Shield, Crown } from 'lucide-react'
import { Button } from './button'
import { Card, CardContent, CardHeader } from './card'
import { Badge } from './badge'
import { useSubscription } from '../../hooks/useSubscription'
import { cn } from '../../lib/utils'

interface SubscriptionPlansProps {
  onSelectPlan?: (planId: string) => void
  showCurrentPlan?: boolean
}

const planIcons = {
  'Free': Shield,
  'Pro': Zap,
  'Enterprise': Crown
}

const planColors = {
  'Free': 'border-gray-200 bg-white',
  'Pro': 'border-blue-200 bg-blue-50 ring-2 ring-blue-500',
  'Enterprise': 'border-purple-200 bg-purple-50'
}

export function SubscriptionPlans({ onSelectPlan, showCurrentPlan = true }: SubscriptionPlansProps) {
  const { plans, subscription, loading, createCheckoutSession } = useSubscription()

  const handleSelectPlan = async (planId: string) => {
    if (onSelectPlan) {
      onSelectPlan(planId)
      return
    }

    // Default behavior: create checkout session
    const { data, error } = await createCheckoutSession(planId)
    
    if (error) {
      console.error('Error creating checkout session:', error)
      return
    }

    // In a real implementation, you would redirect to Stripe Checkout
    console.log('Checkout session created:', data)
    alert('Checkout functionality would redirect to payment processor here')
  }

  const isCurrentPlan = (planName: string): boolean => {
    return subscription?.plan_name === planName
  }

  const getPlanIcon = (planName: string) => {
    const IconComponent = planIcons[planName as keyof typeof planIcons] || Shield
    return IconComponent
  }

  const getPlanColor = (planName: string) => {
    return planColors[planName as keyof typeof planColors] || planColors.Free
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-4">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan, index) => {
        const Icon = getPlanIcon(plan.name)
        const isPopular = plan.name === 'Pro'
        const isCurrent = isCurrentPlan(plan.name)
        const features = plan.features as string[]

        return (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={cn(
              'relative overflow-hidden transition-all duration-300 hover:shadow-lg',
              getPlanColor(plan.name),
              isCurrent && 'ring-2 ring-green-500'
            )}>
              {isPopular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 text-sm font-medium">
                    <Star className="inline w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {isCurrent && showCurrentPlan && (
                <div className="absolute top-0 right-0">
                  <Badge className="bg-green-500 text-white rounded-none rounded-bl-lg">
                    Current Plan
                  </Badge>
                </div>
              )}

              <CardHeader className={cn('text-center', isPopular && 'pt-12')}>
                <div className="flex justify-center mb-4">
                  <div className={cn(
                    'p-3 rounded-full',
                    plan.name === 'Free' && 'bg-gray-100',
                    plan.name === 'Pro' && 'bg-blue-100',
                    plan.name === 'Enterprise' && 'bg-purple-100'
                  )}>
                    <Icon className={cn(
                      'w-6 h-6',
                      plan.name === 'Free' && 'text-gray-600',
                      plan.name === 'Pro' && 'text-blue-600',
                      plan.name === 'Enterprise' && 'text-purple-600'
                    )} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-600 mt-2">{plan.description}</p>

                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">
                      /{plan.billing_interval === 'yearly' ? 'year' : 'month'}
                    </span>
                  </div>
                  {plan.billing_interval === 'yearly' && (
                    <p className="text-sm text-green-600 mt-1">
                      Save 2 months!
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <Button
                    onClick={() => handleSelectPlan(plan.id)}
                    disabled={isCurrent}
                    className={cn(
                      'w-full',
                      plan.name === 'Pro' && 'bg-blue-600 hover:bg-blue-700',
                      plan.name === 'Enterprise' && 'bg-purple-600 hover:bg-purple-700',
                      isCurrent && 'bg-green-600 hover:bg-green-700'
                    )}
                    variant={plan.name === 'Free' ? 'outline' : 'default'}
                  >
                    {isCurrent ? 'Current Plan' : 
                     plan.name === 'Free' ? 'Get Started' : 
                     'Upgrade Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}