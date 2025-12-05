import type { PokemonCardData } from '../types';
import { PokemonCard } from './PokemonCard';
import { PokemonGridSkeleton } from './Skeleton';
import { ErrorMessage } from './ErrorBoundary';
import './PokemonGrid.css';

interface PokemonGridProps {
  pokemon: PokemonCardData[];
  loading: boolean;
  error: string | null;
  onCardClick?: (pokemon: PokemonCardData) => void;
  onRetry?: () => void;
}

export function PokemonGrid({
  pokemon,
  loading,
  error,
  onCardClick,
  onRetry,
}: PokemonGridProps) {
  if (loading) {
    return <PokemonGridSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (pokemon.length === 0) {
    return (
      <div className="pokemon-grid__empty">
        <span className="empty-icon">🔍</span>
        <p>No Pokémon found</p>
      </div>
    );
  }

  return (
    <div className="pokemon-grid">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} onClick={onCardClick} />
      ))}
    </div>
  );
}
