"use client";

import { useState, useEffect, useCallback } from 'react';
import { TopBar } from '@/components/app/TopBar';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';
import { StyledDropdown } from '@/components/ui/StyledDropdown';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import { useAppShell } from '@/components/app/AppShell';
import { useFirebaseUser } from '@/contexts/FirebaseUserContext';
import { Loader2, Save } from 'lucide-react';
import { getProductContext, saveProductContext, type ProductContextData } from '@/lib/firestore';

const DEFAULT_FORM: ProductContextData = {
  productType: 'saas',
  pricingModel: 'subscription',
  salesMotion: 'plg',
  kpis: [],
  constraints: '',
};

export default function ProductContextPage() {
  const { toggleMobileMenu } = useAppShell();
  const { showToast } = useToast();
  const { userId, profileReady } = useFirebaseUser();

  const [formData, setFormData] = useState<ProductContextData>(DEFAULT_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadContext = useCallback(async () => {
    if (!userId || !profileReady) return;
    try {
      const data = await getProductContext(userId);
      if (data) setFormData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId, profileReady]);

  useEffect(() => {
    loadContext();
  }, [loadContext]);

  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    try {
      await saveProductContext(userId, formData);
      showToast('success', 'Product context saved', 'Your changes have been saved to Firebase.');
    } catch (err) {
      console.error(err);
      showToast('error', 'Failed to save', 'Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <TopBar title="Product Context" onMenuClick={toggleMobileMenu} />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Product Context" onMenuClick={toggleMobileMenu} />

      <div className="p-5 sm:p-8 lg:p-10">
      <div className="max-w-[800px] mx-auto space-y-8 pb-24">
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <StyledDropdown
              label="Product Type"
              value={formData.productType}
              onChange={(v) => setFormData({ ...formData, productType: v })}
              options={[
                { value: 'saas', label: 'SaaS' },
                { value: 'marketplace', label: 'Marketplace' },
                { value: 'ecommerce', label: 'E-commerce' },
                { value: 'platform', label: 'Platform' },
              ]}
            />
            <StyledDropdown
              label="Pricing Model"
              value={formData.pricingModel}
              onChange={(v) => setFormData({ ...formData, pricingModel: v })}
              options={[
                { value: 'subscription', label: 'Subscription' },
                { value: 'usage-based', label: 'Usage-based' },
                { value: 'one-time', label: 'One-time' },
                { value: 'freemium', label: 'Freemium' },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Model</CardTitle>
          </CardHeader>
          <CardContent>
            <StyledDropdown
              label="Sales Motion"
              value={formData.salesMotion}
              onChange={(v) => setFormData({ ...formData, salesMotion: v })}
              options={[
                { value: 'plg', label: 'Product-Led Growth (PLG)' },
                { value: 'sales-led', label: 'Sales-Led' },
                { value: 'hybrid', label: 'Hybrid' },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Core KPIs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Retention', 'LTV', 'Activation Rate', 'Conversion Rate', 'Churn Rate'].map((kpi) => (
                <label key={kpi} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.kpis.includes(kpi)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, kpis: [...formData.kpis, kpi] });
                      } else {
                        setFormData({ ...formData, kpis: formData.kpis.filter((k) => k !== kpi) });
                      }
                    }}
                    className="w-5 h-5 rounded-[6px] border-2 border-border-medium bg-bg-input
                      checked:bg-accent-gold checked:border-accent-gold
                      transition-standard cursor-pointer accent-accent-gold"
                  />
                  <span className="text-body text-text-secondary group-hover:text-text-primary transition-colors">{kpi}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Constraints</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              label="Business Constraints"
              placeholder="Describe any constraints, limitations, or requirements that should be considered in simulations..."
              value={formData.constraints}
              onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
              rows={6}
            />
          </CardContent>
        </Card>
      </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-bg-secondary/95 backdrop-blur-sm shadow-[0_-1px_3px_rgba(0,0,0,0.06)] px-4 lg:px-8 py-4 z-20">
        <div className="max-w-[1600px] mx-auto flex justify-end">
          <Button size="lg" onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </footer>
    </>
  );
}
