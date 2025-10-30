const Stripe = require('stripe');

export default async function handler(req, res) {
  // Debug logging
  console.log('Environment check:', {
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    keyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7),
    allEnvKeys: Object.keys(process.env)
  });

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  
  // ... rest of code
}
