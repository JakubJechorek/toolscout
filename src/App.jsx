import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, DollarSign, Star, Mail, Twitter, Compass } from 'lucide-react';

// Tool database - 50 curated tools
const sampleTools = [
  // Productivity
  {
    id: 1,
    name: "Notion",
    tagline: "All-in-one workspace for notes, docs, and projects",
    category: "Productivity",
    pricing: "Free / €10/mo",
    priceValue: 0,
    website: "https://notion.so",
    affiliateLink: "https://notion.so",
    description: "Notion combines notes, tasks, wikis, and databases in one flexible workspace. Great for organizing everything from personal tasks to team projects.",
    logo: "🗒️",
    featured: true,
    iUseThis: true
  },
  {
    id: 2,
    name: "Obsidian",
    tagline: "Powerful knowledge base on local markdown files",
    category: "Productivity",
    pricing: "Free / €8/mo",
    priceValue: 0,
    website: "https://obsidian.md",
    affiliateLink: "https://obsidian.md",
    description: "A private and flexible writing app that adapts to the way you think. Works with local markdown files so your data stays yours.",
    logo: "💎",
    featured: false,
    iUseThis: true
  },
  {
    id: 3,
    name: "Todoist",
    tagline: "Simple yet powerful task management",
    category: "Productivity",
    pricing: "Free / €5/mo",
    priceValue: 0,
    website: "https://todoist.com",
    affiliateLink: "https://todoist.com",
    description: "Clean task manager that works across all your devices. Perfect for keeping track of personal and work tasks without complexity.",
    logo: "✓",
    featured: false,
    iUseThis: false
  },
  {
    id: 4,
    name: "ClickUp",
    tagline: "All your work in one place",
    category: "Productivity",
    pricing: "Free / €7/mo",
    priceValue: 0,
    website: "https://clickup.com",
    affiliateLink: "https://clickup.com",
    description: "Project management platform with docs, tasks, goals, and chat. Ambitious scope but the free tier is incredibly generous.",
    logo: "📋",
    featured: false,
    iUseThis: false
  },
  {
    id: 5,
    name: "Superhuman",
    tagline: "The fastest email experience ever made",
    category: "Productivity",
    pricing: "€30/mo",
    priceValue: 30,
    website: "https://superhuman.com",
    affiliateLink: "https://superhuman.com",
    description: "Blazingly fast email client with keyboard shortcuts. Premium pricing but saves hours per week for heavy email users.",
    logo: "⚡",
    featured: false,
    iUseThis: false
  },

  // Developer Tools
  {
    id: 6,
    name: "Vercel",
    tagline: "Deploy web apps instantly",
    category: "Developer Tools",
    pricing: "Free / €20/mo",
    priceValue: 0,
    website: "https://vercel.com",
    affiliateLink: "https://vercel.com",
    description: "Deploy Next.js, React, and static sites with zero configuration. The free tier handles most projects without breaking a sweat.",
    logo: "▲",
    featured: true,
    iUseThis: true
  },
  {
    id: 7,
    name: "Railway",
    tagline: "Infrastructure, simplified",
    category: "Developer Tools",
    pricing: "€5/mo usage",
    priceValue: 5,
    website: "https://railway.app",
    affiliateLink: "https://railway.app",
    description: "Deploy databases, backends, and cron jobs without DevOps headaches. Pay only for what you use with transparent pricing.",
    logo: "🚂",
    featured: false,
    iUseThis: true
  },
  {
    id: 8,
    name: "Linear",
    tagline: "Issue tracking for modern software teams",
    category: "Developer Tools",
    pricing: "Free / €8/mo",
    priceValue: 0,
    website: "https://linear.app",
    affiliateLink: "https://linear.app",
    description: "Beautiful project management tool built for software teams. Lightning-fast interface with GitHub integration and automation.",
    logo: "📐",
    featured: true,
    iUseThis: true
  },
  {
    id: 9,
    name: "Supabase",
    tagline: "Open source Firebase alternative",
    category: "Developer Tools",
    pricing: "Free / €25/mo",
    priceValue: 0,
    website: "https://supabase.com",
    affiliateLink: "https://supabase.com",
    description: "PostgreSQL database, authentication, and storage in one package. Free tier is perfect for side projects and MVPs.",
    logo: "⚡",
    featured: false,
    iUseThis: false
  },
  {
    id: 10,
    name: "PlanetScale",
    tagline: "MySQL platform for developers",
    category: "Developer Tools",
    pricing: "Free / €29/mo",
    priceValue: 0,
    website: "https://planetscale.com",
    affiliateLink: "https://planetscale.com",
    description: "Serverless MySQL database with branching and automatic backups. No more worrying about scaling or connection limits.",
    logo: "🌍",
    featured: false,
    iUseThis: false
  },
  {
    id: 11,
    name: "Raycast",
    tagline: "Supercharge your productivity on Mac",
    category: "Developer Tools",
    pricing: "Free / €8/mo",
    priceValue: 0,
    website: "https://raycast.com",
    affiliateLink: "https://raycast.com",
    description: "Spotlight replacement with extensions, clipboard history, and AI. Essential tool for Mac power users and developers.",
    logo: "🔮",
    featured: false,
    iUseThis: true
  },

  // Marketing & Email
  {
    id: 12,
    name: "ConvertKit",
    tagline: "Email marketing for creators",
    category: "Marketing",
    pricing: "Free / €25/mo",
    priceValue: 0,
    website: "https://convertkit.com",
    affiliateLink: "https://convertkit.com",
    description: "Email marketing focused on creators and bloggers. Simple automation, landing pages, and subscriber tagging included.",
    logo: "📧",
    featured: true,
    iUseThis: false
  },
  {
    id: 13,
    name: "Beehiiv",
    tagline: "Newsletter platform built for growth",
    category: "Marketing",
    pricing: "Free / €49/mo",
    priceValue: 0,
    website: "https://beehiiv.com",
    affiliateLink: "https://beehiiv.com",
    description: "Modern newsletter platform with referral programs, monetization, and analytics. Growing fast with creator-friendly features.",
    logo: "🐝",
    featured: false,
    iUseThis: false
  },
  {
    id: 14,
    name: "Buffer",
    tagline: "Social media scheduling made simple",
    category: "Marketing",
    pricing: "Free / €6/mo",
    priceValue: 0,
    website: "https://buffer.com",
    affiliateLink: "https://buffer.com",
    description: "Schedule posts across Twitter, LinkedIn, Instagram, and Facebook. Clean interface without overwhelming features.",
    logo: "📱",
    featured: false,
    iUseThis: false
  },
  {
    id: 15,
    name: "Mailchimp",
    tagline: "Email marketing and automation",
    category: "Marketing",
    pricing: "Free / €13/mo",
    priceValue: 0,
    website: "https://mailchimp.com",
    affiliateLink: "https://mailchimp.com",
    description: "Classic email marketing platform with templates, automation, and analytics. Free tier includes up to 500 contacts.",
    logo: "📬",
    featured: false,
    iUseThis: false
  },

  // Design
  {
    id: 16,
    name: "Figma",
    tagline: "Collaborative design tool",
    category: "Design",
    pricing: "Free / €12/mo",
    priceValue: 0,
    website: "https://figma.com",
    affiliateLink: "https://figma.com",
    description: "Browser-based design tool with real-time collaboration. Industry standard for UI/UX design with generous free tier.",
    logo: "🎨",
    featured: true,
    iUseThis: true
  },
  {
    id: 17,
    name: "Canva Pro",
    tagline: "Design graphics like a pro",
    category: "Design",
    pricing: "Free / €11/mo",
    priceValue: 0,
    website: "https://canva.com",
    affiliateLink: "https://canva.com",
    description: "Drag-and-drop design tool with templates for social media, presentations, and marketing materials. Perfect for non-designers.",
    logo: "🎭",
    featured: false,
    iUseThis: false
  },
  {
    id: 18,
    name: "Framer",
    tagline: "Design and publish stunning sites",
    category: "Design",
    pricing: "Free / €5/mo",
    priceValue: 0,
    website: "https://framer.com",
    affiliateLink: "https://framer.com",
    description: "No-code website builder for designers. Create responsive sites with interactions and animations without touching code.",
    logo: "🖼️",
    featured: false,
    iUseThis: false
  },
  {
    id: 19,
    name: "Remove.bg",
    tagline: "Remove image backgrounds instantly",
    category: "Design",
    pricing: "Free / €9/mo",
    priceValue: 0,
    website: "https://remove.bg",
    affiliateLink: "https://remove.bg",
    description: "AI-powered background removal in seconds. Essential tool for product photos, portraits, and marketing graphics.",
    logo: "🖌️",
    featured: false,
    iUseThis: false
  },

  // Analytics
  {
    id: 20,
    name: "Fathom Analytics",
    tagline: "Simple, privacy-first analytics",
    category: "Analytics",
    pricing: "€14/mo",
    priceValue: 14,
    website: "https://usefathom.com",
    affiliateLink: "https://usefathom.com",
    description: "Google Analytics alternative without cookies or GDPR headaches. Clean dashboard with essential metrics only.",
    logo: "📊",
    featured: true,
    iUseThis: true
  },
  {
    id: 21,
    name: "Plausible",
    tagline: "Lightweight and privacy-friendly analytics",
    category: "Analytics",
    pricing: "€9/mo",
    priceValue: 9,
    website: "https://plausible.io",
    affiliateLink: "https://plausible.io",
    description: "Open-source analytics with a script 45x smaller than Google Analytics. GDPR compliant and easy to understand.",
    logo: "📈",
    featured: false,
    iUseThis: false
  },
  {
    id: 22,
    name: "Mixpanel",
    tagline: "Product analytics for mobile and web",
    category: "Analytics",
    pricing: "Free / €20/mo",
    priceValue: 0,
    website: "https://mixpanel.com",
    affiliateLink: "https://mixpanel.com",
    description: "Track user behavior and conversion funnels. Powerful for understanding how people use your product.",
    logo: "📉",
    featured: false,
    iUseThis: false
  },

  // Finance
  {
    id: 23,
    name: "Lemon Squeezy",
    tagline: "Payments for digital products",
    category: "Finance",
    pricing: "5% + fees",
    priceValue: 0,
    website: "https://lemonsqueezy.com",
    affiliateLink: "https://lemonsqueezy.com",
    description: "Merchant of record for digital products. They handle taxes, VAT, and compliance so you can focus on building.",
    logo: "🍋",
    featured: false,
    iUseThis: false
  },
  {
    id: 24,
    name: "Wave",
    tagline: "Free accounting for small businesses",
    category: "Finance",
    pricing: "Free",
    priceValue: 0,
    website: "https://waveapps.com",
    affiliateLink: "https://waveapps.com",
    description: "Completely free accounting software with invoicing, receipts, and reporting. Perfect for freelancers and solo founders.",
    logo: "💰",
    featured: false,
    iUseThis: false
  },
  {
    id: 25,
    name: "FreshBooks",
    tagline: "Accounting software for self-employed",
    category: "Finance",
    pricing: "€15/mo",
    priceValue: 15,
    website: "https://freshbooks.com",
    affiliateLink: "https://freshbooks.com",
    description: "Invoicing and expense tracking designed for freelancers. Time tracking and project management included.",
    logo: "📒",
    featured: false,
    iUseThis: false
  },
  {
    id: 26,
    name: "Stripe",
    tagline: "Payment infrastructure for the internet",
    category: "Finance",
    pricing: "2.9% + fees",
    priceValue: 0,
    website: "https://stripe.com",
    affiliateLink: "https://stripe.com",
    description: "Accept payments online with flexible APIs. Industry standard for subscription billing and one-time payments.",
    logo: "💳",
    featured: true,
    iUseThis: true
  },

  // AI Tools
  {
    id: 27,
    name: "ChatGPT Plus",
    tagline: "AI assistant that understands context",
    category: "AI Tools",
    pricing: "€20/mo",
    priceValue: 20,
    website: "https://chat.openai.com",
    affiliateLink: "https://chat.openai.com",
    description: "Access to GPT-4 with priority access during peak times. Essential tool for writing, coding, and brainstorming.",
    logo: "🤖",
    featured: true,
    iUseThis: false
  },
  {
    id: 28,
    name: "Claude Pro",
    tagline: "AI assistant for work",
    category: "AI Tools",
    pricing: "€20/mo",
    priceValue: 20,
    website: "https://claude.ai",
    affiliateLink: "https://claude.ai",
    description: "Anthropic's AI assistant with larger context windows. Great for analyzing documents and long-form writing.",
    logo: "🧠",
    featured: false,
    iUseThis: true
  },
  {
    id: 29,
    name: "Midjourney",
    tagline: "AI art generation",
    category: "AI Tools",
    pricing: "€10/mo",
    priceValue: 10,
    website: "https://midjourney.com",
    affiliateLink: "https://midjourney.com",
    description: "Create stunning AI-generated images from text descriptions. Popular among designers and content creators.",
    logo: "🎨",
    featured: false,
    iUseThis: false
  },
  {
    id: 30,
    name: "Descript",
    tagline: "AI-powered video editing",
    category: "AI Tools",
    pricing: "Free / €12/mo",
    priceValue: 0,
    website: "https://descript.com",
    affiliateLink: "https://descript.com",
    description: "Edit videos by editing text transcripts. AI removes filler words, creates clips, and handles audio cleanup.",
    logo: "🎬",
    featured: false,
    iUseThis: false
  },

  // Communication
  {
    id: 31,
    name: "Slack",
    tagline: "Where work happens",
    category: "Communication",
    pricing: "Free / €7/mo",
    priceValue: 0,
    website: "https://slack.com",
    affiliateLink: "https://slack.com",
    description: "Team messaging with channels, integrations, and search. The free plan works great for small teams up to 10,000 messages.",
    logo: "💬",
    featured: false,
    iUseThis: true
  },
  {
    id: 32,
    name: "Discord",
    tagline: "Chat and hang out with your communities",
    category: "Communication",
    pricing: "Free / €10/mo",
    priceValue: 0,
    website: "https://discord.com",
    affiliateLink: "https://discord.com",
    description: "Voice, video, and text chat built for communities. Free forever with unlimited users and great voice quality.",
    logo: "🎮",
    featured: false,
    iUseThis: false
  },
  {
    id: 33,
    name: "Loom",
    tagline: "Async video messaging for work",
    category: "Communication",
    pricing: "Free / €8/mo",
    priceValue: 0,
    website: "https://loom.com",
    affiliateLink: "https://loom.com",
    description: "Record quick video messages to replace meetings. Screen + camera recording with instant sharing links.",
    logo: "📹",
    featured: false,
    iUseThis: true
  },
  {
    id: 34,
    name: "Calendly",
    tagline: "Scheduling automation for everyone",
    category: "Communication",
    pricing: "Free / €8/mo",
    priceValue: 0,
    website: "https://calendly.com",
    affiliateLink: "https://calendly.com",
    description: "Let people book time with you without the email back-and-forth. Syncs with your calendar automatically.",
    logo: "📅",
    featured: false,
    iUseThis: false
  },

  // SEO & Content
  {
    id: 35,
    name: "Ahrefs",
    tagline: "SEO tools for growing search traffic",
    category: "SEO & Content",
    pricing: "€99/mo",
    priceValue: 99,
    website: "https://ahrefs.com",
    affiliateLink: "https://ahrefs.com",
    description: "Premium SEO toolkit for keyword research, backlink analysis, and competitor research. Industry standard for serious SEO work.",
    logo: "🔍",
    featured: false,
    iUseThis: false
  },
  {
    id: 36,
    name: "Grammarly",
    tagline: "Write with confidence",
    category: "SEO & Content",
    pricing: "Free / €12/mo",
    priceValue: 0,
    website: "https://grammarly.com",
    affiliateLink: "https://grammarly.com",
    description: "AI writing assistant that checks grammar, tone, and clarity. Works everywhere you write across browsers and apps.",
    logo: "✏️",
    featured: true,
    iUseThis: true
  },
  {
    id: 37,
    name: "Hemingway Editor",
    tagline: "Make your writing bold and clear",
    category: "SEO & Content",
    pricing: "€20 one-time",
    priceValue: 20,
    website: "https://hemingwayapp.com",
    affiliateLink: "https://hemingwayapp.com",
    description: "Highlights complex sentences and suggests simpler alternatives. Essential for clear, readable content.",
    logo: "📝",
    featured: false,
    iUseThis: false
  },
  {
    id: 38,
    name: "Ubersuggest",
    tagline: "SEO and keyword tracking",
    category: "SEO & Content",
    pricing: "€12/mo",
    priceValue: 12,
    website: "https://neilpatel.com/ubersuggest",
    affiliateLink: "https://neilpatel.com/ubersuggest",
    description: "Affordable alternative to Ahrefs. Good keyword research and site audit tools for smaller budgets.",
    logo: "🎯",
    featured: false,
    iUseThis: false
  },

  // Customer Support
  {
    id: 39,
    name: "Crisp",
    tagline: "Customer messaging platform",
    category: "Customer Support",
    pricing: "Free / €25/mo",
    priceValue: 0,
    website: "https://crisp.chat",
    affiliateLink: "https://crisp.chat",
    description: "Live chat widget with email, knowledge base, and chatbot. Beautiful interface and generous free tier.",
    logo: "💬",
    featured: false,
    iUseThis: false
  },
  {
    id: 40,
    name: "Intercom",
    tagline: "Customer communication platform",
    category: "Customer Support",
    pricing: "€74/mo",
    priceValue: 74,
    website: "https://intercom.com",
    affiliateLink: "https://intercom.com",
    description: "Premium customer messaging with chat, help center, and product tours. Powerful but pricey.",
    logo: "📞",
    featured: false,
    iUseThis: false
  },
  {
    id: 41,
    name: "Tawk.to",
    tagline: "100% free live chat software",
    category: "Customer Support",
    pricing: "Free",
    priceValue: 0,
    website: "https://tawk.to",
    affiliateLink: "https://tawk.to",
    description: "Completely free live chat with unlimited agents and chat history. No catch, genuinely free forever.",
    logo: "💭",
    featured: false,
    iUseThis: false
  },

  // Security & Privacy
  {
    id: 42,
    name: "1Password",
    tagline: "Password manager for families and teams",
    category: "Security",
    pricing: "€3/mo",
    priceValue: 3,
    website: "https://1password.com",
    affiliateLink: "https://1password.com",
    description: "Secure password manager with excellent UX. Family plan covers 5 people with shared vaults.",
    logo: "🔐",
    featured: false,
    iUseThis: true
  },
  {
    id: 43,
    name: "Bitwarden",
    tagline: "Open source password manager",
    category: "Security",
    pricing: "Free / €10/year",
    priceValue: 0,
    website: "https://bitwarden.com",
    affiliateLink: "https://bitwarden.com",
    description: "Free and open source password manager. Premium features cost just €10/year with unlimited devices.",
    logo: "🛡️",
    featured: false,
    iUseThis: false
  },
  {
    id: 44,
    name: "NordVPN",
    tagline: "Secure and private internet access",
    category: "Security",
    pricing: "€3/mo",
    priceValue: 3,
    website: "https://nordvpn.com",
    affiliateLink: "https://nordvpn.com",
    description: "Fast VPN with thousands of servers worldwide. Good for privacy and accessing geo-restricted content.",
    logo: "🌐",
    featured: false,
    iUseThis: false
  },

  // E-commerce
  {
    id: 45,
    name: "Gumroad",
    tagline: "Sell products directly to your audience",
    category: "E-commerce",
    pricing: "10% fee",
    priceValue: 0,
    website: "https://gumroad.com",
    affiliateLink: "https://gumroad.com",
    description: "Simple platform for selling digital products, memberships, and courses. No monthly fees, just 10% per sale.",
    logo: "🛒",
    featured: true,
    iUseThis: false
  },
  {
    id: 46,
    name: "Shopify",
    tagline: "E-commerce platform for online stores",
    category: "E-commerce",
    pricing: "€27/mo",
    priceValue: 27,
    website: "https://shopify.com",
    affiliateLink: "https://shopify.com",
    description: "Complete e-commerce solution for physical and digital products. Huge app ecosystem and payment processing included.",
    logo: "🛍️",
    featured: false,
    iUseThis: false
  },
  {
    id: 47,
    name: "Paddle",
    tagline: "Payment infrastructure for SaaS",
    category: "E-commerce",
    pricing: "5% + fees",
    priceValue: 0,
    website: "https://paddle.com",
    affiliateLink: "https://paddle.com",
    description: "Merchant of record that handles taxes, compliance, and subscriptions. Great alternative to Stripe for global sales.",
    logo: "💳",
    featured: false,
    iUseThis: false
  },

  // Automation
  {
    id: 48,
    name: "Zapier",
    tagline: "Connect your apps and automate workflows",
    category: "Automation",
    pricing: "Free / €20/mo",
    priceValue: 0,
    website: "https://zapier.com",
    affiliateLink: "https://zapier.com",
    description: "Automate tasks between 5,000+ apps without code. Free tier includes 100 tasks per month.",
    logo: "⚡",
    featured: true,
    iUseThis: true
  },
  {
    id: 49,
    name: "Make (Integromat)",
    tagline: "Visual platform for automation",
    category: "Automation",
    pricing: "Free / €9/mo",
    priceValue: 0,
    website: "https://make.com",
    affiliateLink: "https://make.com",
    description: "More powerful than Zapier with visual workflow builder. Better for complex automations at lower cost.",
    logo: "🔧",
    featured: false,
    iUseThis: false
  },
  {
    id: 50,
    name: "n8n",
    tagline: "Workflow automation for technical teams",
    category: "Automation",
    pricing: "Free / €20/mo",
    priceValue: 0,
    website: "https://n8n.io",
    affiliateLink: "https://n8n.io",
    description: "Open source automation tool you can self-host. More technical than Zapier but incredibly powerful and flexible.",
    logo: "🤖",
    featured: false,
    iUseThis: false
  },
];

const categories = ["All", "Productivity", "Developer Tools", "Marketing", "Design", "Analytics", "Finance", "AI Tools", "Communication", "SEO & Content", "Customer Support", "Security", "E-commerce", "Automation"];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  // Filter and sort tools
  const filteredTools = useMemo(() => {
    let filtered = sampleTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'featured') {
      filtered.sort((a, b) => b.featured - a.featured);
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Compass size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Scout the Best SaaS Tools</h1>
          <p className="text-xl mb-8 opacity-90">
            Discover handpicked SaaS tools for founders, freelancers, and small teams. 
            No enterprise bloat. Just quality tools that help you build and grow.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={() => setCurrentPage('directory')}
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Browse {sampleTools.length}+ Tools
            </button>
            <button 
              onClick={() => setCurrentPage('submit')}
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition"
            >
              Submit Your Tool
            </button>
          </div>
          
          <div className="mt-8 text-sm opacity-75">
            Transparent affiliate disclosure: Some links may earn commissions at no extra cost to you
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">{sampleTools.length}</div>
            <div className="text-gray-600">Curated Tools</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">{categories.length - 1}</div>
            <div className="text-gray-600">Categories</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-600 mb-2">Updated Weekly</div>
            <div className="text-gray-600">Fresh Additions</div>
          </div>
        </div>
      </div>

      {/* Featured Tools */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Star className="text-yellow-500" size={28} />
            <h2 className="text-3xl font-bold">Featured Tools</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sampleTools.filter(t => t.featured).map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {categories.filter(c => c !== 'All').slice(0, 8).map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage('directory');
                }}
                className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:border-indigo-500 hover:shadow-md transition text-left"
              >
                <div className="text-2xl mb-2">
                  {cat === 'Productivity' && '📝'}
                  {cat === 'Developer Tools' && '💻'}
                  {cat === 'Marketing' && '📧'}
                  {cat === 'Design' && '🎨'}
                  {cat === 'Analytics' && '📊'}
                  {cat === 'Finance' && '💰'}
                  {cat === 'AI Tools' && '🤖'}
                  {cat === 'Communication' && '💬'}
                </div>
                <div className="font-semibold text-lg">{cat}</div>
                <div className="text-gray-600 text-sm mt-1">
                  {sampleTools.filter(t => t.category === cat).length} tools
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="bg-indigo-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Use ToolScout?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <Compass size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Carefully Scouted</h3>
              <p className="text-gray-600">Every tool is reviewed and tested. Only quality products make the list.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                💰
              </div>
              <h3 className="font-semibold text-lg mb-2">Honest Reviews</h3>
              <p className="text-gray-600">Transparent opinions with pros and cons. No marketing fluff or fake hype.</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🎯
              </div>
              <h3 className="font-semibold text-lg mb-2">Small Business Focus</h3>
              <p className="text-gray-600">Tools designed for solo founders and small teams, not enterprise clients.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DirectoryPage = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Tools</h1>
      
      {/* Search & Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="featured">Featured First</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-4 text-gray-600">
        Showing {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-xl mb-2">No tools found</p>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );

  const SubmitPage = () => (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Submit Your Tool</h1>
      <p className="text-gray-600 mb-8">
        Have a SaaS tool you'd like to see listed? Submit it here for review. All submissions are manually reviewed by Jakub.
      </p>

      <div className="space-y-6 bg-white p-8 rounded-lg shadow border">
        <div>
          <label className="block font-semibold mb-2">Tool Name *</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. Notion" />
        </div>

        <div>
          <label className="block font-semibold mb-2">Tagline *</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="One sentence description" />
        </div>

        <div>
          <label className="block font-semibold mb-2">Category *</label>
          <select className="w-full px-4 py-2 border rounded-lg">
            <option value="">Select category</option>
            {categories.filter(c => c !== 'All').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Pricing *</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="e.g. Free / €10/mo" />
        </div>

        <div>
          <label className="block font-semibold mb-2">Website URL *</label>
          <input type="url" className="w-full px-4 py-2 border rounded-lg" placeholder="https://..." />
        </div>

        <div>
          <label className="block font-semibold mb-2">Description *</label>
          <textarea 
            className="w-full px-4 py-2 border rounded-lg" 
            rows="4"
            placeholder="What makes your tool special?"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Your Email</label>
          <input type="email" className="w-full px-4 py-2 border rounded-lg" placeholder="your@email.com" />
        </div>

        <button 
          type="button"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          onClick={() => alert('Demo form - In production, this would submit to your database')}
        >
          Submit Tool for Review
        </button>

        <p className="text-sm text-gray-500 text-center">
          This is a demo form. Connect to Airtable or your database for real submissions.
        </p>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About ToolScout</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-6">
          Hi, I'm Jakub. I created ToolScout to help founders and small teams discover quality SaaS tools 
          without wading through endless Product Hunt posts and marketing websites.
        </p>

        <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 mb-8">
          <h3 className="text-lg font-semibold mb-2">The Mission</h3>
          <p className="text-gray-700">
            Build a trusted resource for discovering SaaS tools that are actually useful for small businesses, 
            without enterprise pricing or unnecessary complexity.
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">What Gets Listed</h2>
        <p className="mb-4 text-gray-700">
          Every tool on ToolScout meets specific criteria:
        </p>

        <ul className="mb-6 space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Solves a real problem for solo founders, freelancers, or small teams</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Has transparent pricing (no "contact sales" required)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Offers genuine value at its price point</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">✓</span>
            <span>Is actively maintained and supported</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Tools I Personally Use</h2>
        <p className="mb-4 text-gray-700">
          Look for the <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
            ✓ I use this
          </span> badge. These are tools I actually pay for and use in my own projects.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Affiliate Disclosure</h2>
        <p className="mb-4 text-gray-700">
          This site contains affiliate links. When you purchase through these links, I may earn a commission 
          at no additional cost to you. This helps cover hosting costs and keeps the directory free to use.
        </p>
        <p className="mb-6 text-gray-700">
          I only list tools I genuinely recommend. Affiliate relationships never influence what gets featured 
          or how tools are reviewed.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Get in Touch</h2>
        <p className="mb-4 text-gray-700">
          Have suggestions? Found an issue? Want to submit a tool?
        </p>
        <div className="flex gap-4 flex-wrap">
          <a href="mailto:hello@toolscout.co" className="inline-flex items-center gap-2 text-indigo-600 hover:underline">
            <Mail size={20} />
            hello@toolscout.co
          </a>
          <a href="https://twitter.com/toolscout" className="inline-flex items-center gap-2 text-indigo-600 hover:underline">
            <Twitter size={20} />
            @toolscout
          </a>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 mt-8">
          <p className="text-sm text-gray-600 italic">
            "The best tools are the ones that get out of your way and let you focus on building." - Jakub
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
            onClick={() => setCurrentPage('home')}
          >
            <Compass size={32} className="text-indigo-600" />
            <span className="text-2xl font-bold text-indigo-600">ToolScout</span>
          </div>
          <div className="flex gap-6">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`hover:text-indigo-600 transition font-medium ${currentPage === 'home' ? 'text-indigo-600' : 'text-gray-700'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('directory')}
              className={`hover:text-indigo-600 transition font-medium ${currentPage === 'directory' ? 'text-indigo-600' : 'text-gray-700'}`}
            >
              Directory
            </button>
            <button 
              onClick={() => setCurrentPage('submit')}
              className={`hover:text-indigo-600 transition font-medium ${currentPage === 'submit' ? 'text-indigo-600' : 'text-gray-700'}`}
            >
              Submit
            </button>
            <button 
              onClick={() => setCurrentPage('about')}
              className={`hover:text-indigo-600 transition font-medium ${currentPage === 'about' ? 'text-indigo-600' : 'text-gray-700'}`}
            >
              About
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'directory' && <DirectoryPage />}
      {currentPage === 'submit' && <SubmitPage />}
      {currentPage === 'about' && <AboutPage />}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Compass size={24} className="text-indigo-400" />
                <h3 className="font-bold text-lg">ToolScout</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Curated directory of quality SaaS tools for founders and small teams.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Quick Links</h3>
              <div className="space-y-2">
                <button onClick={() => setCurrentPage('directory')} className="block text-gray-400 hover:text-white text-sm">
                  Browse Tools
                </button>
                <button onClick={() => setCurrentPage('submit')} className="block text-gray-400 hover:text-white text-sm">
                  Submit Tool
                </button>
                <button onClick={() => setCurrentPage('about')} className="block text-gray-400 hover:text-white text-sm">
                  About
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.slice(1, 5).map(cat => (
                  <button 
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage('directory');
                    }}
                    className="block text-gray-400 hover:text-white text-sm"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2025 ToolScout. Built by Jakub.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Compact Tool Card Component
function ToolCard({ tool }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition group h-full flex flex-col">
      {/* Header with Badge */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="text-3xl">{tool.logo}</div>
          {tool.featured && (
            <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-semibold">
              <Star size={10} fill="currentColor" />
              Featured
            </div>
          )}
        </div>
        <h3 className="font-bold text-lg mb-1 group-hover:text-indigo-600 transition">{tool.name}</h3>
        <p className="text-gray-600 text-xs leading-relaxed">{tool.tagline}</p>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-gray-700 text-sm mb-4 line-clamp-2 flex-1">{tool.description}</p>

        {/* Footer Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-green-600 font-bold">
              <DollarSign size={14} />
              <span className="text-xs">{tool.pricing}</span>
            </div>
            <div className="text-xs bg-gray-100 px-2 py-1 rounded font-medium text-gray-700">
              {tool.category}
            </div>
          </div>

          {tool.iUseThis && (
            <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold border border-green-200">
              ✓ I use this
            </div>
          )}

          <a
            href={tool.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold text-sm"
          >
            View Tool
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
