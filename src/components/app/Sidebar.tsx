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
  Settings,
  Sparkles,
  X,
  PanelLeftClose,
  PanelLeft,
  MessageCircle,
} from 'lucide-react';
import { useAppShell } from '@/components/app/AppShell';
import { useTalkToUs } from '@/components/app/TalkToUs';

function TalkToUsNavItem({ collapsed }: { collapsed: boolean }) {
  const { open } = useTalkToUs();
  return (
    <button
      type="button"
      onClick={open}
      className={`flex items-center w-full rounded-lg text-sm font-medium text-[#374151] hover:bg-[#F5F5F5] transition-[background] duration-150 ease-in-out ${
        collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5'
      }`}
    >
      <MessageCircle className="w-5 h-5 flex-shrink-0 text-[#9CA3AF]" />
      {!collapsed && <span>Talk to us</span>}
    </button>
  );
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Simulations', href: '/simulations', icon: Beaker },
  { name: 'Audiences', href: '/audiences', icon: Users },
  { name: 'Product Context', href: '/product-context', icon: Package },
  { name: 'Assets', href: '/assets', icon: ImageIcon },
];

const secondaryNavigation = [
  { name: 'Pricing', href: '/pricing', icon: Sparkles },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const DESKTOP_SIDEBAR_WIDTH = 256;
export const DESKTOP_SIDEBAR_WIDTH_COLLAPSED = 72;

function NavItem({
  icon: Icon,
  label,
  href,
  active,
  collapsed,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  active: boolean;
  collapsed: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center rounded-lg text-sm transition-[background] duration-150 ease-in-out
        ${collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5'}
        ${active
          ? 'bg-indigo-50 text-indigo-700 font-semibold'
          : 'text-[#374151] hover:bg-[#F5F5F5] font-medium'}
      `}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-indigo-600' : 'text-[#9CA3AF]'}`} />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useAppShell();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  const sidebarContent = (collapsed: boolean) => (
    <>
      {/* Brand / Workspace */}
      <div
        className={`h-16 flex items-center ${collapsed ? 'justify-center px-2' : 'px-6'}`}
        style={{ borderBottom: '1px solid #E8E4DE' }}
      >
        {collapsed ? (
          <span className="text-[16px] font-bold text-[#1A1A1A]">A</span>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div>
              <h3 className="font-bold text-[#1A1A1A]" style={{ fontSize: '16px' }}>Apriori</h3>
              <p className="text-xs text-[#9CA3AF]">Workspace</p>
            </div>
            {onMobileClose && (
              <button
                onClick={onMobileClose}
                className="lg:hidden text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col">
        {/* Main Menu */}
        <div className="space-y-0.5">
          {!collapsed && (
            <p className="text-xs font-semibold text-[#9CA3AF] px-3 mb-2 tracking-widest uppercase">
              Main Menu
            </p>
          )}
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={(e) => {
                if (collapsed) {
                  setHoveredItem(item.name);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltipPosition({
                    top: rect.top + rect.height / 2,
                    left: rect.right + 8,
                  });
                }
              }}
              onMouseLeave={() => {
                setHoveredItem(null);
                setTooltipPosition(null);
              }}
            >
              <NavItem
                icon={item.icon}
                label={item.name}
                href={item.href}
                active={isActive(item.href)}
                collapsed={collapsed}
                onClick={onMobileClose}
              />
            </div>
          ))}
        </div>

        {/* Account */}
        <div className="mt-6 space-y-0.5">
          {!collapsed && (
            <p className="text-xs font-semibold text-[#9CA3AF] px-3 mb-2 tracking-widest uppercase">
              Account
            </p>
          )}
          {collapsed && <div className="pt-4" />}
          {secondaryNavigation.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={(e) => {
                if (collapsed) {
                  setHoveredItem(item.name);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltipPosition({
                    top: rect.top + rect.height / 2,
                    left: rect.right + 8,
                  });
                }
              }}
              onMouseLeave={() => {
                setHoveredItem(null);
                setTooltipPosition(null);
              }}
            >
              <NavItem
                icon={item.icon}
                label={item.name}
                href={item.href}
                active={isActive(item.href)}
                collapsed={collapsed}
                onClick={onMobileClose}
              />
            </div>
          ))}
        </div>

        {/* Talk to us — bottom of nav */}
        <div className="mt-auto pt-6">
          <div
            className="relative"
            onMouseEnter={(e) => {
              if (collapsed) {
                setHoveredItem('Talk to us');
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltipPosition({
                  top: rect.top + rect.height / 2,
                  left: rect.right + 8,
                });
              }
            }}
            onMouseLeave={() => {
              setHoveredItem(null);
              setTooltipPosition(null);
            }}
          >
            <TalkToUsNavItem collapsed={collapsed} />
          </div>
        </div>
      </nav>

      {/* Collapse/expand toggle (desktop only) */}
      <div className="hidden lg:block" style={{ borderTop: '1px solid #E8E4DE' }}>
        <div className="p-4">
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-[#9CA3AF] hover:bg-[#F5F5F5] hover:text-[#4B5563] transition-[background] duration-150 ease-in-out"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <PanelLeft className="w-5 h-5 flex-shrink-0 mx-auto" />
            ) : (
              <>
                <PanelLeftClose className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs text-[#9CA3AF]">Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex h-full flex-col flex-shrink-0 z-40 bg-white transition-[width] duration-200 ease-out"
        style={{
          width: sidebarCollapsed ? DESKTOP_SIDEBAR_WIDTH_COLLAPSED : DESKTOP_SIDEBAR_WIDTH,
          borderRight: '1px solid #E8E4DE',
        }}
      >
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {sidebarContent(sidebarCollapsed)}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          onClick={onMobileClose}
        >
          <aside
            className="fixed left-0 top-0 h-screen w-[280px] flex flex-col bg-white animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
              {sidebarContent(false)}
            </div>
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
            transform: 'translateY(-50%)',
          }}
        >
          <div className="relative bg-white text-[#1A1A1A] text-[13px] font-medium px-3 py-1.5 rounded-lg shadow-lg border border-[#E5E7EB] whitespace-nowrap">
            {hoveredItem}
            <div
              className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0"
              style={{
                borderTop: '6px solid transparent',
                borderRight: '6px solid #FFFFFF',
                borderBottom: '6px solid transparent',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
