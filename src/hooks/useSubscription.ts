import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import type { Database } from '../lib/database.types'

type SubscriptionPlan = Database['public']['Tables']['subscription_plans']['Row']
type Subscription = Database['public']['Tables']['subscriptions']['Row']
type CheckoutSession = Database['public']['Tables']['checkout_sessions']['Row']

interface UserSubscription {
  subscription_id: string
  plan_name: string
  plan_description: string
  plan_price: number
  billing_interval: string
  features: any
  status: string
  start_date: string
  end_date: string
  trial_end_date: string | null
}

export function useSubscription() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPlans()
    if (user) {
      fetchUserSubscription()
    }
  }, [user])

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true })

      if (error) {
        throw error
      }

      setPlans(data || [])
    } catch (err: any) {
      setError(err.message)
    }
  }

  const fetchUserSubscription = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!user) {
        return
      }

      const { data, error } = await supabase
        .rpc('get_user_subscription', { user_id: user.id })

      if (error) {
        throw error
      }

      setSubscription(data?.[0] || null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createCheckoutSession = async (planId: string) => {
    try {
      setLoading(true)
      setError(null)

      if (!user) {
        throw new Error('No user logged in')
      }

      const successUrl = `${window.location.origin}/subscription/success`
      const cancelUrl = `${window.location.origin}/subscription/cancelled`

      const { data, error } = await supabase
        .rpc('create_checkout_session', {
          user_id: user.id,
          plan_id: planId,
          success_url: successUrl,
          cancel_url: cancelUrl
        })

      if (error) {
        throw error
      }

      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }

  const updateSubscription = async (planId: string, status: string = 'active') => {
    try {
      setLoading(true)
      setError(null)

      if (!user) {
        throw new Error('No user logged in')
      }

      const { data, error } = await supabase
        .rpc('handle_subscription_update', {
          user_id: user.id,
          plan_id: planId,
          new_status: status
        })

      if (error) {
        throw error
      }

      // Refresh user subscription
      await fetchUserSubscription()

      return { data, error: null }
    } catch (err: any) {
      setError(err.message)
      return { data: null, error: err }
    } finally {
      setLoading(false)
    }
  }

  const cancelSubscription = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!user || !subscription) {
        throw new Error('No active subscription found')
      }

      const { error } = await supabase
        .from('subscriptions')
        .update({ 
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', subscription.subscription_id)

      if (error) {
        throw error
      }

      // Refresh user subscription
      await fetchUserSubscription()

      return { error: null }
    } catch (err: any) {
      setError(err.message)
      return { error: err }
    } finally {
      setLoading(false)
    }
  }

  const isFeatureAvailable = (feature: string): boolean => {
    if (!subscription) return false
    
    const features = subscription.features as string[]
    return features.some(f => f.toLowerCase().includes(feature.toLowerCase()))
  }

  const isSubscriptionActive = (): boolean => {
    if (!subscription) return false
    
    const now = new Date()
    const endDate = new Date(subscription.end_date)
    
    return subscription.status === 'active' && endDate > now
  }

  return {
    subscription,
    plans,
    loading,
    error,
    createCheckoutSession,
    updateSubscription,
    cancelSubscription,
    isFeatureAvailable,
    isSubscriptionActive,
    refetch: fetchUserSubscription
  }
}