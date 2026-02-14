"use client";

import { useState, createContext, useContext } from 'react';

interface AppShellContextType {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  desktopSidebarOpen: boolean;
  setDesktopSidebarOpen: (open: boolean) => void;
  toggleDesktopSidebar: () => void;
}

const AppShellContext = createContext<AppShellContextType | undefined>(undefined);

export function useAppShell() {
  const context = useContext(AppShellContext);
  if (!context) {
    throw new Error('useAppShell must be used within AppShellProvider');
  }
  return context;
}

export function AppShellProvider({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleDesktopSidebar = () => setDesktopSidebarOpen(!desktopSidebarOpen);

  return (
    <AppShellContext.Provider value={{ 
      mobileMenuOpen, 
      setMobileMenuOpen, 
      toggleMobileMenu,
      desktopSidebarOpen,
      setDesktopSidebarOpen,
      toggleDesktopSidebar
    }}>
      {children}
    </AppShellContext.Provider>
  );
}
