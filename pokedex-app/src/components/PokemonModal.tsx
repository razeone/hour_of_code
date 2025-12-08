import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { usePokemonDetail } from '../hooks';
import { PokemonDetail } from './PokemonDetail';
import './PokemonModal.css';

interface PokemonModalProps {
  pokemonId: number | null;
  onClose: () => void;
}

export function PokemonModal({ pokemonId, onClose }: PokemonModalProps) {
  const { pokemon, species, loading, error } = usePokemonDetail(pokemonId);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key and focus trap
  useEffect(() => {
    if (!pokemonId) return;

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus the modal
    modalRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      
      // Restore focus to previously focused element
      previousActiveElement.current?.focus();
    };
  }, [pokemonId, onClose]);

  // Don't render if no pokemon selected
  if (!pokemonId) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="pokemon-modal__overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pokemon-modal-title"
    >
      <div
        className="pokemon-modal"
        ref={modalRef}
        tabIndex={-1}
      >
        <button
          className="pokemon-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {error ? (
          <div className="pokemon-modal__error">
            <span className="pokemon-modal__error-icon">😵</span>
            <p>Failed to load Pokémon details</p>
            <p className="pokemon-modal__error-message">{error}</p>
            <button className="pokemon-modal__retry" onClick={() => {}}>
              Try Again
            </button>
          </div>
        ) : pokemon ? (
          <PokemonDetail pokemon={pokemon} species={species} loading={loading} />
        ) : (
          <PokemonDetail pokemon={null as unknown as any} species={null} loading={true} />
        )}
      </div>
    </div>
  );

  // Render in portal to avoid z-index issues
  return createPortal(modalContent, document.body);
}
