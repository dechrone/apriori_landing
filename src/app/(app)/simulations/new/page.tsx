"use client";

import { useState } from 'react';
import { TopBar } from '@/components/app/TopBar';
import { Modal, ModalHeader, ModalBody } from '@/components/ui/Modal';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppShell } from '@/components/app/AppShell';
import { Beaker, Target, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewSimulationPage() {
  const { toggleMobileMenu } = useAppShell();
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleSelectType = (type: string) => {
    router.push(`/simulations/new/${type}`);
  };

  const handleClose = () => {
    setIsOpen(false);
    router.push('/simulations');
  };

  return (
    <>
      <TopBar title="New Simulation" onMenuClick={toggleMobileMenu} />
      
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
          </div>
        </ModalBody>
      </Modal>
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
