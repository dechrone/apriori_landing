"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Beaker, 
  Users, 
  Package, 
  Image as ImageIcon, 
  Lightbulb, 
  Settings,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Simulations', href: '/simulations', icon: Beaker },
  { name: 'Audiences', href: '/audiences', icon: Users },
  { name: 'Product Context', href: '/product-context', icon: Package },
  { name: 'Assets', href: '/assets', icon: ImageIcon },
  { name: 'Insights', href: '/insights', icon: Lightbulb },
];

const secondaryNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <>
      {/* Logo & Workspace */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-h4 text-text-primary font-semibold">Apriori</span>
          {/* Mobile close button */}
          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="lg:hidden text-text-tertiary hover:text-text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
        <p className="text-body-sm text-text-tertiary">Workspace</p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onMobileClose}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-md
                text-body font-medium transition-standard
                ${isActive 
                  ? 'bg-bg-elevated text-text-primary border-l-3 border-accent-gold' 
                  : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                }
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}

        {/* Section Header */}
        <div className="pt-6 pb-3">
          <p className="text-label text-text-quaternary px-3">Settings</p>
        </div>

        {secondaryNavigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onMobileClose}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-md
                text-body font-medium transition-standard
                ${isActive 
                  ? 'bg-bg-elevated text-text-primary border-l-3 border-accent-gold' 
                  : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                }
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[260px] bg-bg-secondary border-r border-border-subtle p-8 flex-col z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-bg-primary/80 backdrop-blur-sm"
          onClick={onMobileClose}
        >
          <aside 
            className="fixed left-0 top-0 h-screen w-[280px] bg-bg-secondary border-r border-border-subtle p-8 flex flex-col animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
