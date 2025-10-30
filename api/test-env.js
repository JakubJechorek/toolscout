module.exports = async (req, res) => {
  res.status(200).json({
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    keyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 10) || 'UNDEFINED',
    allStripeVars: Object.keys(process.env).filter(k => k.includes('STRIPE')),
    allEnvKeys: Object.keys(process.env)
  });
};
