import { render, screen } from '../../test/testUtils';
import { PokemonCard } from '../PokemonCard';
import { mockPikachuCard, mockBulbasaurCard } from '../../test/mocks';

describe('PokemonCard', () => {
  it('renders pokemon name capitalized', () => {
    render(<PokemonCard pokemon={mockPikachuCard} />);
    
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('renders pokemon ID with leading zeros', () => {
    render(<PokemonCard pokemon={mockPikachuCard} />);
    
    expect(screen.getByText('#025')).toBeInTheDocument();
  });

  it('renders pokemon image with correct alt text', () => {
    render(<PokemonCard pokemon={mockPikachuCard} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Pikachu');
    expect(image).toHaveAttribute('src', mockPikachuCard.sprite);
  });

  it('renders pokemon types', () => {
    render(<PokemonCard pokemon={mockBulbasaurCard} />);
    
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<PokemonCard pokemon={mockPikachuCard} />);
    
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-label', 'View details for Pikachu');
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    const { user } = render(<PokemonCard pokemon={mockPikachuCard} onClick={handleClick} />);
    
    const card = screen.getByRole('button');
    await user.click(card);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockPikachuCard);
  });

  it('calls onClick when Enter key is pressed', async () => {
    const handleClick = jest.fn();
    const { user } = render(<PokemonCard pokemon={mockPikachuCard} onClick={handleClick} />);
    
    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard('{Enter}');
    
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(mockPikachuCard);
  });

  it('calls onClick when Space key is pressed', async () => {
    const handleClick = jest.fn();
    const { user } = render(<PokemonCard pokemon={mockPikachuCard} onClick={handleClick} />);
    
    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard(' ');
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders without onClick handler', () => {
    render(<PokemonCard pokemon={mockPikachuCard} />);
    
    const card = screen.getByRole('button');
    expect(card).toBeInTheDocument();
  });

  it('applies custom card color based on primary type', () => {
    render(<PokemonCard pokemon={mockPikachuCard} />);
    
    const card = screen.getByRole('button');
    // Electric type color
    expect(card).toHaveStyle({ '--card-color': '#F8D030' });
  });

  it('renders single type pokemon correctly', () => {
    render(<PokemonCard pokemon={mockPikachuCard} />);
    
    expect(screen.getByText('electric')).toBeInTheDocument();
    expect(screen.queryByText('poison')).not.toBeInTheDocument();
  });

  it('has lazy loading on image', () => {
    render(<PokemonCard pokemon={mockPikachuCard} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('loading', 'lazy');
  });
});
