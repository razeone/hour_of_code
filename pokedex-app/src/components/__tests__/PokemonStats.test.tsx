import { render, screen } from '../../test/testUtils';
import { PokemonStats } from '../PokemonStats';
import { mockPikachu } from '../../test/mocks';

describe('PokemonStats', () => {
  const defaultProps = {
    stats: mockPikachu.stats,
  };

  it('renders all six stats', () => {
    render(<PokemonStats {...defaultProps} />);

    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('Attack')).toBeInTheDocument();
    expect(screen.getByText('Defense')).toBeInTheDocument();
    expect(screen.getByText('Sp. Atk')).toBeInTheDocument();
    expect(screen.getByText('Sp. Def')).toBeInTheDocument();
    expect(screen.getByText('Speed')).toBeInTheDocument();
  });

  it('displays stat values correctly', () => {
    render(<PokemonStats {...defaultProps} />);

    // Pikachu's stats from mock
    expect(screen.getByText('35')).toBeInTheDocument(); // HP
    expect(screen.getByText('55')).toBeInTheDocument(); // Attack
    expect(screen.getByText('40')).toBeInTheDocument(); // Defense
    expect(screen.getByText('90')).toBeInTheDocument(); // Speed
  });

  it('calculates and displays total stats', () => {
    render(<PokemonStats {...defaultProps} />);

    expect(screen.getByText('Total')).toBeInTheDocument();
    // Sum of Pikachu's stats: 35 + 55 + 40 + 50 + 50 + 90 = 320
    expect(screen.getByText('320')).toBeInTheDocument();
  });

  it('renders progress bars with correct aria attributes', () => {
    render(<PokemonStats {...defaultProps} />);

    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBe(6);

    // Check first progress bar (HP)
    const hpBar = progressBars[0];
    expect(hpBar).toHaveAttribute('aria-valuenow', '35');
    expect(hpBar).toHaveAttribute('aria-valuemin', '0');
    expect(hpBar).toHaveAttribute('aria-valuemax', '255');
  });

  it('renders stat bars with width based on stat value', () => {
    render(<PokemonStats {...defaultProps} />);

    const progressBars = screen.getAllByRole('progressbar');
    // HP stat is 35, max is 255, so width should be ~13.7%
    const hpBar = progressBars[0];
    // Check that the bar has a width style set
    expect(hpBar.style.width).toMatch(/\d+(\.\d+)?%/);
  });

  it('handles empty stats array', () => {
    render(<PokemonStats stats={[]} />);

    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
