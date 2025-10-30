const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper to read raw body
const getRawBody = (req) => {
  return new Promise((resolve, reject) => {
    let buffer = [];
    req.on('data', chunk => buffer.push(chunk));
    req.on('end', () => resolve(Buffer.concat(buffer)));
    req.on('error', reject);
  });
};

// Prompt delivery data
const PROMPT_DOWNLOAD_LINKS = {
  'marketing-master-pack': 'https://yourcdn.com/prompts/marketing-master-pack.pdf',
  'content-creator-bundle': 'https://yourcdn.com/prompts/content-creator-bundle.pdf',
  'startup-founder-toolkit': 'https://yourcdn.com/prompts/startup-founder-toolkit.pdf',
  'coding-assistant-pro': 'https://yourcdn.com/prompts/coding-assistant-pro.pdf',
  'sales-closer-collection': 'https://yourcdn.com/prompts/sales-closer-collection.pdf',
  'productivity-powerhouse': 'https://yourcdn.com/prompts/productivity-powerhouse.pdf',
  'design-thinking-kit': 'https://yourcdn.com/prompts/design-thinking-kit.pdf',
  'ultimate-mega-bundle': 'https://yourcdn.com/prompts/ultimate-mega-bundle.zip',
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const rawBody = await getRawBody(req);
    const sig = req.headers['stripe-signature'];

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle successful payment
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Get customer email
      const customerEmail = session.customer_details.email;
      
      // Get purchased prompt IDs from metadata
      const promptIds = session.metadata.items ? JSON.parse(session.metadata.items) : [];
      
      // Generate download links
      const downloadLinks = promptIds.map(id => ({
        name: id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        url: PROMPT_DOWNLOAD_LINKS[id] || '#'
      }));

      // Send email with Resend
      await resend.emails.send({
        from: 'ToolScout <prompts@toolscout.co>',
        to: customerEmail,
        subject: '🎉 Your AI Prompts Are Ready!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; }
              .download-box { background: white; border: 2px solid #667eea; border-radius: 10px; padding: 20px; margin: 20px 0; }
              .download-link { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px 0; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Thank You for Your Purchase!</h1>
                <p>Your AI prompts are ready to download</p>
              </div>
              <div class="content">
                <p>Hi there!</p>
                <p>Thanks for purchasing from ToolScout! Your premium AI prompt pack(s) are ready for instant download.</p>
                
                <div class="download-box">
                  <h3>📥 Your Downloads:</h3>
                  ${downloadLinks.map(link => `
                    <div style="margin: 15px 0;">
                      <strong>${link.name}</strong><br>
                      <a href="${link.url}" class="download-link">Download Now →</a>
                    </div>
                  `).join('')}
                </div>

                <p><strong>💡 Pro Tips:</strong></p>
                <ul>
                  <li>Save these links - they don't expire</li>
                  <li>Download both PDF and Notion versions</li>
                  <li>Join our community for updates</li>
                </ul>

                <p>Questions? Just reply to this email!</p>
                <p>Happy prompting! 🚀</p>
              </div>
              <div class="footer">
                <p>© 2025 ToolScout • toolscout.co</p>
                <p>This email was sent because you purchased prompts from ToolScout.</p>
              </div>
            </div>
          </body>
          </html>
        `
      });

      console.log(`✅ Delivered prompts to ${customerEmail}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: error.message });
  }
};
