import { TYPE_COLORS, type PokemonTypeName } from '../utils';
import './TypeBadge.css';

interface TypeBadgeProps {
  type: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export function TypeBadge({ type, size = 'medium', onClick }: TypeBadgeProps) {
  const typeName = type.toLowerCase() as PokemonTypeName;
  const backgroundColor = TYPE_COLORS[typeName] || '#777';
  
  return (
    <span
      className={`type-badge type-badge--${size} ${onClick ? 'type-badge--clickable' : ''}`}
      style={{ backgroundColor }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {type}
    </span>
  );
}

interface TypeBadgeListProps {
  types: string[];
  size?: 'small' | 'medium' | 'large';
}

export function TypeBadgeList({ types, size = 'medium' }: TypeBadgeListProps) {
  return (
    <div className="type-badge-list">
      {types.map((type) => (
        <TypeBadge key={type} type={type} size={size} />
      ))}
    </div>
  );
}
