import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

let openModalCount = 0;

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  zIndexClass?: string;
  ariaLabel?: string;
  children: ReactNode;
}

export function ModalShell({
  isOpen,
  onClose,
  zIndexClass = 'z-50',
  ariaLabel,
  children,
}: ModalShellProps) {
  useEffect(() => {
    if (!isOpen) return;

    openModalCount += 1;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      openModalCount = Math.max(0, openModalCount - 1);
      if (openModalCount === 0) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`fixed inset-0 ${zIndexClass} flex items-center justify-center p-4 sm:p-6 fade-in`}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm" aria-hidden="true" />
      <div
        className="relative z-10 w-full flex justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
