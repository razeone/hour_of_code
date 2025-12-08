import { useState } from 'react';
import type { Pokemon, PokemonSpecies } from '../types';
import { formatPokemonId, capitalizeName, TYPE_COLORS, type PokemonTypeName } from '../utils';
import { TypeBadgeList } from './TypeBadge';
import { PokemonStats } from './PokemonStats';
import './PokemonDetail.css';

interface PokemonDetailProps {
  pokemon: Pokemon;
  species: PokemonSpecies | null;
  loading?: boolean;
}

export function PokemonDetail({ pokemon, species, loading }: PokemonDetailProps) {
  const [showShiny, setShowShiny] = useState(false);

  if (loading) {
    return <PokemonDetailSkeleton />;
  }

  const { id, name, types, stats, abilities, height, weight, sprites } = pokemon;

  // Get primary type for background color
  const primaryType = types[0]?.type.name.toLowerCase() as PokemonTypeName;
  const primaryColor = TYPE_COLORS[primaryType] || '#A8A878';

  // Get sprite URLs
  const defaultSprite = sprites.other?.['official-artwork']?.front_default || sprites.front_default || '';
  const shinySprite = sprites.other?.['official-artwork']?.front_shiny || sprites.front_shiny || '';
  const currentSprite = showShiny && shinySprite ? shinySprite : defaultSprite;

  // Get English flavor text
  const flavorText = species?.flavor_text_entries
    .find((entry) => entry.language.name === 'en')
    ?.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ');

  // Get English genus (category)
  const genus = species?.genera.find((g) => g.language.name === 'en')?.genus;

  // Format height (decimeters to meters) and weight (hectograms to kg)
  const heightInMeters = (height / 10).toFixed(1);
  const weightInKg = (weight / 10).toFixed(1);

  return (
    <div className="pokemon-detail" style={{ '--detail-color': primaryColor } as React.CSSProperties}>
      <div className="pokemon-detail__header">
        <div className="pokemon-detail__image-container">
          <img
            src={currentSprite}
            alt={`${capitalizeName(name)}${showShiny ? ' (Shiny)' : ''}`}
            className="pokemon-detail__image"
          />
          {shinySprite && (
            <button
              className={`pokemon-detail__shiny-toggle ${showShiny ? 'pokemon-detail__shiny-toggle--active' : ''}`}
              onClick={() => setShowShiny(!showShiny)}
              aria-label={showShiny ? 'Show normal version' : 'Show shiny version'}
              title={showShiny ? 'Show normal version' : 'Show shiny version'}
            >
              ✨
            </button>
          )}
        </div>

        <div className="pokemon-detail__info">
          <span className="pokemon-detail__id">{formatPokemonId(id)}</span>
          <h2 className="pokemon-detail__name">{capitalizeName(name)}</h2>
          {genus && <span className="pokemon-detail__genus">{genus}</span>}
          <TypeBadgeList types={types.map((t) => t.type.name)} size="medium" />
        </div>
      </div>

      {flavorText && (
        <p className="pokemon-detail__description">{flavorText}</p>
      )}

      <div className="pokemon-detail__body">
        <div className="pokemon-detail__measurements">
          <div className="pokemon-detail__measurement">
            <span className="pokemon-detail__measurement-label">Height</span>
            <span className="pokemon-detail__measurement-value">{heightInMeters} m</span>
          </div>
          <div className="pokemon-detail__measurement">
            <span className="pokemon-detail__measurement-label">Weight</span>
            <span className="pokemon-detail__measurement-value">{weightInKg} kg</span>
          </div>
        </div>

        <div className="pokemon-detail__section">
          <h3 className="pokemon-detail__section-title">Base Stats</h3>
          <PokemonStats stats={stats} />
        </div>

        <div className="pokemon-detail__section">
          <h3 className="pokemon-detail__section-title">Abilities</h3>
          <ul className="pokemon-detail__abilities">
            {abilities.map((a) => (
              <li
                key={a.ability.name}
                className={`pokemon-detail__ability ${a.is_hidden ? 'pokemon-detail__ability--hidden' : ''}`}
              >
                {capitalizeName(a.ability.name.replace('-', ' '))}
                {a.is_hidden && <span className="pokemon-detail__ability-tag">Hidden</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PokemonDetailSkeleton() {
  return (
    <div className="pokemon-detail pokemon-detail--skeleton">
      <div className="pokemon-detail__header">
        <div className="pokemon-detail__image-container">
          <div className="skeleton skeleton--circle pokemon-detail__image-skeleton" />
        </div>
        <div className="pokemon-detail__info">
          <div className="skeleton skeleton--text" style={{ width: '60px' }} />
          <div className="skeleton skeleton--text" style={{ width: '150px', height: '32px' }} />
          <div className="skeleton skeleton--text" style={{ width: '100px' }} />
        </div>
      </div>
      <div className="pokemon-detail__body">
        <div className="skeleton skeleton--text" style={{ width: '100%', height: '60px' }} />
        <div className="skeleton skeleton--text" style={{ width: '100%', height: '150px' }} />
      </div>
    </div>
  );
}
