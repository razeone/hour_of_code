import { render, screen } from '../../test/testUtils';
import { PokemonDetail } from '../PokemonDetail';
import { mockPikachu, mockPikachuSpecies } from '../../test/mocks';

describe('PokemonDetail', () => {
  it('renders pokemon name', () => {
    render(<PokemonDetail pokemon={mockPikachu} species={mockPikachuSpecies} />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('renders pokemon ID with formatting', () => {
    render(<PokemonDetail pokemon={mockPikachu} species={mockPikachuSpecies} />);

    expect(screen.getByText('#025')).toBeInTheDocument();
  });

  it('renders pokemon image', () => {
    render(<PokemonDetail pokemon={mockPikachu} species={mockPikachuSpecies} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Pikachu');
    expect(image).toHaveAttribute('src', expect.stringContaining('official-artwork'));
  });

  it('renders pokemon types', () => {
    render(<PokemonDetail pokemon={mockPikachu} species={mockPikachuSpecies} />);

    expect(screen.getByText('electric')).toBeInTheDocument();
  });

  it('renders height and weight', () => {
    render(<PokemonDetail pokemon={mockPikachu} species={mockPikachuSpecies} />);

    // Pikachu: height 4 (decimeters) = 0.4m, weight 60 (hectograms) = 6.0kg
    expect(screen.getByText('0.4 m')).toBeInTheDocument();
    expect(screen.getByText('6.0 kg')).toBeInTheDocument();
  });

  it('renders abilities', () => {
    render(<PokemonDetail pokemon={mockPikachu} species={mockPikachuSpecies} />);

    expect(screen.getByText(/static/i)).toBeInTheDocument();
    expect(screen.getByText(/lightning rod/i)).toBeInTheDocument();
  });

  it('marks hidden ability', () => {
    render(<PokemonDetail pokemon={mockPikachu} species={mockPikachuSpecies} />);

    expect(screen.getByText('Hidden')).toBeInTheDocument();
  });

  it('renders stats section', () => {
    render(<PokemonDetail pokemon={mockPikachu} species={mockPikachuSpecies} />);

    expect(screen.getByText('Base Stats')).toBeInTheDocument();
    expect(screen.getByText('HP')).toBeInTheDocument();
  });

  it('renders genus when species is provided', () => {
    render(<PokemonDetail pokemon={mockPikachu} species={mockPikachuSpecies} />);

    expect(screen.getByText('Mouse Pokémon')).toBeInTheDocument();
  });

  it('renders flavor text when species is provided', () => {
    render(<PokemonDetail pokemon={mockPikachu} species={mockPikachuSpecies} />);

    expect(screen.getByText(/lightning storms/i)).toBeInTheDocument();
  });

  it('renders without species data', () => {
    render(<PokemonDetail pokemon={mockPikachu} species={null} />);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    // Genus and flavor text should not be present
    expect(screen.queryByText('Mouse Pokémon')).not.toBeInTheDocument();
  });

  it('renders shiny toggle button when shiny sprite available', () => {
    render(<PokemonDetail pokemon={mockPikachu} species={mockPikachuSpecies} />);

    const shinyToggle = screen.getByLabelText('Show shiny version');
    expect(shinyToggle).toBeInTheDocument();
  });

  it('toggles shiny sprite when button clicked', async () => {
    const { user } = render(<PokemonDetail pokemon={mockPikachu} species={mockPikachuSpecies} />);

    const shinyToggle = screen.getByLabelText('Show shiny version');
    await user.click(shinyToggle);

    // After click, label should change
    expect(screen.getByLabelText('Show normal version')).toBeInTheDocument();
    
    // Image alt should indicate shiny
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Pikachu (Shiny)');
  });

  it('renders loading skeleton when loading', () => {
    render(<PokemonDetail pokemon={mockPikachu} species={null} loading={true} />);

    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    // Should have skeleton class
    const skeleton = document.querySelector('.pokemon-detail--skeleton');
    expect(skeleton).toBeInTheDocument();
  });
});
