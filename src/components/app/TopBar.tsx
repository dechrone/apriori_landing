"use client";

import { Bell, Menu } from 'lucide-react';

interface TopBarProps {
  title: string;
  breadcrumb?: string;
  actions?: React.ReactNode;
  onMenuClick?: () => void;
}

export function TopBar({ title, breadcrumb, actions, onMenuClick }: TopBarProps) {
  return (
    <header
      className="sticky top-0 h-16 bg-white flex items-center justify-between px-4 lg:px-8 z-30"
      style={{ borderBottom: '1px solid #E8E4DE' }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          {breadcrumb && (
            <p className="text-sm text-[#6B7280] mb-0.5 hidden sm:block">{breadcrumb}</p>
          )}
          <h1 className="text-2xl font-bold text-[#1A1A1A] leading-snug truncate max-w-[200px] sm:max-w-none">{title}</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:block">
          {actions}
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-[#6B7280]" />
          </button>
          <div className="flex items-center justify-center shrink-0 w-[34px] h-[34px] rounded-full bg-[#E8E4DE] text-[#6B7280] text-sm font-semibold">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
