"use client";

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Mail, 
  Github, 
  Twitter, 
  Star, 
  Palette, 
  Pipette, 
  Blend,
  Sparkles,
  Target,
  Users,
  Code
} from 'lucide-react';

const features = [
  {
    icon: Pipette,
    title: 'Color Lab',
    description: 'Convert between color formats, analyze properties, and test accessibility contrasts with WCAG guidelines.'
  },
  {
    icon: Palette,
    title: 'Palette Generator',
    description: 'Create beautiful color palettes using color harmony rules, analyze accessibility, and export in multiple formats.'
  },
  {
    icon: Blend,
    title: 'Gradient Tool',
    description: 'Design stunning gradients with live preview, multiple gradient types, and easy CSS export functionality.'
  },
  {
    icon: Sparkles,
    title: 'Smart Analysis',
    description: 'Get detailed insights about your colors including contrast ratios, harmony analysis, and accessibility scores.'
  }
];

const stats = [
  { icon: Target, label: 'Color Formats', value: '6+' },
  { icon: Palette, label: 'Harmony Types', value: '7' },
  { icon: Users, label: 'Accessibility', value: 'WCAG' },
  { icon: Code, label: 'Export Formats', value: '5+' }
];

export function AboutTool() {
  const handleEmailContact = () => {
    window.open('mailto:your-email@example.com?subject=Theme Generator Feedback', '_blank');
  };

  const handleGithubOpen = () => {
    window.open('https://github.com/your-username/theme-generator', '_blank');
  };

  const handleTwitterOpen = () => {
    window.open('https://twitter.com/your-username', '_blank');
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-8 p-1">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Palette className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Theme Generator</h1>
            <p className="text-muted-foreground">
              Professional color tools for designers and developers
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <div className="p-4 rounded-lg bg-muted/50 border">
            <p className="text-sm leading-relaxed">
              We believe that great design starts with great colors. Our mission is to provide 
              professional-grade color tools that are both powerful and accessible, helping 
              designers and developers create beautiful, accessible digital experiences.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Features</h2>
          <div className="grid gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex gap-3 p-3 rounded-lg border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Built for Professionals</h2>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="p-3 rounded-lg border text-center">
                  <Icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-lg font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technology */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Technology</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <span className="font-medium">Color Engine</span>
              <span className="text-sm text-muted-foreground">Culori.js</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <span className="font-medium">Framework</span>
              <span className="text-sm text-muted-foreground">Next.js 15</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <span className="font-medium">UI Components</span>
              <span className="text-sm text-muted-foreground">Radix UI</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <span className="font-medium">Styling</span>
              <span className="text-sm text-muted-foreground">Tailwind CSS</span>
            </div>
          </div>
        </div>

        {/* Why We Built This */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Why We Built This</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              As designers and developers, we found ourselves constantly switching between 
              different tools for color work - one for conversion, another for palettes, 
              and yet another for gradients.
            </p>
            <p>
              We wanted a single, powerful platform that could handle all color-related 
              tasks while maintaining professional-grade accuracy and providing real-time 
              accessibility feedback.
            </p>
            <p>
              The result is this comprehensive color toolkit that we use daily in our own 
              design and development work.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Get in Touch</h2>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Have feedback, suggestions, or want to request a new feature? 
              We&apos;d love to hear from you!
            </p>
            
            <div className="grid gap-2">
              <Button 
                variant="outline" 
                onClick={handleEmailContact}
                className="justify-start"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send us an email
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleGithubOpen}
                className="justify-start"
              >
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleTwitterOpen}
                className="justify-start"
              >
                <Twitter className="h-4 w-4 mr-2" />
                Follow us on Twitter
              </Button>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Support the Project</h2>
          <div className="p-4 rounded-lg border bg-muted/50">
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Love what we&apos;re building?</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Star us on GitHub, share with your design team, or contribute to the project. 
                  Your support helps us keep improving and adding new features.
                </p>
                <Button size="sm" variant="outline" className="mt-3" onClick={handleGithubOpen}>
                  <Star className="h-4 w-4 mr-1" />
                  Star on GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t text-center text-xs text-muted-foreground">
          <p>Made with ❤️ for the design community</p>
          <p className="mt-1">© 2024 Theme Generator. Open source and free to use.</p>
        </div>
      </div>
    </ScrollArea>
  );
}