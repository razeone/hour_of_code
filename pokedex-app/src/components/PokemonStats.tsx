import type { PokemonStat } from '../types';
import './PokemonStats.css';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

// Stat name mappings for display
const STAT_NAMES: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

// Max stat value for percentage calculation (highest possible base stat is 255)
const MAX_STAT = 255;

export function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <div className="pokemon-stats">
      {stats.map((stat) => {
        const statName = STAT_NAMES[stat.stat.name] || stat.stat.name;
        const percentage = Math.min((stat.base_stat / MAX_STAT) * 100, 100);
        
        return (
          <div key={stat.stat.name} className="pokemon-stats__row">
            <span className="pokemon-stats__name">{statName}</span>
            <span className="pokemon-stats__value">{stat.base_stat}</span>
            <div className="pokemon-stats__bar-container">
              <div
                className="pokemon-stats__bar"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: getStatColor(stat.base_stat),
                }}
                role="progressbar"
                aria-valuenow={stat.base_stat}
                aria-valuemin={0}
                aria-valuemax={MAX_STAT}
                aria-label={`${statName}: ${stat.base_stat}`}
              />
            </div>
          </div>
        );
      })}
      <div className="pokemon-stats__total">
        <span className="pokemon-stats__name">Total</span>
        <span className="pokemon-stats__value pokemon-stats__value--total">
          {stats.reduce((sum, s) => sum + s.base_stat, 0)}
        </span>
        <div className="pokemon-stats__bar-container" />
      </div>
    </div>
  );
}

// Get color based on stat value
function getStatColor(value: number): string {
  if (value < 50) return '#F34444'; // Red - Low
  if (value < 80) return '#FF7F0F'; // Orange - Below average
  if (value < 100) return '#FFDD57'; // Yellow - Average
  if (value < 120) return '#A0E515'; // Light green - Good
  if (value < 150) return '#23CD5E'; // Green - Great
  return '#00C2B8'; // Teal - Excellent
}
