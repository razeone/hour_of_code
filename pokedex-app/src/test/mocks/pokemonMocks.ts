import type {
  Pokemon,
  PokemonCardData,
  PokemonListResponse,
  PokemonSpecies,
  EvolutionChain,
} from '../../types';

// ============================================
// Mock PokemonCardData (simplified card view)
// ============================================

export const mockPikachuCard: PokemonCardData = {
  id: 25,
  name: 'pikachu',
  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
  types: ['electric'],
};

export const mockBulbasaurCard: PokemonCardData = {
  id: 1,
  name: 'bulbasaur',
  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  types: ['grass', 'poison'],
};

export const mockCharmanderCard: PokemonCardData = {
  id: 4,
  name: 'charmander',
  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
  types: ['fire'],
};

export const mockSquirtleCard: PokemonCardData = {
  id: 7,
  name: 'squirtle',
  sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
  types: ['water'],
};

export const mockPokemonCardList: PokemonCardData[] = [
  mockBulbasaurCard,
  mockCharmanderCard,
  mockSquirtleCard,
  mockPikachuCard,
];

// ============================================
// Mock Full Pokemon Data (API response)
// ============================================

export const mockPikachu: Pokemon = {
  id: 25,
  name: 'pikachu',
  base_experience: 112,
  height: 4,
  weight: 60,
  is_default: true,
  order: 35,
  abilities: [
    {
      ability: { name: 'static', url: 'https://pokeapi.co/api/v2/ability/9/' },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: { name: 'lightning-rod', url: 'https://pokeapi.co/api/v2/ability/31/' },
      is_hidden: true,
      slot: 3,
    },
  ],
  types: [
    {
      slot: 1,
      type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' },
    },
  ],
  stats: [
    { base_stat: 35, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
    { base_stat: 55, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } },
    { base_stat: 40, effort: 0, stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' } },
    { base_stat: 50, effort: 0, stat: { name: 'special-attack', url: 'https://pokeapi.co/api/v2/stat/4/' } },
    { base_stat: 50, effort: 0, stat: { name: 'special-defense', url: 'https://pokeapi.co/api/v2/stat/5/' } },
    { base_stat: 90, effort: 2, stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' } },
  ],
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png',
    front_female: null,
    front_shiny_female: null,
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
    back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png',
    back_female: null,
    back_shiny_female: null,
    other: {
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/25.png',
      },
    },
  },
  species: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon-species/25/' },
};

// ============================================
// Mock Pokemon List Response
// ============================================

export const mockPokemonListResponse: PokemonListResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
    { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    { name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/' },
    { name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/' },
    { name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/' },
  ],
};

// ============================================
// Mock Pokemon Species
// ============================================

export const mockPikachuSpecies: PokemonSpecies = {
  id: 25,
  name: 'pikachu',
  evolution_chain: {
    url: 'https://pokeapi.co/api/v2/evolution-chain/10/',
  },
  flavor_text_entries: [
    {
      flavor_text: 'When several of these POKéMON gather, their electricity could build and cause lightning storms.',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
      version: { name: 'red', url: 'https://pokeapi.co/api/v2/version/1/' },
    },
  ],
  genera: [
    {
      genus: 'Mouse Pokémon',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
};

// ============================================
// Mock Evolution Chain
// ============================================

export const mockPikachuEvolutionChain: EvolutionChain = {
  id: 10,
  chain: {
    is_baby: false,
    species: { name: 'pichu', url: 'https://pokeapi.co/api/v2/pokemon-species/172/' },
    evolution_details: [],
    evolves_to: [
      {
        is_baby: false,
        species: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon-species/25/' },
        evolution_details: [
          {
            min_level: null,
            trigger: { name: 'level-up', url: 'https://pokeapi.co/api/v2/evolution-trigger/1/' },
            item: null,
          },
        ],
        evolves_to: [
          {
            is_baby: false,
            species: { name: 'raichu', url: 'https://pokeapi.co/api/v2/pokemon-species/26/' },
            evolution_details: [
              {
                min_level: null,
                trigger: { name: 'use-item', url: 'https://pokeapi.co/api/v2/evolution-trigger/3/' },
                item: { name: 'thunder-stone', url: 'https://pokeapi.co/api/v2/item/83/' },
              },
            ],
            evolves_to: [],
          },
        ],
      },
    ],
  },
};
