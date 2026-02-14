"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { AuditSelectionModal } from "@/components/AuditSelectionModal";

interface AuditModalContextValue {
  openAuditModal: () => void;
  closeAuditModal: () => void;
}

const AuditModalContext = createContext<AuditModalContextValue | null>(null);

export function AuditModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const openAuditModal = useCallback(() => {
    if (!isSignedIn) {
      router.push("/sign-up");
      return;
    }
    setIsOpen(true);
  }, [isSignedIn, router]);

  const closeAuditModal = useCallback(() => setIsOpen(false), []);

  return (
    <AuditModalContext.Provider value={{ openAuditModal, closeAuditModal }}>
      {children}
      <AuditSelectionModal isOpen={isOpen} onClose={closeAuditModal} />
    </AuditModalContext.Provider>
  );
}

export function useAuditModal() {
  const context = useContext(AuditModalContext);
  if (!context) {
    throw new Error("useAuditModal must be used within an AuditModalProvider");
  }
  return context;
}
