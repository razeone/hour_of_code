import type {
  Pokemon,
  PokemonListResponse,
  PokemonSpecies,
  EvolutionChain,
  PokemonTypeInfo,
  PokemonCardData,
} from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

/**
 * Fetch paginated list of Pokemon
 */
export async function fetchPokemonList(
  limit: number = 20,
  offset: number = 0
): Promise<PokemonListResponse> {
  return fetchData<PokemonListResponse>(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
}

/**
 * Fetch a single Pokemon by ID or name
 */
export async function fetchPokemon(idOrName: number | string): Promise<Pokemon> {
  return fetchData<Pokemon>(`${BASE_URL}/pokemon/${idOrName}`);
}

/**
 * Fetch Pokemon species data (contains evolution chain URL)
 */
export async function fetchPokemonSpecies(idOrName: number | string): Promise<PokemonSpecies> {
  return fetchData<PokemonSpecies>(`${BASE_URL}/pokemon-species/${idOrName}`);
}

/**
 * Fetch evolution chain by ID
 */
export async function fetchEvolutionChain(id: number): Promise<EvolutionChain> {
  return fetchData<EvolutionChain>(`${BASE_URL}/evolution-chain/${id}`);
}

/**
 * Fetch evolution chain from URL
 */
export async function fetchEvolutionChainByUrl(url: string): Promise<EvolutionChain> {
  return fetchData<EvolutionChain>(url);
}

/**
 * Fetch Pokemon type info (for filtering by type)
 */
export async function fetchPokemonType(typeName: string): Promise<PokemonTypeInfo> {
  return fetchData<PokemonTypeInfo>(`${BASE_URL}/type/${typeName}`);
}

/**
 * Fetch multiple Pokemon and transform to card data
 */
export async function fetchPokemonCardData(
  pokemonList: { name: string; url: string }[]
): Promise<PokemonCardData[]> {
  const promises = pokemonList.map(async (p) => {
    const pokemon = await fetchPokemon(p.name);
    return transformToPokemonCardData(pokemon);
  });
  
  return Promise.all(promises);
}

/**
 * Transform full Pokemon data to simplified card data
 */
export function transformToPokemonCardData(pokemon: Pokemon): PokemonCardData {
  return {
    id: pokemon.id,
    name: pokemon.name,
    sprite:
      pokemon.sprites.other?.['official-artwork']?.front_default ||
      pokemon.sprites.front_default ||
      '',
    types: pokemon.types.map((t) => t.type.name),
  };
}

/**
 * Extract Pokemon ID from URL
 * e.g., "https://pokeapi.co/api/v2/pokemon/25/" -> 25
 */
export function extractIdFromUrl(url: string): number {
  const matches = url.match(/\/(\d+)\/?$/);
  return matches ? parseInt(matches[1], 10) : 0;
}

/**
 * Format Pokemon ID with leading zeros (e.g., #001, #025)
 */
export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, '0')}`;
}

/**
 * Capitalize first letter of Pokemon name
 */
export function capitalizeName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * All Pokemon types for filtering
 */
export const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const;

export type PokemonTypeName = (typeof POKEMON_TYPES)[number];

/**
 * Type colors for badges
 */
export const TYPE_COLORS: Record<PokemonTypeName, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};
