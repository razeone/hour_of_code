import type { PokemonCardData } from '../types';
import { formatPokemonId, capitalizeName, TYPE_COLORS, type PokemonTypeName } from '../utils';
import { TypeBadgeList } from './TypeBadge';
import './PokemonCard.css';

interface PokemonCardProps {
  pokemon: PokemonCardData;
  onClick?: (pokemon: PokemonCardData) => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const { id, name, sprite, types } = pokemon;
  
  // Get primary type color for card background gradient
  const primaryType = types[0]?.toLowerCase() as PokemonTypeName;
  const primaryColor = TYPE_COLORS[primaryType] || '#A8A878';
  
  const handleClick = () => {
    onClick?.(pokemon);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(pokemon);
    }
  };

  return (
    <article
      className="pokemon-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${capitalizeName(name)}`}
      style={{
        '--card-color': primaryColor,
      } as React.CSSProperties}
    >
      <div className="pokemon-card__image-container">
        <img
          src={sprite}
          alt={capitalizeName(name)}
          className="pokemon-card__image"
          loading="lazy"
        />
      </div>
      
      <span className="pokemon-card__id">{formatPokemonId(id)}</span>
      
      <h3 className="pokemon-card__name">{capitalizeName(name)}</h3>
      
      <TypeBadgeList types={types} size="small" />
    </article>
  );
}
