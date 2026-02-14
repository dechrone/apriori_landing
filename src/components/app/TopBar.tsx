"use client";

import { Bell, Menu } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { IconButton } from '@/components/ui/Button';
import { useAppShell } from '@/components/app/AppShell';

interface TopBarProps {
  title: string;
  breadcrumb?: string;
  actions?: React.ReactNode;
  onMenuClick?: () => void;
}

export function TopBar({ title, breadcrumb, actions, onMenuClick }: TopBarProps) {
  const { desktopSidebarOpen } = useAppShell();
  
  return (
    <header className={`fixed top-0 left-0 right-0 h-[72px] bg-bg-primary border-b border-border-subtle px-4 lg:px-8 flex items-center justify-between z-40 transition-all duration-300 ${
      desktopSidebarOpen ? 'lg:left-[260px]' : 'lg:left-[80px]'
    }`}>
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-text-tertiary hover:text-text-primary transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          {breadcrumb && (
            <p className="text-body-sm text-text-tertiary mb-1 hidden sm:block">{breadcrumb}</p>
          )}
          <h1 className="text-h3 text-text-primary truncate max-w-[200px] sm:max-w-none">{title}</h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:block">
          {actions}
        </div>
        <div className="flex items-center gap-2 h-10">
          <IconButton
            icon={<Bell className="w-5 h-5" />}
            label="Notifications"
            className="flex items-center justify-center h-10 w-10 shrink-0"
          />
          <div className="flex items-center justify-center h-10 w-10 shrink-0 [&_.cl-avatarBox]:!w-9 [&_.cl-avatarBox]:!h-9">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9"
                }
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
