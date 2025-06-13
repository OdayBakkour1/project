"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { 
  Bookmark, 
  Filter, 
  Search, 
  ExternalLink, 
  Sparkles, 
  Clock, 
  MapPin,
  X,
  Check,
  ChevronsUpDown,
  Loader2,
  LogOut
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { Badge } from "./badge";
import { Card, CardContent, CardHeader } from "./card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "./dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Component as UserProfileButton } from "./demo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { useNavigate } from "react-router-dom";
import UserProfileSettingsDialog from "./UserProfileSettingsDialog";
import UserSettingsDialog from "./UserSettingsDialog";
import { useAuth } from "../../hooks/useAuth";

// Types
interface CyberSecurityArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  source: string;
  publishedAt: string;
  readTime: string;
  severity: "low" | "medium" | "high" | "critical";
  imageUrl?: string;
  url: string;
}

interface Tag {
  id: string;
  name: string;
  count: number;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

// Mock data
const mockArticles: CyberSecurityArticle[] = [
  {
    id: "1",
    title: "Critical Zero-Day Vulnerability Discovered in Popular VPN Software",
    summary: "Security researchers have identified a critical zero-day vulnerability affecting millions of VPN users worldwide. The flaw allows remote code execution and data exfiltration.",
    content: "A critical zero-day vulnerability has been discovered in one of the world's most popular VPN software applications, potentially affecting millions of users globally. The vulnerability, designated CVE-2024-0001, allows attackers to execute arbitrary code remotely and potentially exfiltrate sensitive user data. Security researchers at CyberSec Labs first identified the flaw during routine penetration testing and immediately reported it to the vendor. The vulnerability stems from improper input validation in the VPN client's connection handling mechanism. When a malicious server sends specially crafted packets, it can trigger a buffer overflow condition that allows attackers to gain complete control over the affected system. This type of attack is particularly concerning because VPN users often trust their VPN software implicitly and may not have additional security measures in place. The affected vendor has released an emergency patch and is urging all users to update immediately. Security experts recommend that organizations using this VPN solution should prioritize the update and consider implementing additional network monitoring to detect any potential exploitation attempts.",
    category: "Vulnerabilities",
    tags: ["zero-day", "VPN", "remote-code-execution", "critical"],
    source: "CyberSec Today",
    publishedAt: "2024-01-15T10:30:00Z",
    readTime: "5 min",
    severity: "critical",
    imageUrl: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=400&fit=crop",
    url: "https://example.com/article1"
  },
  {
    id: "2",
    title: "New Ransomware Campaign Targets Healthcare Organizations",
    summary: "A sophisticated ransomware group has launched targeted attacks against healthcare institutions, exploiting vulnerabilities in medical device networks.",
    content: "Healthcare organizations across North America are facing a new wave of ransomware attacks from a sophisticated cybercriminal group known as MedLock. The group has specifically targeted hospitals, clinics, and medical research facilities, exploiting vulnerabilities in connected medical devices and legacy systems that are often difficult to patch or update. The attacks begin with spear-phishing emails sent to healthcare workers, containing malicious attachments that appear to be legitimate medical documents or software updates. Once inside the network, the attackers move laterally through connected medical devices, many of which run outdated operating systems and lack proper security controls. The ransomware encrypts critical patient data, medical records, and even affects the operation of some medical equipment. What makes this campaign particularly dangerous is the attackers' deep understanding of healthcare operations and their willingness to target life-critical systems. Several hospitals have been forced to divert emergency patients to other facilities while dealing with the attacks. The FBI and Department of Health and Human Services have issued joint advisories urging healthcare organizations to implement immediate security measures and ensure all medical devices are properly segmented from main networks.",
    category: "Threats",
    tags: ["ransomware", "healthcare", "medical-devices", "targeted-attacks"],
    source: "Healthcare Security News",
    publishedAt: "2024-01-14T14:20:00Z",
    readTime: "7 min",
    severity: "high",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
    url: "https://example.com/article2"
  },
  {
    id: "3",
    title: "AI-Powered Security Tools Show Promise in Threat Detection",
    summary: "Latest research demonstrates significant improvements in threat detection capabilities using machine learning algorithms and behavioral analysis.",
    content: "Recent developments in artificial intelligence and machine learning are revolutionizing cybersecurity threat detection capabilities. A comprehensive study conducted by the International Cybersecurity Research Institute shows that AI-powered security tools can detect previously unknown threats with 94% accuracy, a significant improvement over traditional signature-based detection methods. The research focused on behavioral analysis techniques that monitor network traffic patterns, user behavior, and system activities to identify anomalies that may indicate malicious activity. These AI systems can process vast amounts of data in real-time, identifying subtle patterns that human analysts might miss. One of the most promising applications is in detecting advanced persistent threats (APTs), which often remain undetected for months or even years using conventional security tools. The AI systems use deep learning algorithms trained on millions of network traffic samples to establish baseline behaviors for different types of systems and users. When deviations from these baselines are detected, the system can automatically flag potential threats for investigation. However, researchers caution that AI-powered security tools are not a silver bullet and must be properly configured and continuously updated to remain effective against evolving threats. The study also highlighted the importance of human oversight in validating AI-generated alerts to prevent false positives that could overwhelm security teams.",
    category: "Technology",
    tags: ["AI", "machine-learning", "threat-detection", "behavioral-analysis"],
    source: "AI Security Review",
    publishedAt: "2024-01-13T09:15:00Z",
    readTime: "6 min",
    severity: "medium",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    url: "https://example.com/article3"
  },
  {
    id: "4",
    title: "Supply Chain Attack Compromises Popular JavaScript Library",
    summary: "Malicious code injected into a widely-used JavaScript package affects thousands of web applications worldwide.",
    content: "A supply chain attack targeting a popular JavaScript library has potentially compromised thousands of web applications worldwide. The attack was discovered when security researchers noticed unusual network activity from websites using the 'web-utils' package, which has over 2 million weekly downloads on npm. Attackers gained access to the maintainer's account through a sophisticated social engineering campaign and pushed a malicious update that included code designed to steal sensitive user information. The malicious code was carefully crafted to avoid detection by automated security scanners and only activated under specific conditions. When triggered, it would collect form data, including passwords and credit card information, and transmit it to attacker-controlled servers. The attack highlights the growing threat to software supply chains, where a single compromised component can affect countless downstream applications. The npm security team has removed the malicious package versions and is working with affected developers to assess the impact. This incident underscores the importance of implementing software composition analysis tools and maintaining strict access controls for package repositories. Organizations are advised to audit their dependencies regularly and implement integrity checks for third-party components.",
    category: "Supply Chain",
    tags: ["supply-chain", "javascript", "npm", "data-theft"],
    source: "DevSec Weekly",
    publishedAt: "2024-01-12T16:45:00Z",
    readTime: "4 min",
    severity: "high",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    url: "https://example.com/article4"
  },
  {
    id: "5",
    title: "New Compliance Requirements for Cloud Security Announced",
    summary: "Regulatory bodies introduce stricter security standards for cloud service providers and their customers.",
    content: "Major regulatory bodies have announced new compliance requirements that will significantly impact how organizations approach cloud security. The new standards, set to take effect in six months, require enhanced data protection measures, improved incident response procedures, and more rigorous third-party risk assessments for cloud deployments. The regulations were developed in response to increasing concerns about data breaches and security incidents involving cloud services. Key requirements include mandatory encryption of data both in transit and at rest, implementation of zero-trust security models, and regular security audits by certified third parties. Organizations will also need to maintain detailed logs of all data access and processing activities, with logs retained for a minimum of seven years. Cloud service providers must demonstrate compliance with the new standards through annual certifications and will be subject to surprise audits by regulatory authorities. The regulations also introduce new notification requirements, mandating that any security incident affecting customer data must be reported to authorities within 24 hours. Industry experts estimate that compliance costs could increase by 15-20% for most organizations, but argue that the enhanced security measures are necessary given the evolving threat landscape. Companies are advised to begin compliance planning immediately to ensure they meet the implementation deadline.",
    category: "Compliance",
    tags: ["compliance", "cloud-security", "regulations", "data-protection"],
    source: "Compliance Today",
    publishedAt: "2024-01-11T11:30:00Z",
    readTime: "8 min",
    severity: "medium",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
    url: "https://example.com/article5"
  }
];

const mockCategories: Category[] = [
  { id: "all", name: "All Categories", count: 5 },
  { id: "vulnerabilities", name: "Vulnerabilities", count: 1 },
  { id: "threats", name: "Threats", count: 1 },
  { id: "technology", name: "Technology", count: 1 },
  { id: "supply-chain", name: "Supply Chain", count: 1 },
  { id: "compliance", name: "Compliance", count: 1 }
];

const mockTags: Tag[] = [
  { id: "zero-day", name: "zero-day", count: 1 },
  { id: "ransomware", name: "ransomware", count: 1 },
  { id: "ai", name: "AI", count: 1 },
  { id: "supply-chain", name: "supply-chain", count: 1 },
  { id: "compliance", name: "compliance", count: 1 },
  { id: "vpn", name: "VPN", count: 1 },
  { id: "healthcare", name: "healthcare", count: 1 },
  { id: "cloud-security", name: "cloud-security", count: 1 }
];

// Action Button Component
interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isPending: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

function ActionButton({
  children,
  isPending,
  variant = "default",
  size = "default",
  className,
  onClick,
  ...props
}: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isPending}
      variant={variant}
      size={size}
      className={cn(
        className,
        "inline-grid place-items-center [grid-template-areas:'stack']"
      )}
      {...props}
    >
      <span
        className={cn(
          isPending && "invisible",
          "flex items-center gap-2 [grid-area:stack]"
        )}
      >
        {children}
      </span>
      <Loader2
        aria-label="Loading"
        className={cn(
          isPending ? "visible" : "invisible",
          "size-4 animate-spin transition-opacity [grid-area:stack]"
        )}
      />
    </Button>
  );
}

// Tag Selector Component
interface TagSelectorProps {
  availableTags: Tag[];
  selectedTags: Tag[];
  onChange: (tags: Tag[]) => void;
  className?: string;
}

function TagSelector({
  availableTags,
  selectedTags,
  onChange,
  className,
}: TagSelectorProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const filteredTags = availableTags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedTags.some((selected) => selected.id === tag.id)
  );

  const handleSelect = (value: string) => {
    const existingTag = availableTags.find((tag) => tag.id === value);
    if (existingTag) {
      onChange([...selectedTags, existingTag]);
    }
    setInputValue("");
  };

  const handleRemove = (value: string) => {
    onChange(selectedTags.filter((tag) => tag.id !== value));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex flex-wrap gap-1 mt-1 py-1 pl-1 pr-3 h-auto w-full text-left items-center justify-start min-h-9",
            className,
            selectedTags.length > 0 && "hover:bg-background"
          )}
        >
          {selectedTags.map((tag) => (
            <Badge
              key={tag.id}
              variant="secondary"
              className="flex items-center gap-1 text-xs"
            >
              {tag.name}
              <button
                type="button"
                className="cursor-pointer hover:bg-destructive/20 p-0.5 rounded transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(tag.id);
                }}
                aria-label="Remove tag"
              >
                <X size={10} />
              </button>
            </Badge>
          ))}
          <span className="flex-grow" />
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search tags..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup heading="Tags">
              {filteredTags.map((tag) => (
                <CommandItem
                  key={tag.id}
                  value={tag.id}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTags.some((selected) => selected.id === tag.id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {tag.name} ({tag.count})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Main Component
function CyberSecurityNewsFeed() {
  const [articles, setArticles] = useState<CyberSecurityArticle[]>(mockArticles);
  const [filteredArticles, setFilteredArticles] = useState<CyberSecurityArticle[]>(mockArticles);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<string>>(new Set());
  const [selectedArticle, setSelectedArticle] = useState<CyberSecurityArticle | null>(null);
  const [isAiSummarizing, setIsAiSummarizing] = useState<string | null>(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleProfile = () => {
    console.log("Opening profile settings...");
    setIsProfileDialogOpen(true);
  };

  const handleSettings = () => {
    console.log("Opening general settings...");
    setIsSettingsDialogOpen(true);
  };

  const handleCloseProfileDialog = () => {
    setIsProfileDialogOpen(false);
  };

  const handleCloseSettingsDialog = () => {
    setIsSettingsDialogOpen(false);
  };

  // Filter articles based on category, tags, and search
  useEffect(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (article) => article.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((article) =>
        selectedTags.some((tag) =>
          article.tags.some((articleTag) => articleTag.toLowerCase().includes(tag.name.toLowerCase()))
        )
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [articles, selectedCategory, selectedTags, searchQuery]);

  const toggleBookmark = (articleId: string) => {
    setBookmarkedArticles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const handleAiSummarize = async (articleId: string) => {
    setIsAiSummarizing(articleId);
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsAiSummarizing(null);
    // In a real app, this would generate an AI summary
    alert("AI Summary generated! (This is a demo)");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Cybersecurity News Feed</h1>
            <p className="text-muted-foreground text-lg">
              Stay updated with the latest cybersecurity threats, vulnerabilities, and industry news
            </p>
            {user && (
              <p className="text-sm text-muted-foreground mt-2">
                Welcome back, {user.user_metadata?.full_name || user.email}
              </p>
            )}
          </div>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <UserProfileButton />
              </PopoverTrigger>
              <PopoverContent className="w-48 p-1">
                <div className="grid gap-1">
                  <button className="px-2 py-1.5 text-sm rounded-md hover:bg-accent text-left" onClick={handleProfile}>Profile</button>
                  <button className="px-2 py-1.5 text-sm rounded-md hover:bg-accent text-left" onClick={handleSettings}>Settings</button>
                  <button className="px-2 py-1.5 text-sm rounded-md hover:bg-accent text-left text-destructive flex items-center gap-2" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {mockCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="text-xs"
              >
                <Filter className="w-3 h-3 mr-1" />
                {category.name} ({category.count})
              </Button>
            ))}
          </div>

          {/* Tag Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Filter by Tags:</label>
            <TagSelector
              availableTags={mockTags}
              selectedTags={selectedTags}
              onChange={setSelectedTags}
              className="max-w-md"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Article Image */}
              {article.imageUrl && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <div className={cn("w-3 h-3 rounded-full", getSeverityColor(article.severity))} />
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button
                      aria-label="Bookmark"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-background/80 hover:bg-background"
                      onClick={() => toggleBookmark(article.id)}
                    >
                      <Bookmark
                        className={cn(
                          "h-4 w-4",
                          bookmarkedArticles.has(article.id)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        )}
                      />
                    </Button>
                  </div>
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <h3 className="font-semibold text-lg line-clamp-2 leading-tight">
                  {article.title}
                </h3>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {article.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{article.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Article Meta */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {article.source}
                  </div>
                  <div>{formatDate(article.publishedAt)}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        Read Full Article
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl">{article.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {article.imageUrl && (
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{article.source}</span>
                          <span>{formatDate(article.publishedAt)}</span>
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="prose max-w-none">
                          <p className="text-base leading-relaxed">{article.content}</p>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Button asChild variant="outline">
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Original
                            </a>
                          </Button>
                          <ActionButton
                            variant="outline"
                            isPending={isAiSummarizing === article.id}
                            onClick={() => handleAiSummarize(article.id)}
                            aria-label="AI Summarize button"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            AI Summarize
                          </ActionButton>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <ActionButton
                    variant="outline"
                    size="sm"
                    isPending={isAiSummarizing === article.id}
                    onClick={() => handleAiSummarize(article.id)}
                    aria-label="AI Summarize"
                  >
                    <Sparkles className="w-4 h-4" />
                  </ActionButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No articles found matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedTags([]);
                setSearchQuery("");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}

        <UserProfileSettingsDialog
          isOpen={isProfileDialogOpen}
          onClose={handleCloseProfileDialog}
        />
        <UserSettingsDialog
          isOpen={isSettingsDialogOpen}
          onClose={handleCloseSettingsDialog}
        />
      </div>
    </div>
  );
}

export default CyberSecurityNewsFeed;