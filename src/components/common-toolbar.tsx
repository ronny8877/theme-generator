"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Palette, 
  Layers, 
  Sparkles, 
  Info,
  Home,
  Eye,
  Shuffle
} from 'lucide-react';

interface ToolbarProps {
  className?: string;
}

export function CommonToolbar({ className = '' }: ToolbarProps) {
  const pathname = usePathname();
  
  const tools = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      description: 'Return to homepage'
    },
    {
      name: 'Color Lab',
      href: '/color-lab',
      icon: Palette,
      description: 'Color converter, contrast checker & harmonies'
    },
    {
      name: 'Palette',
      href: '/palette',
      icon: Layers,
      description: 'Generate and analyze color palettes'
    },
    {
      name: 'Gradient',
      href: '/gradient',
      icon: Sparkles,
      description: 'Create beautiful gradients'
    },
    {
      name: 'Templates',
      href: '/templates',
      icon: Eye,
      description: 'Browse design templates'
    },
    {
      name: 'FAQ',
      href: '/faq',
      icon: Info,
      description: 'Frequently asked questions'
    }
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className={`navbar bg-base-100 shadow-lg border-b border-base-200 ${className}`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-80">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <li key={tool.href}>
                  <Link 
                    href={tool.href} 
                    className={`flex items-center gap-3 p-3 ${isActive(tool.href) ? 'active' : ''}`}
                  >
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-semibold">{tool.name}</div>
                      <div className="text-sm text-base-content/70">{tool.description}</div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl font-bold">
          <Shuffle className="h-6 w-6 mr-2" />
          ThemeGen
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {tools.slice(1, -1).map((tool) => { // Skip Home and FAQ for main nav
            const Icon = tool.icon;
            return (
              <li key={tool.href}>
                <Link 
                  href={tool.href} 
                  className={`btn btn-ghost gap-2 ${isActive(tool.href) ? 'btn-primary' : ''}`}
                  title={tool.description}
                >
                  <Icon className="h-4 w-4" />
                  {tool.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
      <div className="navbar-end">
        <Link 
          href="/faq" 
          className={`btn btn-ghost gap-2 ${isActive('/faq') ? 'btn-primary' : ''}`}
          title="Frequently asked questions"
        >
          <Info className="h-4 w-4" />
          <span className="hidden sm:inline">FAQ</span>
        </Link>
      </div>
    </div>
  );
}

// Compact version for smaller spaces
export function CompactToolbar({ className = '' }: ToolbarProps) {
  const pathname = usePathname();
  
  const tools = [
    { name: 'Color Lab', href: '/color-lab', icon: Palette },
    { name: 'Palette', href: '/palette', icon: Layers },
    { name: 'Gradient', href: '/gradient', icon: Sparkles },
    { name: 'Templates', href: '/templates', icon: Eye }
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <div className={`flex gap-2 p-4 bg-base-100 border-b border-base-200 ${className}`}>
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <Link 
            key={tool.href}
            href={tool.href} 
            className={`btn btn-sm gap-2 ${isActive(tool.href) ? 'btn-primary' : 'btn-ghost'}`}
            title={tool.name}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden md:inline">{tool.name}</span>
          </Link>
        );
      })}
    </div>
  );
}