"use client";

import { useState } from 'react';
import { TopBar } from '@/components/app/TopBar';
import { Modal, ModalHeader, ModalBody } from '@/components/ui/Modal';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppShell } from '@/components/app/AppShell';
import { Columns2, GitCompare, ArrowRight } from 'lucide-react';
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

      <div className="p-5 sm:p-8 lg:p-10">
      <Modal isOpen={isOpen} onClose={handleClose} size="large">
        <ModalHeader onClose={handleClose}>
          Choose Simulation Type
        </ModalHeader>
        <ModalBody>
          <div className="space-y-5">
            <SimulationTypeCard
              icon={<Columns2 className="w-12 h-12" />}
              title="Single-Screen A/B"
              description="Upload two screen variants and see which converts better. Two uploads, one minute of setup, the fastest way to a PM-ready A/B report."
              recommended
              onSelect={() => handleSelectType('product-flow-ab')}
            />
            <SimulationTypeCard
              icon={<GitCompare className="w-12 h-12" />}
              title="Full-Flow A/B"
              description="Compare two full multi-screen journeys side-by-side. For A/B-testing an entire funnel, onboarding, checkout, or any conversion path."
              onSelect={() => handleSelectType('product-flow-comparator')}
            />
          </div>
        </ModalBody>
      </Modal>
      </div>
    </>
  );
}

interface SimulationTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  recommended?: boolean;
  onSelect: () => void;
}

function SimulationTypeCard({ icon, title, description, recommended, onSelect }: SimulationTypeCardProps) {
  return (
    <Card hover className="cursor-pointer relative" onClick={onSelect}>
      {recommended && (
        <span className="absolute -top-2 left-4 text-[10px] font-bold text-white bg-gray-700 rounded-full px-2 py-0.5 uppercase tracking-wider">
          Recommended
        </span>
      )}
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
