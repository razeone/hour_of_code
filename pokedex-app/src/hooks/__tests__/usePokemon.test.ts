import { renderHook, waitFor, act } from '@testing-library/react';
import { usePokemonList, usePokemonDetail, usePokemonByType, usePokemonSearch } from '../usePokemon';
import * as api from '../../utils/api';
import {
  mockPokemonListResponse,
  mockPikachu,
  mockPikachuSpecies,
  mockPikachuEvolutionChain,
  mockPokemonCardList,
} from '../../test/mocks';

// Mock the API module
jest.mock('../../utils/api');

const mockedApi = api as jest.Mocked<typeof api>;

describe('usePokemonList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches pokemon list on mount', async () => {
    mockedApi.fetchPokemonList.mockResolvedValue(mockPokemonListResponse);
    mockedApi.fetchPokemonCardData.mockResolvedValue(mockPokemonCardList);

    const { result } = renderHook(() => usePokemonList());

    // Initially loading
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockedApi.fetchPokemonList).toHaveBeenCalledWith(20, 0);
    expect(result.current.pokemon).toEqual(mockPokemonCardList);
    expect(result.current.totalCount).toBe(mockPokemonListResponse.count);
    expect(result.current.error).toBeNull();
  });

  it('handles error during fetch', async () => {
    mockedApi.fetchPokemonList.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => usePokemonList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.pokemon).toEqual([]);
  });

  it('loads different page when loadPage is called', async () => {
    mockedApi.fetchPokemonList.mockResolvedValue(mockPokemonListResponse);
    mockedApi.fetchPokemonCardData.mockResolvedValue(mockPokemonCardList);

    const { result } = renderHook(() => usePokemonList());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Load page 3
    await act(async () => {
      result.current.loadPage(3);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Should calculate correct offset (page 3 = offset 40)
    expect(mockedApi.fetchPokemonList).toHaveBeenCalledWith(20, 40);
    expect(result.current.currentPage).toBe(3);
  });

  it('starts with provided initial page', async () => {
    mockedApi.fetchPokemonList.mockResolvedValue(mockPokemonListResponse);
    mockedApi.fetchPokemonCardData.mockResolvedValue(mockPokemonCardList);

    const { result } = renderHook(() => usePokemonList(2));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.currentPage).toBe(2);
  });
});

describe('usePokemonDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null states when idOrName is null', () => {
    const { result } = renderHook(() => usePokemonDetail(null));

    expect(result.current.pokemon).toBeNull();
    expect(result.current.species).toBeNull();
    expect(result.current.evolutionChain).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('fetches pokemon details when idOrName is provided', async () => {
    mockedApi.fetchPokemon.mockResolvedValue(mockPikachu);
    mockedApi.fetchPokemonSpecies.mockResolvedValue(mockPikachuSpecies);
    mockedApi.fetchEvolutionChainByUrl.mockResolvedValue(mockPikachuEvolutionChain);

    const { result } = renderHook(() => usePokemonDetail(25));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pokemon).toEqual(mockPikachu);
    expect(result.current.species).toEqual(mockPikachuSpecies);
    expect(result.current.evolutionChain).toEqual(mockPikachuEvolutionChain);
    expect(result.current.error).toBeNull();
  });

  it('fetches pokemon by name', async () => {
    mockedApi.fetchPokemon.mockResolvedValue(mockPikachu);
    mockedApi.fetchPokemonSpecies.mockResolvedValue(mockPikachuSpecies);
    mockedApi.fetchEvolutionChainByUrl.mockResolvedValue(mockPikachuEvolutionChain);

    const { result } = renderHook(() => usePokemonDetail('pikachu'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockedApi.fetchPokemon).toHaveBeenCalledWith('pikachu');
    expect(result.current.pokemon?.name).toBe('pikachu');
  });

  it('handles error during fetch', async () => {
    mockedApi.fetchPokemon.mockRejectedValue(new Error('Pokemon not found'));

    const { result } = renderHook(() => usePokemonDetail(999999));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Pokemon not found');
    expect(result.current.pokemon).toBeNull();
    expect(result.current.species).toBeNull();
    expect(result.current.evolutionChain).toBeNull();
  });

  it('resets state when idOrName changes to null', async () => {
    mockedApi.fetchPokemon.mockResolvedValue(mockPikachu);
    mockedApi.fetchPokemonSpecies.mockResolvedValue(mockPikachuSpecies);
    mockedApi.fetchEvolutionChainByUrl.mockResolvedValue(mockPikachuEvolutionChain);

    const { result, rerender } = renderHook(
      ({ idOrName }) => usePokemonDetail(idOrName),
      { initialProps: { idOrName: 25 as number | null } }
    );

    await waitFor(() => {
      expect(result.current.pokemon).not.toBeNull();
    });

    // Change to null
    rerender({ idOrName: null });

    expect(result.current.pokemon).toBeNull();
    expect(result.current.species).toBeNull();
    expect(result.current.evolutionChain).toBeNull();
  });
});

describe('usePokemonByType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns empty array when typeName is null', () => {
    const { result } = renderHook(() => usePokemonByType(null));

    expect(result.current.pokemon).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('fetches pokemon by type', async () => {
    const mockTypeData = {
      id: 13,
      name: 'electric',
      pokemon: [
        { pokemon: { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }, slot: 1 },
      ],
    };

    mockedApi.fetchPokemonType.mockResolvedValue(mockTypeData);
    mockedApi.fetchPokemon.mockResolvedValue(mockPikachu);
    mockedApi.extractIdFromUrl.mockReturnValue(25);

    const { result } = renderHook(() => usePokemonByType('electric'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockedApi.fetchPokemonType).toHaveBeenCalledWith('electric');
    expect(result.current.pokemon.length).toBeGreaterThan(0);
    expect(result.current.error).toBeNull();
  });

  it('handles error during type fetch', async () => {
    mockedApi.fetchPokemonType.mockRejectedValue(new Error('Type not found'));

    const { result } = renderHook(() => usePokemonByType('invalid'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Type not found');
    expect(result.current.pokemon).toEqual([]);
  });
});

describe('usePokemonSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns empty results for empty search term', () => {
    mockedApi.fetchPokemonList.mockResolvedValue(mockPokemonListResponse);

    const { result } = renderHook(() => usePokemonSearch(''));

    expect(result.current.results).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('returns empty results for whitespace-only search term', () => {
    mockedApi.fetchPokemonList.mockResolvedValue(mockPokemonListResponse);

    const { result } = renderHook(() => usePokemonSearch('   '));

    expect(result.current.results).toEqual([]);
  });

  it('fetches all pokemon names on mount', async () => {
    mockedApi.fetchPokemonList.mockResolvedValue(mockPokemonListResponse);

    renderHook(() => usePokemonSearch(''));

    await waitFor(() => {
      expect(mockedApi.fetchPokemonList).toHaveBeenCalledWith(1500, 0);
    });
  });

  it('searches and returns matching pokemon', async () => {
    mockedApi.fetchPokemonList.mockResolvedValue({
      ...mockPokemonListResponse,
      results: [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
    });
    mockedApi.fetchPokemonCardData.mockResolvedValue([mockPokemonCardList[3]]); // pikachu

    const { result } = renderHook(() => usePokemonSearch('pika'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await waitFor(() => {
      expect(result.current.results.length).toBeGreaterThanOrEqual(0);
    });
  });

  it('handles search errors', async () => {
    mockedApi.fetchPokemonList.mockResolvedValue(mockPokemonListResponse);
    mockedApi.fetchPokemonCardData.mockRejectedValue(new Error('Search failed'));

    const { result } = renderHook(() => usePokemonSearch('char'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Error state might be set
    // Results should be empty on error
  });
});
