import { NewsSource } from '../types';

export const cybersecuritySources: NewsSource[] = [
  // Major Cybersecurity News Sites
  {
    id: 'krebs-security',
    name: 'Krebs on Security',
    url: 'https://krebsonsecurity.com',
    rssUrl: 'https://krebsonsecurity.com/feed/',
    category: 'news',
    credibilityScore: 95,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'dark-reading',
    name: 'Dark Reading',
    url: 'https://www.darkreading.com',
    rssUrl: 'https://www.darkreading.com/rss.xml',
    category: 'news',
    credibilityScore: 90,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'bleeping-computer',
    name: 'Bleeping Computer',
    url: 'https://www.bleepingcomputer.com',
    rssUrl: 'https://www.bleepingcomputer.com/feed/',
    category: 'news',
    credibilityScore: 88,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'threatpost',
    name: 'Threatpost',
    url: 'https://threatpost.com',
    rssUrl: 'https://threatpost.com/feed/',
    category: 'news',
    credibilityScore: 87,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'security-week',
    name: 'Security Week',
    url: 'https://www.securityweek.com',
    rssUrl: 'https://www.securityweek.com/feed/',
    category: 'news',
    credibilityScore: 86,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'cyber-scoop',
    name: 'CyberScoop',
    url: 'https://www.cyberscoop.com',
    rssUrl: 'https://www.cyberscoop.com/feed/',
    category: 'news',
    credibilityScore: 85,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'infosecurity-magazine',
    name: 'Infosecurity Magazine',
    url: 'https://www.infosecurity-magazine.com',
    rssUrl: 'https://www.infosecurity-magazine.com/rss/news/',
    category: 'news',
    credibilityScore: 84,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'ars-technica-security',
    name: 'Ars Technica Security',
    url: 'https://arstechnica.com/security/',
    rssUrl: 'https://feeds.arstechnica.com/arstechnica/security',
    category: 'news',
    credibilityScore: 92,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'wired-security',
    name: 'WIRED Security',
    url: 'https://www.wired.com/category/security/',
    rssUrl: 'https://www.wired.com/category/security/feed/',
    category: 'news',
    credibilityScore: 88,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'techcrunch-security',
    name: 'TechCrunch Security',
    url: 'https://techcrunch.com/category/security/',
    rssUrl: 'https://techcrunch.com/category/security/feed/',
    category: 'news',
    credibilityScore: 82,
    lastUpdated: new Date(),
    isActive: true
  },

  // Government and Official Sources
  {
    id: 'cisa-alerts',
    name: 'CISA Alerts',
    url: 'https://www.cisa.gov/news-events/cybersecurity-advisories',
    rssUrl: 'https://www.cisa.gov/.well-known/csaf_provider/index.json',
    category: 'government',
    credibilityScore: 98,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'nist-cybersecurity',
    name: 'NIST Cybersecurity',
    url: 'https://www.nist.gov/cybersecurity',
    rssUrl: 'https://www.nist.gov/news/cybersecurity/rss.xml',
    category: 'government',
    credibilityScore: 97,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'us-cert',
    name: 'US-CERT',
    url: 'https://www.cisa.gov/uscert/',
    rssUrl: 'https://www.cisa.gov/uscert/ncas/alerts.xml',
    category: 'government',
    credibilityScore: 96,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'fbi-cyber',
    name: 'FBI Cyber Division',
    url: 'https://www.fbi.gov/investigate/cyber',
    rssUrl: 'https://www.fbi.gov/feeds/cyber/rss.xml',
    category: 'government',
    credibilityScore: 95,
    lastUpdated: new Date(),
    isActive: true
  },

  // Research and Academic Sources
  {
    id: 'sans-reading-room',
    name: 'SANS Reading Room',
    url: 'https://www.sans.org/reading-room/',
    rssUrl: 'https://www.sans.org/rss/reading-room.xml',
    category: 'research',
    credibilityScore: 94,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'schneier-security',
    name: 'Schneier on Security',
    url: 'https://www.schneier.com',
    rssUrl: 'https://www.schneier.com/feed/',
    category: 'blog',
    credibilityScore: 96,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'google-security-blog',
    name: 'Google Security Blog',
    url: 'https://security.googleblog.com',
    rssUrl: 'https://security.googleblog.com/atom.xml',
    category: 'vendor',
    credibilityScore: 91,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'microsoft-security',
    name: 'Microsoft Security Blog',
    url: 'https://www.microsoft.com/security/blog/',
    rssUrl: 'https://www.microsoft.com/security/blog/feed/',
    category: 'vendor',
    credibilityScore: 89,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'cisco-security',
    name: 'Cisco Security Blog',
    url: 'https://blog.cisco.com/security',
    rssUrl: 'https://blog.cisco.com/security/feed',
    category: 'vendor',
    credibilityScore: 87,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'fireeye-blog',
    name: 'Mandiant Blog',
    url: 'https://www.mandiant.com/resources/blog',
    rssUrl: 'https://www.mandiant.com/resources/blog/rss.xml',
    category: 'vendor',
    credibilityScore: 93,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'crowdstrike-blog',
    name: 'CrowdStrike Blog',
    url: 'https://www.crowdstrike.com/blog/',
    rssUrl: 'https://www.crowdstrike.com/blog/feed/',
    category: 'vendor',
    credibilityScore: 88,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'symantec-security',
    name: 'Broadcom Security Blog',
    url: 'https://symantec-enterprise-blogs.security.com',
    rssUrl: 'https://symantec-enterprise-blogs.security.com/blogs/feeds/posts',
    category: 'vendor',
    credibilityScore: 85,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'checkpoint-research',
    name: 'Check Point Research',
    url: 'https://research.checkpoint.com',
    rssUrl: 'https://research.checkpoint.com/feed/',
    category: 'research',
    credibilityScore: 90,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'kaspersky-securelist',
    name: 'Kaspersky Securelist',
    url: 'https://securelist.com',
    rssUrl: 'https://securelist.com/feed/',
    category: 'research',
    credibilityScore: 86,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'malwarebytes-labs',
    name: 'Malwarebytes Labs',
    url: 'https://blog.malwarebytes.com',
    rssUrl: 'https://blog.malwarebytes.com/feed/',
    category: 'research',
    credibilityScore: 84,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'rapid7-blog',
    name: 'Rapid7 Blog',
    url: 'https://blog.rapid7.com',
    rssUrl: 'https://blog.rapid7.com/rss/',
    category: 'vendor',
    credibilityScore: 83,
    lastUpdated: new Date(),
    isActive: true
  },
  {
    id: 'palo-alto-unit42',
    name: 'Unit 42 by Palo Alto',
    url: 'https://unit42.paloaltonetworks.com',
    rssUrl: 'https://unit42.paloaltonetworks.com/feed/',
    category: 'research',
    credibilityScore: 91,
    lastUpdated: new Date(),
    isActive: true
  }
];