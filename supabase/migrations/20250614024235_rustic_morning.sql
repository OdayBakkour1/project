/*
  # Insert Default Subscription Plans

  1. Default Plans
    - Free tier with basic features
    - Pro tier with advanced features
    - Enterprise tier with full features

  2. Features
    - Each plan includes different feature sets
    - Stored as JSONB for flexibility
*/

-- Insert default subscription plans
INSERT INTO subscription_plans (id, name, description, price, billing_interval, features, is_active) VALUES
(
  gen_random_uuid(),
  'Free',
  'Basic cybersecurity news and alerts',
  0.00,
  'monthly',
  '["Basic news feed", "Email alerts", "5 bookmarks", "Standard support"]'::jsonb,
  true
),
(
  gen_random_uuid(),
  'Pro',
  'Advanced threat intelligence and AI analysis',
  29.99,
  'monthly',
  '["Unlimited news feed", "Real-time alerts", "AI-powered summaries", "Unlimited bookmarks", "Advanced filtering", "Priority support", "Custom dashboards"]'::jsonb,
  true
),
(
  gen_random_uuid(),
  'Pro Annual',
  'Advanced threat intelligence and AI analysis (Annual)',
  299.99,
  'yearly',
  '["Unlimited news feed", "Real-time alerts", "AI-powered summaries", "Unlimited bookmarks", "Advanced filtering", "Priority support", "Custom dashboards", "2 months free"]'::jsonb,
  true
),
(
  gen_random_uuid(),
  'Enterprise',
  'Complete cybersecurity intelligence platform',
  99.99,
  'monthly',
  '["Everything in Pro", "API access", "Custom integrations", "Team collaboration", "Advanced analytics", "Dedicated support", "Custom reports", "White-label options"]'::jsonb,
  true
),
(
  gen_random_uuid(),
  'Enterprise Annual',
  'Complete cybersecurity intelligence platform (Annual)',
  999.99,
  'yearly',
  '["Everything in Pro", "API access", "Custom integrations", "Team collaboration", "Advanced analytics", "Dedicated support", "Custom reports", "White-label options", "2 months free"]'::jsonb,
  true
);