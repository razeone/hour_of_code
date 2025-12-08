import { render, screen } from '../../test/testUtils';
import { TypeBadge, TypeBadgeList } from '../TypeBadge';

describe('TypeBadge', () => {
  it('renders the type name', () => {
    render(<TypeBadge type="electric" />);
    
    expect(screen.getByText('electric')).toBeInTheDocument();
  });

  it('applies the correct background color for known types', () => {
    render(<TypeBadge type="fire" />);
    
    const badge = screen.getByText('fire');
    expect(badge).toHaveStyle({ backgroundColor: '#F08030' });
  });

  it('applies default color for unknown types', () => {
    render(<TypeBadge type="unknown" />);
    
    const badge = screen.getByText('unknown');
    expect(badge).toHaveStyle({ backgroundColor: '#777' });
  });

  it('renders with small size class', () => {
    render(<TypeBadge type="water" size="small" />);
    
    const badge = screen.getByText('water');
    expect(badge).toHaveClass('type-badge--small');
  });

  it('renders with medium size class by default', () => {
    render(<TypeBadge type="grass" />);
    
    const badge = screen.getByText('grass');
    expect(badge).toHaveClass('type-badge--medium');
  });

  it('renders with large size class', () => {
    render(<TypeBadge type="psychic" size="large" />);
    
    const badge = screen.getByText('psychic');
    expect(badge).toHaveClass('type-badge--large');
  });

  it('is clickable when onClick is provided', async () => {
    const handleClick = jest.fn();
    const { user } = render(<TypeBadge type="dragon" onClick={handleClick} />);
    
    const badge = screen.getByText('dragon');
    expect(badge).toHaveClass('type-badge--clickable');
    expect(badge).toHaveAttribute('role', 'button');
    expect(badge).toHaveAttribute('tabIndex', '0');
    
    await user.click(badge);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard Enter key when clickable', async () => {
    const handleClick = jest.fn();
    const { user } = render(<TypeBadge type="ice" onClick={handleClick} />);
    
    const badge = screen.getByText('ice');
    badge.focus();
    
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not have button role when not clickable', () => {
    render(<TypeBadge type="normal" />);
    
    const badge = screen.getByText('normal');
    expect(badge).not.toHaveAttribute('role');
    expect(badge).not.toHaveAttribute('tabIndex');
  });
});

describe('TypeBadgeList', () => {
  it('renders multiple type badges', () => {
    render(<TypeBadgeList types={['grass', 'poison']} />);
    
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
  });

  it('renders empty when no types provided', () => {
    const { container } = render(<TypeBadgeList types={[]} />);
    
    const list = container.querySelector('.type-badge-list');
    expect(list).toBeInTheDocument();
    expect(list?.children).toHaveLength(0);
  });

  it('applies size to all badges', () => {
    render(<TypeBadgeList types={['fire', 'flying']} size="small" />);
    
    expect(screen.getByText('fire')).toHaveClass('type-badge--small');
    expect(screen.getByText('flying')).toHaveClass('type-badge--small');
  });
});
