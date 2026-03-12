"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { AuditSelectionModal } from "@/components/AuditSelectionModal";

interface AuditModalContextValue {
  openAuditModal: () => void;
  closeAuditModal: () => void;
}

const AuditModalContext = createContext<AuditModalContextValue | null>(null);

export function AuditModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openAuditModal = useCallback(() => {
    setIsOpen(true);
  }, []);

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
