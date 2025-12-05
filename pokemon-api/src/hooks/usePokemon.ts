import { useState, useEffect, useCallback } from 'react';
import type {
  Pokemon,
  PokemonCardData,
  PokemonSpecies,
  EvolutionChain,
} from '../types';
import {
  fetchPokemonList,
  fetchPokemon,
  fetchPokemonCardData,
  fetchPokemonSpecies,
  fetchEvolutionChainByUrl,
  fetchPokemonType,
  extractIdFromUrl,
} from '../utils';

interface UsePokemonListResult {
  pokemon: PokemonCardData[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  loadPage: (page: number) => void;
  currentPage: number;
}

interface UsePokemonDetailResult {
  pokemon: Pokemon | null;
  species: PokemonSpecies | null;
  evolutionChain: EvolutionChain | null;
  loading: boolean;
  error: string | null;
}

interface UsePokemonByTypeResult {
  pokemon: PokemonCardData[];
  loading: boolean;
  error: string | null;
}

const ITEMS_PER_PAGE = 20;

/**
 * Hook for fetching paginated Pokemon list
 */
export function usePokemonList(initialPage: number = 1): UsePokemonListResult {
  const [pokemon, setPokemon] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const loadPage = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    setCurrentPage(page);

    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const listResponse = await fetchPokemonList(ITEMS_PER_PAGE, offset);
      setTotalCount(listResponse.count);

      const cardData = await fetchPokemonCardData(listResponse.results);
      setPokemon(cardData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch Pokemon');
      setPokemon([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPage(currentPage);
  }, []);

  return {
    pokemon,
    loading,
    error,
    totalCount,
    loadPage,
    currentPage,
  };
}

/**
 * Hook for fetching a single Pokemon with full details
 */
export function usePokemonDetail(idOrName: number | string | null): UsePokemonDetailResult {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idOrName) {
      setPokemon(null);
      setSpecies(null);
      setEvolutionChain(null);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch Pokemon data
        const pokemonData = await fetchPokemon(idOrName);
        setPokemon(pokemonData);

        // Fetch species data
        const speciesData = await fetchPokemonSpecies(idOrName);
        setSpecies(speciesData);

        // Fetch evolution chain
        if (speciesData.evolution_chain?.url) {
          const evoChain = await fetchEvolutionChainByUrl(speciesData.evolution_chain.url);
          setEvolutionChain(evoChain);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Pokemon details');
        setPokemon(null);
        setSpecies(null);
        setEvolutionChain(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [idOrName]);

  return {
    pokemon,
    species,
    evolutionChain,
    loading,
    error,
  };
}

/**
 * Hook for fetching Pokemon filtered by type
 */
export function usePokemonByType(typeName: string | null): UsePokemonByTypeResult {
  const [pokemon, setPokemon] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!typeName) {
      setPokemon([]);
      return;
    }

    const fetchByType = async () => {
      setLoading(true);
      setError(null);

      try {
        const typeData = await fetchPokemonType(typeName);
        
        // Limit to first 20 Pokemon of this type to avoid too many requests
        const limitedPokemon = typeData.pokemon.slice(0, ITEMS_PER_PAGE);
        
        const cardDataPromises = limitedPokemon.map(async (p) => {
          const id = extractIdFromUrl(p.pokemon.url);
          const pokemonData = await fetchPokemon(id);
          return {
            id: pokemonData.id,
            name: pokemonData.name,
            sprite:
              pokemonData.sprites.other?.['official-artwork']?.front_default ||
              pokemonData.sprites.front_default ||
              '',
            types: pokemonData.types.map((t) => t.type.name),
          };
        });

        const cardData = await Promise.all(cardDataPromises);
        setPokemon(cardData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Pokemon by type');
        setPokemon([]);
      } finally {
        setLoading(false);
      }
    };

    fetchByType();
  }, [typeName]);

  return {
    pokemon,
    loading,
    error,
  };
}

interface NamedResource {
  name: string;
  url: string;
}

/**
 * Hook for searching Pokemon by name globally
 * Fetches all Pokemon names once, then filters and fetches details for matches
 */
export function usePokemonSearch(searchTerm: string): {
  results: PokemonCardData[];
  loading: boolean;
  error: string | null;
} {
  const [allPokemonNames, setAllPokemonNames] = useState<NamedResource[]>([]);
  const [results, setResults] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all Pokemon names once (lightweight - just names and URLs)
  useEffect(() => {
    const fetchAllNames = async () => {
      try {
        // Fetch a large list of Pokemon names (first 1000 covers all)
        const response = await fetchPokemonList(1000, 0);
        setAllPokemonNames(response.results);
      } catch (err) {
        console.error('Failed to fetch Pokemon names:', err);
      }
    };
    fetchAllNames();
  }, []);

  // Search and fetch matching Pokemon
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const searchPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const lowerSearch = searchTerm.toLowerCase();
        
        // Filter names that match the search
        const matches = allPokemonNames
          .filter((p) => p.name.toLowerCase().includes(lowerSearch))
          .slice(0, 20); // Limit to 20 results

        if (matches.length === 0) {
          setResults([]);
          setLoading(false);
          return;
        }

        // Fetch full data for matching Pokemon
        const cardData = await fetchPokemonCardData(matches);
        setResults(cardData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    searchPokemon();
  }, [searchTerm, allPokemonNames]);

  return { results, loading, error };
}
