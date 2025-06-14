"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from "framer-motion";
import { Button } from "./button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";
import { Menu, MoveRight, X, Shield, Globe, Users, BookmarkIcon, Github, Twitter, ChevronLeft, AlertCircle, CheckCircle, Info } from "lucide-react";
import { cn } from "../lib/utils";
import { useAuth } from "../../hooks/useAuth";

// Glow Component
const Glow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "top" | "above" | "bottom" | "below" | "center" }
>(({ className, variant = "top", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute w-full",
      variant === "top" && "top-0",
      variant === "above" && "-top-[128px]",
      variant === "bottom" && "bottom-0",
      variant === "below" && "-bottom-[128px]",
      variant === "center" && "top-[50%]",
      className
    )}
    {...props}
  >
    <div
      className={cn(
        "absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(210_100%_50%/.5)_10%,_hsl(213_100%_60%/0)_60%)] sm:h-[512px]",
        variant === "center" && "-translate-y-1/2",
      )}
    />
    <div
      className={cn(
        "absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(213_100%_60%/.3)_10%,_hsl(210_100%_50%/0)_60%)] sm:h-[256px]",
        variant === "center" && "-translate-y-1/2",
      )}
    />
  </div>
));
Glow.displayName = "Glow";

// Mockup Component
const Mockup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { type?: "mobile" | "responsive" }
>(({ className, type = "responsive", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex relative z-10 overflow-hidden shadow-2xl border border-border/5 border-t-border/15",
      type === "mobile" ? "rounded-[48px] max-w-[350px]" : "rounded-md",
      className
    )}
    {...props}
  />
));
Mockup.displayName = "Mockup";

// Particles Component
interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [color]);

  useEffect(() => {
    onMouseMove();
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.floor(Math.random() * 2) + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const rgb = hexToRgb(color);

  const drawCircle = (circle: any, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (value: number, start1: number, end1: number, start2: number, end2: number): number => {
    const remapped = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    clearContext();
    circles.current.forEach((circle: any, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;
      drawCircle(circle, true);
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      }
    });
    window.requestAnimationFrame(animate);
  };

  return (
    <div className={cn("pointer-events-none", className)} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};

// Add these functions at the top level, before the components
const handleGetStarted = () => {
  // Scroll to auth form section
  document.getElementById('auth-form')?.scrollIntoView({ behavior: 'smooth' });
};

const handleViewDemo = () => {
  window.open('https://github.com/cyberwatch', '_blank');
};

const handleContact = () => {
  window.location.href = '/contact';
};

const handleSignIn = () => {
  document.getElementById('auth-form')?.scrollIntoView({ behavior: 'smooth' });
};

// Header Component
function Header() {
  const navigationItems = [
    {
      title: "Home",
      href: "/",
      description: "",
    },
    {
      title: "Features",
      description: "Discover our cybersecurity news aggregation features.",
      items: [
        {
          title: "Real-time Updates",
          href: "/features/realtime",
        },
        {
          title: "Threat Intelligence",
          href: "/features/intelligence",
        },
        {
          title: "Custom Alerts",
          href: "/features/alerts",
        },
        {
          title: "Analytics",
          href: "/features/analytics",
        },
      ],
    },
    {
      title: "Sources",
      description: "Trusted cybersecurity news sources and feeds.",
      items: [
        {
          title: "Security Blogs",
          href: "/sources/blogs",
        },
        {
          title: "Vendor Updates",
          href: "/sources/vendors",
        },
        {
          title: "Research Papers",
          href: "/sources/research",
        },
        {
          title: "Government Alerts",
          href: "/sources/government",
        },
      ],
    },
  ];

  const [isOpen, setOpen] = useState(false);
  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <>
                      <NavigationMenuLink>
                        <Button variant="ghost">{item.title}</Button>
                      </NavigationMenuLink>
                    </>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                            <Button size="sm" className="mt-10">
                              Get Started
                            </Button>
                          </div>
                          <div className="flex flex-col text-sm h-full justify-end">
                            {item.items?.map((subItem) => (
                              <NavigationMenuLink
                                href={subItem.href}
                                key={subItem.title}
                                className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                              >
                                <span>{subItem.title}</span>
                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex lg:justify-center">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">CyberWatch</span>
          </div>
        </div>
        <div className="flex justify-end w-full gap-4">
          <Button variant="ghost" className="hidden md:inline" onClick={handleContact}>
            Contact
          </Button>
          <div className="border-r hidden md:inline"></div>
          <Button variant="outline" onClick={handleSignIn}>Sign in</Button>
          <Button onClick={handleGetStarted}>Get started</Button>
        </div>
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <a href={item.href} className="flex justify-between items-center">
                        <span className="text-lg">{item.title}</span>
                        <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                      </a>
                    ) : (
                      <p className="text-lg">{item.title}</p>
                    )}
                    {item.items &&
                      item.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.href}
                          className="flex justify-between items-center"
                        >
                          <span className="text-muted-foreground">{subItem.title}</span>
                          <MoveRight className="w-4 h-4 stroke-1" />
                        </a>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative bg-background text-foreground py-12 px-4 md:py-24 lg:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-[1280px] flex flex-col gap-12 lg:gap-24">
        <div className="relative z-10 flex flex-col items-center gap-6 pt-8 md:pt-16 text-center lg:gap-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block bg-gradient-to-b from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] sm:leading-[1.1] drop-shadow-sm"
          >
            Stay Ahead of Cyber Threats
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-[550px] text-base sm:text-lg md:text-xl text-muted-foreground font-medium"
          >
            Get real-time cybersecurity news, threat intelligence, and security updates from trusted sources worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10 flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleGetStarted}>
              Start Free Trial
            </Button>
            <Button size="lg" variant="ghost" className="text-foreground/80" onClick={handleViewDemo}>
              <Github className="mr-2 h-4 w-4" />
              View Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative w-full pt-12 px-4 sm:px-6 lg:px-8"
          >
            <Mockup className="shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] border-primary/10">
              <img
                src="https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=1248&h=765&fit=crop&q=80"
                alt="CyberWatch Security Dashboard"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </Mockup>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Glow variant="above" className="opacity-50" />
        <Particles
          className="absolute inset-0"
          quantity={50}
          ease={80}
          color="#3b82f6"
          refresh
        />
      </div>
    </section>
  );
}

// Stats Section Component
function StatsSection() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 lg:gap-8">
          <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
            <Shield className="w-4 h-4 mb-10 text-primary" />
            <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
              10,000+
              <span className="text-muted-foreground text-sm tracking-normal">
                +25%
              </span>
            </h2>
            <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
              Security professionals trust us
            </p>
          </div>
          <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
            <Globe className="w-4 h-4 mb-10 text-primary" />
            <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
              500+
              <span className="text-muted-foreground text-sm tracking-normal">
                +15%
              </span>
            </h2>
            <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
              Trusted news sources
            </p>
          </div>
          <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
            <Users className="w-4 h-4 mb-10 text-primary" />
            <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
              24/7
              <span className="text-muted-foreground text-sm tracking-normal">
                Real-time
              </span>
            </h2>
            <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
              Continuous monitoring
            </p>
          </div>
          <div className="flex gap-0 flex-col justify-between p-6 border rounded-md">
            <BookmarkIcon className="w-4 h-4 mb-10 text-primary" />
            <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end">
              99.9%
              <span className="text-muted-foreground text-sm tracking-normal">
                Uptime
              </span>
            </h2>
            <p className="text-base leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
              Service reliability
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get user-friendly error messages
const getAuthErrorMessage = (error: any): string => {
  const errorMessage = error?.message?.toLowerCase() || '';
  
  if (errorMessage.includes('invalid login credentials') || errorMessage.includes('invalid_credentials')) {
    return 'The email or password you entered is incorrect. Please check your credentials and try again.';
  }
  
  if (errorMessage.includes('email not confirmed')) {
    return 'Please check your email and click the confirmation link before signing in.';
  }
  
  if (errorMessage.includes('user not found')) {
    return 'No account found with this email address. Please check your email or create a new account.';
  }
  
  if (errorMessage.includes('too many requests')) {
    return 'Too many login attempts. Please wait a few minutes before trying again.';
  }
  
  if (errorMessage.includes('weak password')) {
    return 'Password is too weak. Please use at least 6 characters with a mix of letters and numbers.';
  }
  
  if (errorMessage.includes('email already registered') || errorMessage.includes('user already registered')) {
    return 'An account with this email already exists. Please sign in instead or use a different email.';
  }
  
  if (errorMessage.includes('invalid email')) {
    return 'Please enter a valid email address.';
  }
  
  // Return the original error message if we don't have a specific handler
  return error?.message || 'An unexpected error occurred. Please try again.';
};

// Auth Form Component
function AuthFormSection({ onSignInSuccess }: { onSignInSuccess: () => void }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const { signUp, signIn, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isSignUp) {
        const { data, error } = await signUp(formData.email, formData.password, formData.name);
        if (error) {
          setError(getAuthErrorMessage(error));
        } else {
          setSuccess('Account created successfully! Please check your email to verify your account.');
          // Reset form
          setFormData({ name: '', email: '', password: '' });
        }
      } else {
        const { data, error } = await signIn(formData.email, formData.password);
        if (error) {
          setError(getAuthErrorMessage(error));
          // Show password reset option for invalid credentials
          if (error.message?.toLowerCase().includes('invalid login credentials')) {
            setShowPasswordReset(true);
          }
        } else {
          setSuccess('Signed in successfully!');
          onSignInSuccess();
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!formData.email) {
      setError('Please enter your email address first.');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const { error } = await resetPassword(formData.email);
      if (error) {
        setError(getAuthErrorMessage(error));
      } else {
        setSuccess('Password reset email sent! Please check your inbox.');
        setShowPasswordReset(false);
      }
    } catch (err) {
      setError('Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
    // Hide password reset option when user changes email
    if (name === 'email' && showPasswordReset) {
      setShowPasswordReset(false);
    }
  };

  const handleModeSwitch = () => {
    setIsSignUp(!isSignUp);
    setError(null);
    setSuccess(null);
    setShowPasswordReset(false);
    // Clear form when switching modes
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div id="auth-form" className="bg-background py-20 text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        className="relative z-10 mx-auto w-full max-w-xl p-4"
      >
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">CyberWatch</span>
          </div>
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={handleModeSwitch}
              className="text-primary hover:underline"
              disabled={loading}
            >
              {isSignUp ? "Sign in." : "Create one."}
            </button>
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/20">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-sm text-destructive">{error}</span>
                {showPasswordReset && (
                  <div className="mt-2">
                    <button
                      onClick={handlePasswordReset}
                      className="text-xs text-primary hover:underline"
                      disabled={loading}
                    >
                      Reset your password
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-md bg-green-500/10 border border-green-500/20 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-500">{success}</span>
          </div>
        )}

        {/* Info message for new users */}
        {isSignUp && (
          <div className="mb-4 p-3 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-blue-500">
              Create an account to access personalized cybersecurity news feeds and threat intelligence.
            </span>
          </div>
        )}

        <div className="mb-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button 
              aria-label="Sign in with Twitter" 
              className="relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-md border border-border bg-muted px-4 py-2 font-semibold text-foreground transition-all duration-500 hover:scale-105 active:scale-95"
              disabled={loading}
            >
              <Twitter size={20} />
            </button>
            <button 
              aria-label="Sign in with Github" 
              className="relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-md border border-border bg-muted px-4 py-2 font-semibold text-foreground transition-all duration-500 hover:scale-105 active:scale-95"
              disabled={loading}
            >
              <Github size={20} />
            </button>
            <button 
              className="col-span-2 relative z-0 flex items-center justify-center gap-2 overflow-hidden rounded-md border border-border bg-muted px-4 py-2 font-semibold text-foreground transition-all duration-500 hover:scale-105 active:scale-95"
              disabled={loading}
            >
              Sign {isSignUp ? "up" : "in"} with SSO
            </button>
          </div>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-[1px] w-full bg-border" />
          <span className="text-muted-foreground">OR</span>
          <div className="h-[1px] w-full bg-border" />
        </div>

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-3">
              <label htmlFor="name-input" className="mb-1.5 block text-muted-foreground">
                Full Name
              </label>
              <input
                id="name-input"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-primary"
                required={isSignUp}
                disabled={loading}
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email-input" className="mb-1.5 block text-muted-foreground">
              Email
            </label>
            <input
              id="email-input"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@provider.com"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-primary"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <div className="mb-1.5 flex items-end justify-between">
              <label htmlFor="password-input" className="block text-muted-foreground">
                Password
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => setShowPasswordReset(!showPasswordReset)}
                  className="text-sm text-primary hover:underline"
                  disabled={loading}
                >
                  Forgot?
                </button>
              )}
            </div>
            <input
              id="password-input"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••••••"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder-muted-foreground ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-primary"
              required
              disabled={loading}
              minLength={6}
            />
            {isSignUp && (
              <p className="mt-1 text-xs text-muted-foreground">
                Password must be at least 6 characters long
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                {isSignUp ? "Creating Account..." : "Signing In..."}
              </div>
            ) : (
              isSignUp ? "Create Account" : "Sign in"
            )}
          </Button>
        </form>

        <p className="mt-9 text-xs text-muted-foreground">
          By {isSignUp ? "creating an account" : "signing in"}, you agree to our{" "}
          <a href="#" className="text-primary">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary">
            Privacy Policy.
          </a>
        </p>
      </motion.div>
    </div>
  );
}

// Footer Component
interface LinkItem {
  href: string;
  label: string;
}

interface FooterProps {
  leftLinks: LinkItem[];
  rightLinks: LinkItem[];
  copyrightText: string;
}

const Footer: React.FC<FooterProps> = ({
  leftLinks,
  rightLinks,
  copyrightText,
}) => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(59,130,246,0.05)_50%,transparent_70%)]" />
      </div>
      
      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">CyberWatch</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Your trusted source for real-time cybersecurity intelligence and threat monitoring.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Features</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Pricing</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">API</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Integrations</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Security Center</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors text-sm">Status</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {rightLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-slate-300 hover:text-white transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6">
              {leftLinks.map((link, index) => (
                <a key={index} href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              <Shield className="w-4 h-4" />
              {copyrightText}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
    </footer>
  );
};

// Main Landing Page Component
function CyberSecurityLandingPage({ onSignInSuccess }: { onSignInSuccess: () => void }) {
  const leftLinks = [
    { href: "/terms", label: "Terms & Policies" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/security", label: "Security" },
  ];

  const rightLinks = [
    { href: "/careers", label: "Careers" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "https://twitter.com/cyberwatch", label: "Twitter" },
    { href: "https://github.com/cyberwatch", label: "GitHub" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <HeroSection />
        <StatsSection />
        <AuthFormSection onSignInSuccess={onSignInSuccess} />
      </main>
      <Footer
        leftLinks={leftLinks}
        rightLinks={rightLinks}
        copyrightText="CyberWatch 2025. All Rights Reserved"
      />
    </div>
  );
}

export default CyberSecurityLandingPage;