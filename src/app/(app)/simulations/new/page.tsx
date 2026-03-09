"use client";

import { useState } from 'react';
import { TopBar } from '@/components/app/TopBar';
import { Modal, ModalHeader, ModalBody } from '@/components/ui/Modal';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppShell } from '@/components/app/AppShell';
import { Beaker, Target, GitCompare, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewSimulationPage() {
  const { toggleMobileMenu } = useAppShell();
  const [isOpen, setIsOpen] = useState(true);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);
  const router = useRouter();

  const handleSelectType = (type: string) => {
    if (type === 'ad-portfolio') {
      setShowComingSoonModal(true);
      return;
    }
    router.push(`/simulations/new/${type}`);
  };

  const handleClose = () => {
    setIsOpen(false);
    router.push('/simulations');
  };

  return (
    <>
      <TopBar title="New Simulation" onMenuClick={toggleMobileMenu} />
      
      <div className="p-5 sm:p-8 lg:p-10">
      <Modal isOpen={isOpen} onClose={handleClose} size="large">
        <ModalHeader onClose={handleClose}>
          Choose Simulation Type
        </ModalHeader>
        <ModalBody>
          <div className="space-y-5">
            <SimulationTypeCard
              icon={<Beaker className="w-12 h-12" />}
              title="Product Flow Simulation"
              description="Simulate user journeys and identify friction points in your product flows. Perfect for testing onboarding, checkout, and key conversion paths."
              onSelect={() => handleSelectType('product-flow')}
            />
            <SimulationTypeCard
              icon={<Target className="w-12 h-12" />}
              title="Ad Portfolio Simulation"
              description="Forecast ad performance and creative fatigue across multiple campaigns. Optimize budget allocation and creative rotation strategies."
              onSelect={() => handleSelectType('ad-portfolio')}
            />
            <SimulationTypeCard
              icon={<GitCompare className="w-12 h-12" />}
              title="Product Flow Comparator"
              description="Compare two versions of a product flow side-by-side. Perfect for A/B testing onboarding, checkout, or any user journey variants."
              onSelect={() => handleSelectType('product-flow-comparator')}
            />
          </div>
        </ModalBody>
      </Modal>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
          onClick={() => setShowComingSoonModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚪</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                This door opens soon
              </h3>
              <p className="text-[#6B7280] mb-6">
                Ad Portfolio Simulation is coming soon. Stay tuned for updates!
              </p>
              <button
                onClick={() => setShowComingSoonModal(false)}
                className="w-full px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface SimulationTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onSelect: () => void;
}

function SimulationTypeCard({ icon, title, description, onSelect }: SimulationTypeCardProps) {
  return (
    <Card hover className="cursor-pointer" onClick={onSelect}>
      <CardContent className="flex items-start gap-5 py-8">
        <div className="text-accent-gold flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-h3 text-text-primary mb-3">{title}</h3>
          <p className="text-body text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>
        <Button variant="ghost" className="flex-shrink-0">
          Select
          <ArrowRight className="w-5 h-5" />
        </Button>
      </CardContent>
    </Card>
  );
}
