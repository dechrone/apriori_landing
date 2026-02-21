"use client";

import { TopBar } from '@/components/app/TopBar';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAppShell } from '@/components/app/AppShell';

export default function SettingsPage() {
  const { toggleMobileMenu } = useAppShell();
  
  return (
    <>
      <TopBar title="Settings" onMenuClick={toggleMobileMenu} />

      <div className="max-w-[800px] mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Workspace Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              label="Workspace Name"
              placeholder="My Workspace"
              defaultValue="My Workspace"
            />
            <Input
              label="Company Name"
              placeholder="Acme Inc."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded-[6px] border-2 border-border-medium bg-bg-input
                  checked:bg-accent-gold checked:border-accent-gold
                  transition-standard cursor-pointer accent-accent-gold"
              />
              <span className="text-body text-text-secondary group-hover:text-text-primary transition-colors">Email me when simulations complete</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded-[6px] border-2 border-border-medium bg-bg-input
                  checked:bg-accent-gold checked:border-accent-gold
                  transition-standard cursor-pointer accent-accent-gold"
              />
              <span className="text-body text-text-secondary group-hover:text-text-primary transition-colors">Weekly insights summary</span>
            </label>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </>
  );
}
