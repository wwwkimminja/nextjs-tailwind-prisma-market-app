import { XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

interface ModalOverlayProps {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function ModalOverlay({
  onClose,
  children,
  className = '',
}: ModalOverlayProps) {
  // ESC key event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="absolute w-full h-full z-50 flex items-center justify-center bg-black/60 left-0 top-0"
      onClick={handleBackdropClick}
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-5 text-neutral-200 z-10"
      >
        <XMarkIcon className="size-10" />
      </button>
      <div className={className}>{children}</div>
    </div>
  );
}
