import {
  extractIdFromUrl,
  formatPokemonId,
  capitalizeName,
  transformToPokemonCardData,
  POKEMON_TYPES,
  TYPE_COLORS,
} from '../api';
import { mockPikachu } from '../../test/mocks';

describe('extractIdFromUrl', () => {
  it('extracts ID from Pokemon URL', () => {
    expect(extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25);
  });

  it('extracts ID from URL without trailing slash', () => {
    expect(extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/1')).toBe(1);
  });

  it('extracts ID from species URL', () => {
    expect(extractIdFromUrl('https://pokeapi.co/api/v2/pokemon-species/25/')).toBe(25);
  });

  it('extracts large IDs', () => {
    expect(extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/10001/')).toBe(10001);
  });

  it('returns 0 for invalid URL', () => {
    expect(extractIdFromUrl('invalid-url')).toBe(0);
  });

  it('returns 0 for URL without ID', () => {
    expect(extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/')).toBe(0);
  });

  it('returns 0 for empty string', () => {
    expect(extractIdFromUrl('')).toBe(0);
  });
});

describe('formatPokemonId', () => {
  it('formats single digit ID with leading zeros', () => {
    expect(formatPokemonId(1)).toBe('#001');
  });

  it('formats double digit ID with leading zero', () => {
    expect(formatPokemonId(25)).toBe('#025');
  });

  it('formats triple digit ID without leading zeros', () => {
    expect(formatPokemonId(150)).toBe('#150');
  });

  it('formats four digit ID', () => {
    expect(formatPokemonId(1000)).toBe('#1000');
  });

  it('handles zero', () => {
    expect(formatPokemonId(0)).toBe('#000');
  });
});

describe('capitalizeName', () => {
  it('capitalizes first letter of lowercase name', () => {
    expect(capitalizeName('pikachu')).toBe('Pikachu');
  });

  it('handles already capitalized name', () => {
    expect(capitalizeName('Pikachu')).toBe('Pikachu');
  });

  it('handles all uppercase name', () => {
    expect(capitalizeName('PIKACHU')).toBe('PIKACHU');
  });

  it('handles single character', () => {
    expect(capitalizeName('a')).toBe('A');
  });

  it('handles empty string', () => {
    expect(capitalizeName('')).toBe('');
  });

  it('handles hyphenated names', () => {
    expect(capitalizeName('mr-mime')).toBe('Mr-mime');
  });
});

describe('transformToPokemonCardData', () => {
  it('transforms full Pokemon data to card data', () => {
    const cardData = transformToPokemonCardData(mockPikachu);

    expect(cardData).toEqual({
      id: 25,
      name: 'pikachu',
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      types: ['electric'],
    });
  });

  it('extracts all types for multi-type Pokemon', () => {
    const bulbasaur = {
      ...mockPikachu,
      id: 1,
      name: 'bulbasaur',
      types: [
        { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
        { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } },
      ],
    };

    const cardData = transformToPokemonCardData(bulbasaur);

    expect(cardData.types).toEqual(['grass', 'poison']);
  });

  it('uses official artwork as primary sprite', () => {
    const cardData = transformToPokemonCardData(mockPikachu);

    expect(cardData.sprite).toContain('official-artwork');
  });

  it('falls back to front_default if no official artwork', () => {
    const pokemonNoArtwork = {
      ...mockPikachu,
      sprites: {
        ...mockPikachu.sprites,
        other: undefined,
      },
    };

    const cardData = transformToPokemonCardData(pokemonNoArtwork);

    expect(cardData.sprite).toBe(mockPikachu.sprites.front_default);
  });

  it('returns empty string if no sprites available', () => {
    const pokemonNoSprites = {
      ...mockPikachu,
      sprites: {
        front_default: null,
        front_shiny: null,
        front_female: null,
        front_shiny_female: null,
        back_default: null,
        back_shiny: null,
        back_female: null,
        back_shiny_female: null,
        other: undefined,
      },
    };

    const cardData = transformToPokemonCardData(pokemonNoSprites);

    expect(cardData.sprite).toBe('');
  });
});

describe('POKEMON_TYPES', () => {
  it('contains 18 Pokemon types', () => {
    expect(POKEMON_TYPES).toHaveLength(18);
  });

  it('contains all main Pokemon types', () => {
    const expectedTypes = [
      'normal', 'fire', 'water', 'electric', 'grass', 'ice',
      'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
      'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
    ];

    expectedTypes.forEach((type) => {
      expect(POKEMON_TYPES).toContain(type);
    });
  });
});

describe('TYPE_COLORS', () => {
  it('has a color for each Pokemon type', () => {
    POKEMON_TYPES.forEach((type) => {
      expect(TYPE_COLORS[type]).toBeDefined();
      expect(TYPE_COLORS[type]).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it('has correct color for electric type', () => {
    expect(TYPE_COLORS.electric).toBe('#F8D030');
  });

  it('has correct color for fire type', () => {
    expect(TYPE_COLORS.fire).toBe('#F08030');
  });

  it('has correct color for water type', () => {
    expect(TYPE_COLORS.water).toBe('#6890F0');
  });
});
