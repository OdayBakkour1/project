/*
  # Authentication and User Management Functions

  1. Functions
    - `handle_new_user()` - Creates user profile on signup
    - `update_user_profile()` - Updates user profile information
    - `get_user_subscription()` - Gets current user subscription
    - `create_checkout_session()` - Creates payment checkout session
    - `handle_subscription_update()` - Updates subscription status

  2. Triggers
    - Trigger to create user profile on auth.users insert
    - Trigger to update timestamps on profile changes
*/

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, full_name, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NOW(),
    NOW()
  );
  
  -- Create a free subscription for new users
  INSERT INTO subscriptions (id, user_id, plan_id, status, start_date, end_date, created_at, updated_at)
  SELECT 
    gen_random_uuid(),
    NEW.id,
    sp.id,
    'active',
    NOW(),
    NOW() + INTERVAL '30 days', -- 30-day trial
    NOW(),
    NOW()
  FROM subscription_plans sp
  WHERE sp.name = 'Free'
  LIMIT 1;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update user profile
CREATE OR REPLACE FUNCTION update_user_profile(
  user_id UUID,
  full_name TEXT DEFAULT NULL,
  avatar_url TEXT DEFAULT NULL,
  phone TEXT DEFAULT NULL,
  twitter_handle TEXT DEFAULT NULL,
  linkedin_url TEXT DEFAULT NULL,
  github_username TEXT DEFAULT NULL
)
RETURNS user_profiles AS $$
DECLARE
  updated_profile user_profiles;
BEGIN
  UPDATE user_profiles
  SET
    full_name = COALESCE(update_user_profile.full_name, user_profiles.full_name),
    avatar_url = COALESCE(update_user_profile.avatar_url, user_profiles.avatar_url),
    phone = COALESCE(update_user_profile.phone, user_profiles.phone),
    twitter_handle = COALESCE(update_user_profile.twitter_handle, user_profiles.twitter_handle),
    linkedin_url = COALESCE(update_user_profile.linkedin_url, user_profiles.linkedin_url),
    github_username = COALESCE(update_user_profile.github_username, user_profiles.github_username),
    updated_at = NOW()
  WHERE id = user_id
  RETURNING * INTO updated_profile;
  
  RETURN updated_profile;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's current subscription
CREATE OR REPLACE FUNCTION get_user_subscription(user_id UUID)
RETURNS TABLE (
  subscription_id UUID,
  plan_name TEXT,
  plan_description TEXT,
  plan_price DECIMAL,
  billing_interval TEXT,
  features JSONB,
  status TEXT,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  trial_end_date TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    sp.name,
    sp.description,
    sp.price,
    sp.billing_interval,
    sp.features,
    s.status,
    s.start_date,
    s.end_date,
    s.trial_end_date
  FROM subscriptions s
  JOIN subscription_plans sp ON s.plan_id = sp.id
  WHERE s.user_id = get_user_subscription.user_id
    AND s.status IN ('active', 'trial')
  ORDER BY s.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create checkout session
CREATE OR REPLACE FUNCTION create_checkout_session(
  user_id UUID,
  plan_id UUID,
  success_url TEXT,
  cancel_url TEXT
)
RETURNS checkout_sessions AS $$
DECLARE
  new_session checkout_sessions;
  plan_info subscription_plans;
BEGIN
  -- Get plan information
  SELECT * INTO plan_info FROM subscription_plans WHERE id = plan_id AND is_active = true;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid or inactive subscription plan';
  END IF;
  
  -- Create checkout session
  INSERT INTO checkout_sessions (
    id,
    user_id,
    plan_id,
    stripe_session_id,
    status,
    amount,
    currency,
    success_url,
    cancel_url,
    created_at,
    expires_at
  ) VALUES (
    gen_random_uuid(),
    user_id,
    plan_id,
    '', -- Will be updated by Stripe webhook
    'pending',
    plan_info.price,
    'usd',
    success_url,
    cancel_url,
    NOW(),
    NOW() + INTERVAL '24 hours'
  ) RETURNING * INTO new_session;
  
  RETURN new_session;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle subscription updates
CREATE OR REPLACE FUNCTION handle_subscription_update(
  user_id UUID,
  plan_id UUID,
  new_status TEXT,
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ DEFAULT NULL
)
RETURNS subscriptions AS $$
DECLARE
  updated_subscription subscriptions;
BEGIN
  -- Cancel existing active subscriptions
  UPDATE subscriptions 
  SET status = 'cancelled', updated_at = NOW()
  WHERE user_id = handle_subscription_update.user_id 
    AND status IN ('active', 'trial');
  
  -- Create new subscription
  INSERT INTO subscriptions (
    id,
    user_id,
    plan_id,
    status,
    start_date,
    end_date,
    created_at,
    updated_at
  ) VALUES (
    gen_random_uuid(),
    user_id,
    plan_id,
    new_status,
    start_date,
    COALESCE(end_date, start_date + INTERVAL '1 month'),
    NOW(),
    NOW()
  ) RETURNING * INTO updated_subscription;
  
  RETURN updated_subscription;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;