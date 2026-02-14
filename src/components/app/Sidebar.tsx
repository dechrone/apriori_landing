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
  X,
  Menu
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
  desktopOpen?: boolean;
  onDesktopToggle?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose, desktopOpen = true, onDesktopToggle }: SidebarProps) {
  const pathname = usePathname();
  const isCollapsed = !desktopOpen;

  const sidebarContent = (
    <>
      {/* Logo & Workspace */}
      <div className={`mb-8 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-2 w-full`}>
          {!isCollapsed && <span className="text-h4 text-text-primary font-semibold">Apriori</span>}
          {isCollapsed && (
            <span className="text-h4 text-text-primary font-semibold">A</span>
          )}
          <div className="flex items-center gap-2">
            {/* Desktop hamburger toggle */}
            {onDesktopToggle && (
              <button
                onClick={onDesktopToggle}
                className="hidden lg:flex text-text-tertiary hover:text-text-primary transition-colors p-1.5 rounded-md hover:bg-bg-elevated"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
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
        </div>
        {!isCollapsed && <p className="text-body-sm text-text-tertiary">Workspace</p>}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          const Icon = item.icon;
          
          return (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                onClick={onMobileClose}
                className={`
                  flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-md
                  text-body font-medium transition-standard
                  ${isActive 
                    ? 'bg-bg-elevated text-text-primary border-l-3 border-accent-gold' 
                    : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-bg-elevated border border-border-subtle rounded-md text-body text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                  {item.name}
                </div>
              )}
            </div>
          );
        })}

        {/* Section Header */}
        {!isCollapsed && (
          <div className="pt-6 pb-3">
            <p className="text-label text-text-quaternary px-3">Settings</p>
          </div>
        )}

        {secondaryNavigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                onClick={onMobileClose}
                className={`
                  flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-md
                  text-body font-medium transition-standard
                  ${isActive 
                    ? 'bg-bg-elevated text-text-primary border-l-3 border-accent-gold' 
                    : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-bg-elevated border border-border-subtle rounded-md text-body text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                  {item.name}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex fixed left-0 top-0 h-screen bg-bg-secondary border-r border-border-subtle flex-col z-40 transition-all duration-300 ${
        desktopOpen ? 'w-[260px] p-8' : 'w-[80px] p-4'
      }`}>
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
