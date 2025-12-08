import { render, screen } from '../../test/testUtils';
import { PokemonModal } from '../PokemonModal';
import * as hooks from '../../hooks';
import { mockPikachu, mockPikachuSpecies, mockPikachuEvolutionChain } from '../../test/mocks';

// Mock the hooks module
jest.mock('../../hooks', () => ({
  ...jest.requireActual('../../hooks'),
  usePokemonDetail: jest.fn(),
}));

const mockedHooks = hooks as jest.Mocked<typeof hooks>;

describe('PokemonModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementation
    mockedHooks.usePokemonDetail.mockReturnValue({
      pokemon: mockPikachu,
      species: mockPikachuSpecies,
      evolutionChain: mockPikachuEvolutionChain,
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders nothing when pokemonId is null', () => {
    const { container } = render(<PokemonModal pokemonId={null} onClose={jest.fn()} />);

    expect(container.firstChild).toBeNull();
  });

  it('renders modal when pokemonId is provided', () => {
    render(<PokemonModal pokemonId={25} onClose={jest.fn()} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders pokemon details', () => {
    render(<PokemonModal pokemonId={25} onClose={jest.fn()} />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('#025')).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(<PokemonModal pokemonId={25} onClose={jest.fn()} />);

    expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn();
    const { user } = render(<PokemonModal pokemonId={25} onClose={onClose} />);

    await user.click(screen.getByLabelText('Close modal'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', async () => {
    const onClose = jest.fn();
    const { user } = render(<PokemonModal pokemonId={25} onClose={onClose} />);

    // Click on overlay (the dialog backdrop)
    const overlay = document.querySelector('.pokemon-modal__overlay');
    if (overlay) {
      await user.click(overlay);
    }

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal content is clicked', async () => {
    const onClose = jest.fn();
    const { user } = render(<PokemonModal pokemonId={25} onClose={onClose} />);

    // Click on modal content (not overlay)
    await user.click(screen.getByText('Pikachu'));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', async () => {
    const onClose = jest.fn();
    const { user } = render(<PokemonModal pokemonId={25} onClose={onClose} />);

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('prevents body scroll when open', () => {
    render(<PokemonModal pokemonId={25} onClose={jest.fn()} />);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    const { unmount } = render(<PokemonModal pokemonId={25} onClose={jest.fn()} />);

    unmount();

    expect(document.body.style.overflow).toBe('');
  });

  it('renders error state when fetch fails', () => {
    mockedHooks.usePokemonDetail.mockReturnValue({
      pokemon: null,
      species: null,
      evolutionChain: null,
      loading: false,
      error: 'Failed to fetch',
    });

    render(<PokemonModal pokemonId={999} onClose={jest.fn()} />);

    expect(screen.getByText('Failed to load Pokémon details')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    mockedHooks.usePokemonDetail.mockReturnValue({
      pokemon: null,
      species: null,
      evolutionChain: null,
      loading: true,
      error: null,
    });

    render(<PokemonModal pokemonId={25} onClose={jest.fn()} />);

    // Should show skeleton
    const skeleton = document.querySelector('.pokemon-detail--skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<PokemonModal pokemonId={25} onClose={jest.fn()} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });
});
