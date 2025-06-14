/*
  # Complete User Management and Subscription System

  1. New Tables
    - `user_profiles` - Extended user profile information
      - `id` (uuid, references auth.users)
      - `full_name` (text)
      - `avatar_url` (text, profile picture)
      - `phone` (text)
      - `twitter_handle` (text)
      - `linkedin_url` (text)
      - `github_username` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `subscription_plans` - Available subscription plans
      - `id` (uuid, primary key)
      - `name` (text) - e.g., "Basic", "Pro", "Enterprise"
      - `description` (text)
      - `price` (decimal)
      - `billing_interval` (text) - "monthly", "yearly"
      - `features` (jsonb) - list of features
      - `is_active` (boolean)
      - `created_at` (timestamp)

    - `subscriptions` - User subscriptions
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `plan_id` (uuid, references subscription_plans)
      - `status` (text) - "active", "cancelled", "expired", "trial"
      - `start_date` (timestamp)
      - `end_date` (timestamp)
      - `trial_end_date` (timestamp, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `payment_methods` - User payment methods
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `stripe_payment_method_id` (text)
      - `type` (text) - "card", "bank_account"
      - `card_brand` (text, nullable) - "visa", "mastercard", etc.
      - `card_last4` (text, nullable)
      - `card_exp_month` (integer, nullable)
      - `card_exp_year` (integer, nullable)
      - `is_default` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `checkout_sessions` - Payment checkout sessions
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `plan_id` (uuid, references subscription_plans)
      - `stripe_session_id` (text)
      - `status` (text) - "pending", "completed", "expired", "cancelled"
      - `amount` (decimal)
      - `currency` (text)
      - `success_url` (text)
      - `cancel_url` (text)
      - `created_at` (timestamp)
      - `expires_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for subscription and payment management

  3. Functions
    - Function to create user profile on signup
    - Function to handle subscription updates
    - Function to manage payment method defaults