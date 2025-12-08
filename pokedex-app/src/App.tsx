import { useState } from 'react';
import { usePokemonList, usePokemonSearch } from './hooks';
import { PokemonGrid, Pagination, ErrorBoundary, SearchBar, PokemonModal } from './components';
import type { PokemonCardData } from './types';
import './App.css';

const ITEMS_PER_PAGE = 20;

function App() {
  const { pokemon, loading, error, totalCount, loadPage, currentPage } = usePokemonList();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);
  
  // Global search hook
  const { results: searchResults, loading: searchLoading, error: searchError } = usePokemonSearch(searchTerm);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    loadPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePokemonClick = (pokemon: PokemonCardData) => {
    setSelectedPokemonId(pokemon.id);
  };

  const handleCloseModal = () => {
    setSelectedPokemonId(null);
  };

  // Determine what to display
  const isSearching = searchTerm.trim().length > 0;
  const displayPokemon = isSearching ? searchResults : pokemon;
  const displayLoading = isSearching ? searchLoading : loading;
  const displayError = isSearching ? searchError : error;

  // Show pagination only when not searching
  const showPagination = !isSearching && !loading && !error && pokemon.length > 0;

  return (
    <ErrorBoundary>
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Pokédex</h1>
          <p className="app-subtitle">Discover all Pokémon</p>
        </header>

        <main className="app-main">
          <div className="app-controls">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search Pokémon..."
            />
          </div>

          <PokemonGrid
            pokemon={displayPokemon}
            loading={displayLoading}
            error={displayError}
            onCardClick={handlePokemonClick}
            onRetry={() => isSearching ? setSearchTerm(searchTerm) : loadPage(currentPage)}
          />

          {showPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              disabled={loading}
            />
          )}
        </main>

        <footer className="app-footer">
          <p>Data from <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokéAPI</a></p>
        </footer>
      </div>

      <PokemonModal pokemonId={selectedPokemonId} onClose={handleCloseModal} />
    </ErrorBoundary>
  );
}

export default App;
