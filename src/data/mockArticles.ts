import { Article, ArticleCategory, ThreatLevel } from '../types';
import { cybersecuritySources } from './sources';

const generateMockArticles = (): Article[] => {
  const categories: ArticleCategory[] = [
    'zero-day', 'data-breach', 'threat-intelligence', 'compliance',
    'best-practices', 'emerging-threats', 'patches', 'research',
    'malware', 'ransomware', 'phishing', 'vulnerability'
  ];

  const threatLevels: ThreatLevel[] = ['critical', 'high', 'medium', 'low', 'info'];

  const mockTitles = [
    'Critical Zero-Day Vulnerability Discovered in Enterprise VPN Solutions',
    'Major Healthcare Provider Suffers Ransomware Attack Affecting 2.3M Patients',
    'New APT Group Targets Financial Institutions with Advanced Malware',
    'Microsoft Releases Emergency Patches for Windows Kernel Vulnerabilities',
    'Phishing Campaign Leverages AI-Generated Content to Bypass Detection',
    'CISA Issues Warning About Active Exploitation of Network Device Flaws',
    'Cryptocurrency Exchange Loses $100M in Smart Contract Exploit',
    'Supply Chain Attack Compromises Popular Software Development Tool',
    'New Ransomware Variant Uses Double Extortion and Data Leaks',
    'Cloud Misconfiguration Exposes Sensitive Government Documents',
    'Novel Attack Method Bypasses Multi-Factor Authentication',
    'Critical Infrastructure Targeted by State-Sponsored Hackers',
    'Browser Zero-Day Exploited in Targeted Attacks Against Journalists',
    'Banking Trojan Evolves to Target Mobile Banking Applications',
    'IoT Botnet Grows to 1.5 Million Infected Devices Worldwide',
    'Social Engineering Campaign Targets Remote Workers',
    'New Vulnerability Assessment Framework Released by NIST',
    'Deepfake Technology Used in Business Email Compromise Attacks',
    'Memory Corruption Bug Found in Popular Open Source Library',
    'Advanced Persistent Threat Uses Living-off-the-Land Techniques',
    'Quantum Computing Implications for Current Encryption Standards',
    'AI-Powered Security Tool Reduces False Positives by 80%',
    'Container Security Best Practices for Cloud-Native Applications',
    'Biometric Authentication System Bypassed Using Synthetic Data',
    'Insider Threat Program Implementation Guide Released',
    'Machine Learning Model Poisoning Attack Demonstrated',
    'Zero Trust Architecture Adoption Increases by 200%',
    'Vulnerability in Popular Web Framework Affects Millions of Sites',
    'Nation-State Actor Targets Vaccine Research Facilities',
    'New Privacy Regulation Creates Compliance Challenges for Organizations'
  ];

  const mockSummaries = [
    'Researchers have identified a critical vulnerability that allows remote code execution...',
    'A sophisticated ransomware attack has compromised patient data and disrupted operations...',
    'A newly discovered advanced persistent threat group is conducting targeted attacks...',
    'Microsoft has issued out-of-band security updates to address actively exploited vulnerabilities...',
    'Cybercriminals are using artificial intelligence to create more convincing phishing emails...',
    'Federal authorities warn of ongoing exploitation targeting network infrastructure devices...',
    'A smart contract vulnerability led to one of the largest cryptocurrency thefts in history...',
    'Popular development tools have been compromised, potentially affecting thousands of projects...',
    'A new ransomware family introduces novel techniques for data exfiltration and encryption...',
    'Misconfigured cloud storage has exposed classified documents from multiple agencies...'
  ];

  const mockContent = `
    <p>This is a detailed analysis of the cybersecurity incident, providing comprehensive coverage of the attack vectors, impact assessment, and recommended mitigation strategies.</p>
    
    <h3>Technical Details</h3>
    <p>The vulnerability stems from improper input validation in the authentication module, allowing attackers to bypass security controls through specially crafted requests.</p>
    
    <h3>Impact Assessment</h3>
    <p>Organizations using affected versions are at risk of unauthorized access, data exfiltration, and potential lateral movement within their networks.</p>
    
    <h3>Mitigation Recommendations</h3>
    <ul>
      <li>Apply security patches immediately</li>
      <li>Implement network segmentation</li>
      <li>Monitor for indicators of compromise</li>
      <li>Review access logs for suspicious activity</li>
    </ul>
    
    <h3>Attribution and Context</h3>
    <p>Security researchers attribute this campaign to a financially motivated threat actor with previous involvement in similar attacks against the sector.</p>
  `;

  return Array.from({ length: 50 }, (_, index) => {
    const randomSource = cybersecuritySources[Math.floor(Math.random() * cybersecuritySources.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomThreatLevel = threatLevels[Math.floor(Math.random() * threatLevels.length)];
    const randomTitle = mockTitles[Math.floor(Math.random() * mockTitles.length)];
    const randomSummary = mockSummaries[Math.floor(Math.random() * mockSummaries.length)];

    return {
      id: `article-${index + 1}`,
      title: randomTitle,
      summary: randomSummary,
      content: mockContent,
      author: `Security Researcher ${index + 1}`,
      source: randomSource,
      publishedAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
      updatedAt: new Date(),
      category: randomCategory,
      tags: ['cybersecurity', 'vulnerability', 'threat-analysis'],
      threatLevel: randomThreatLevel,
      credibilityScore: randomSource.credibilityScore,
      readTime: Math.floor(Math.random() * 10) + 2,
      isBookmarked: Math.random() > 0.8,
      isRead: Math.random() > 0.7,
      cveIds: randomCategory === 'vulnerability' ? [`CVE-2024-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`] : undefined,
      affectedProducts: ['Windows', 'Linux', 'macOS', 'Web Browsers'][Math.floor(Math.random() * 4)] ? 
        [['Windows', 'Linux', 'macOS', 'Web Browsers'][Math.floor(Math.random() * 4)]] : undefined,
      severityScore: randomThreatLevel === 'critical' ? 9.8 : 
                   randomThreatLevel === 'high' ? 7.5 :
                   randomThreatLevel === 'medium' ? 5.2 :
                   randomThreatLevel === 'low' ? 2.1 : 0.5
    };
  });
};

export const mockArticles = generateMockArticles();