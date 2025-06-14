export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          twitter_handle: string | null
          linkedin_url: string | null
          github_username: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          twitter_handle?: string | null
          linkedin_url?: string | null
          github_username?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          twitter_handle?: string | null
          linkedin_url?: string | null
          github_username?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscription_plans: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          billing_interval: string
          features: any
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          billing_interval: string
          features: any
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          billing_interval?: string
          features?: any
          is_active?: boolean
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          status: string
          start_date: string
          end_date: string
          trial_end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          status: string
          start_date: string
          end_date: string
          trial_end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          status?: string
          start_date?: string
          end_date?: string
          trial_end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payment_methods: {
        Row: {
          id: string
          user_id: string
          stripe_payment_method_id: string
          type: string
          card_brand: string | null
          card_last4: string | null
          card_exp_month: number | null
          card_exp_year: number | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_payment_method_id: string
          type: string
          card_brand?: string | null
          card_last4?: string | null
          card_exp_month?: number | null
          card_exp_year?: number | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_payment_method_id?: string
          type?: string
          card_brand?: string | null
          card_last4?: string | null
          card_exp_month?: number | null
          card_exp_year?: number | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      checkout_sessions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          stripe_session_id: string
          status: string
          amount: number
          currency: string
          success_url: string
          cancel_url: string
          created_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          stripe_session_id: string
          status: string
          amount: number
          currency: string
          success_url: string
          cancel_url: string
          created_at?: string
          expires_at: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          stripe_session_id?: string
          status?: string
          amount?: number
          currency?: string
          success_url?: string
          cancel_url?: string
          created_at?: string
          expires_at?: string
        }
      }
    }
    Functions: {
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_user_profile: {
        Args: {
          user_id: string
          full_name?: string
          avatar_url?: string
          phone?: string
          twitter_handle?: string
          linkedin_url?: string
          github_username?: string
        }
        Returns: Database['public']['Tables']['user_profiles']['Row']
      }
      get_user_subscription: {
        Args: {
          user_id: string
        }
        Returns: {
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
        }[]
      }
      create_checkout_session: {
        Args: {
          user_id: string
          plan_id: string
          success_url: string
          cancel_url: string
        }
        Returns: Database['public']['Tables']['checkout_sessions']['Row']
      }
      handle_subscription_update: {
        Args: {
          user_id: string
          plan_id: string
          new_status: string
          start_date?: string
          end_date?: string
        }
        Returns: Database['public']['Tables']['subscriptions']['Row']
      }
    }
  }
}