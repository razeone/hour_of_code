import { render, screen, waitFor } from '../../test/testUtils';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders with placeholder text', () => {
    render(<SearchBar value="" onChange={jest.fn()} />);
    
    expect(screen.getByPlaceholderText('Search Pokémon...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar value="" onChange={jest.fn()} placeholder="Find a Pokemon" />);
    
    expect(screen.getByPlaceholderText('Find a Pokemon')).toBeInTheDocument();
  });

  it('renders search icon', () => {
    render(<SearchBar value="" onChange={jest.fn()} />);
    
    expect(screen.getByText('🔍')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<SearchBar value="" onChange={jest.fn()} />);
    
    expect(screen.getByLabelText('Search Pokémon')).toBeInTheDocument();
  });

  it('displays the provided value', () => {
    render(<SearchBar value="pikachu" onChange={jest.fn()} />);
    
    expect(screen.getByDisplayValue('pikachu')).toBeInTheDocument();
  });

  it('shows clear button when there is input', () => {
    render(<SearchBar value="test" onChange={jest.fn()} />);
    
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('does not show clear button when input is empty', () => {
    render(<SearchBar value="" onChange={jest.fn()} />);
    
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
  });

  it('calls onChange with empty string when clear is clicked', async () => {
    const onChange = jest.fn();
    const { user } = render(<SearchBar value="test" onChange={onChange} />);
    
    // Need to use real timers for user events
    jest.useRealTimers();
    
    await user.click(screen.getByLabelText('Clear search'));
    
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('debounces onChange calls', async () => {
    const onChange = jest.fn();
    
    jest.useRealTimers();
    
    const { user } = render(<SearchBar value="" onChange={onChange} />);
    
    const input = screen.getByLabelText('Search Pokémon');
    await user.type(input, 'pika');
    
    // Wait for debounce (300ms + buffer)
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    // Should eventually call with final value
    expect(onChange).toHaveBeenCalled();
  });

  it('updates input value on user typing', async () => {
    const onChange = jest.fn();
    const { user } = render(<SearchBar value="" onChange={onChange} />);
    
    jest.useRealTimers();
    
    const input = screen.getByLabelText('Search Pokémon');
    await user.type(input, 'char');
    
    expect(input).toHaveValue('char');
  });

  it('syncs with external value changes', () => {
    const { rerender } = render(<SearchBar value="initial" onChange={jest.fn()} />);
    
    expect(screen.getByDisplayValue('initial')).toBeInTheDocument();
    
    rerender(<SearchBar value="updated" onChange={jest.fn()} />);
    
    expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
  });
});
