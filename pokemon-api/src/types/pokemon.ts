// Base API response types
export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

// Pokemon types
export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

// Pokemon abilities
export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

// Pokemon stats
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

// Pokemon sprites
export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  other?: {
    dream_world?: {
      front_default: string | null;
      front_female: string | null;
    };
    home?: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    'official-artwork'?: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

// Main Pokemon interface
export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  is_default: boolean;
  order: number;
  abilities: PokemonAbility[];
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
  species: NamedAPIResource;
}

// Pokemon Species (for evolution chain)
export interface PokemonSpecies {
  id: number;
  name: string;
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: {
    flavor_text: string;
    language: NamedAPIResource;
    version: NamedAPIResource;
  }[];
  genera: {
    genus: string;
    language: NamedAPIResource;
  }[];
}

// Evolution chain types
export interface EvolutionDetail {
  min_level: number | null;
  trigger: NamedAPIResource;
  item: NamedAPIResource | null;
}

export interface ChainLink {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionChain {
  id: number;
  chain: ChainLink;
}

// Type information (for filtering)
export interface TypePokemon {
  pokemon: NamedAPIResource;
  slot: number;
}

export interface PokemonTypeInfo {
  id: number;
  name: string;
  pokemon: TypePokemon[];
}

// Simplified Pokemon for cards (derived from API data)
export interface PokemonCardData {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}
