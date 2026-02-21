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
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { useAppShell } from '@/components/app/AppShell';

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

export const DESKTOP_SIDEBAR_WIDTH = 260;
export const DESKTOP_SIDEBAR_WIDTH_COLLAPSED = 72;

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useAppShell();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);

  const sidebarContent = (collapsed: boolean) => (
    <>
      {/* Logo & Workspace */}
      <div className={collapsed ? 'mb-6' : 'mb-8'}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} mb-2`}>
          <span className="text-h4 text-text-primary font-semibold truncate">
            {collapsed ? 'A' : 'Apriori'}
          </span>
          {onMobileClose && !collapsed && (
            <button
              onClick={onMobileClose}
              className="lg:hidden text-text-tertiary hover:text-text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
        {!collapsed && <p className="text-body-sm text-text-tertiary">Workspace</p>}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1">
        {!collapsed && (
          <p className="text-label text-text-quaternary px-3 pb-2">Main Menu</p>
        )}
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <div 
              key={item.name} 
              className="relative"
              onMouseEnter={(e) => {
                if (collapsed) {
                  setHoveredItem(item.name);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltipPosition({
                    top: rect.top + rect.height / 2,
                    left: rect.right + 8
                  });
                }
              }}
              onMouseLeave={() => {
                setHoveredItem(null);
                setTooltipPosition(null);
              }}
            >
              <Link
                href={item.href}
                onClick={onMobileClose}
                className={`
                  flex items-center rounded-[var(--radius-sm)] text-body font-medium transition-standard
                  ${collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5'}
                  ${isActive
                    ? 'bg-accent-gold/10 text-accent-gold border-l-[3px] border-accent-gold font-semibold'
                    : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'}
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </div>
          );
        })}

        {!collapsed && (
          <div className="pt-6 pb-2">
            <p className="text-label text-text-quaternary px-3">Account</p>
          </div>
        )}

        {collapsed && <div className="pt-4" />}

        {secondaryNavigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <div 
              key={item.name}
              className="relative"
              onMouseEnter={(e) => {
                if (collapsed) {
                  setHoveredItem(item.name);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltipPosition({
                    top: rect.top + rect.height / 2,
                    left: rect.right + 8
                  });
                }
              }}
              onMouseLeave={() => {
                setHoveredItem(null);
                setTooltipPosition(null);
              }}
            >
              <Link
                href={item.href}
                onClick={onMobileClose}
                className={`
                  flex items-center rounded-[var(--radius-sm)] text-body font-medium transition-standard
                  ${collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5'}
                  ${isActive
                    ? 'bg-accent-gold/10 text-accent-gold border-l-[3px] border-accent-gold font-semibold'
                    : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'}
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Desktop: collapse/expand toggle */}
      <div className="hidden lg:block pt-4 border-t border-border-subtle">
        <button
          type="button"
          onClick={toggleSidebar}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-[var(--radius-sm)] text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-standard"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <PanelLeft className="w-5 h-5 flex-shrink-0 mx-auto" />
          ) : (
            <>
              <PanelLeftClose className="w-5 h-5 flex-shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>

    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex fixed left-0 top-0 h-screen bg-bg-secondary shadow-[var(--shadow-card)] flex-col z-40 transition-[width] duration-200 ease-out"
        style={{ width: sidebarCollapsed ? DESKTOP_SIDEBAR_WIDTH_COLLAPSED : DESKTOP_SIDEBAR_WIDTH }}
      >
        <div className={`flex-1 flex flex-col min-w-0 p-8 overflow-y-auto ${sidebarCollapsed ? 'px-3' : ''}`}>
          {sidebarContent(sidebarCollapsed)}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-bg-primary/60 backdrop-blur-sm"
          onClick={onMobileClose}
        >
          <aside
            className="fixed left-0 top-0 h-screen w-[280px] bg-bg-secondary shadow-[var(--shadow-xl)] p-8 flex flex-col animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent(false)}
          </aside>
        </div>
      )}

      {/* Tooltip - rendered outside sidebar to avoid overflow clipping */}
      {hoveredItem && tooltipPosition && sidebarCollapsed && (
        <div
          className="fixed z-[60] pointer-events-none"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            transform: 'translateY(-50%)'
          }}
        >
          <div className="relative bg-bg-secondary text-text-primary text-body-sm font-medium px-3 py-1.5 rounded-[var(--radius-md)] shadow-lg border border-border-medium whitespace-nowrap">
            {hoveredItem}
            <div 
              className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0"
              style={{ 
                borderTop: '6px solid transparent',
                borderRight: '6px solid var(--bg-secondary)',
                borderBottom: '6px solid transparent'
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
