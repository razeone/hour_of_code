import { render, screen } from '../../test/testUtils';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination navigation', () => {
    render(<Pagination {...defaultProps} />);
    
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Pagination');
  });

  it('renders previous and next buttons', () => {
    render(<Pagination {...defaultProps} />);
    
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />);
    
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('enables both buttons on middle page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
    expect(screen.getByLabelText('Next page')).not.toBeDisabled();
  });

  it('calls onPageChange when previous is clicked', async () => {
    const onPageChange = jest.fn();
    const { user } = render(
      <Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />
    );
    
    await user.click(screen.getByLabelText('Previous page'));
    
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('calls onPageChange when next is clicked', async () => {
    const onPageChange = jest.fn();
    const { user } = render(
      <Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />
    );
    
    await user.click(screen.getByLabelText('Next page'));
    
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it('calls onPageChange when page number is clicked', async () => {
    const onPageChange = jest.fn();
    const { user } = render(
      <Pagination {...defaultProps} currentPage={1} onPageChange={onPageChange} />
    );
    
    // When on page 1 with 10 pages, page 2 should be visible
    await user.click(screen.getByText('2'));
    
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('marks current page with aria-current', () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
    expect(currentPageButton).toHaveClass('pagination__button--active');
  });

  it('does not render when totalPages is 1', () => {
    const { container } = render(<Pagination {...defaultProps} totalPages={1} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('does not render when totalPages is 0', () => {
    const { container } = render(<Pagination {...defaultProps} totalPages={0} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('shows all pages when totalPages <= 5', () => {
    render(<Pagination {...defaultProps} totalPages={5} currentPage={3} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows ellipsis when there are many pages', () => {
    render(<Pagination {...defaultProps} totalPages={20} currentPage={10} />);
    
    // Should show: 1 ... 9 10 11 ... 20
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    
    // Should have ellipsis
    const ellipses = screen.getAllByText('...');
    expect(ellipses.length).toBeGreaterThanOrEqual(1);
  });

  it('disables all buttons when disabled prop is true', () => {
    render(<Pagination {...defaultProps} currentPage={5} disabled={true} />);
    
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(screen.getByLabelText('Next page')).toBeDisabled();
    expect(screen.getByText('5')).toBeDisabled();
  });

  it('does not call onPageChange when disabled and clicked', async () => {
    const onPageChange = jest.fn();
    const { user } = render(
      <Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} disabled={true} />
    );
    
    // When disabled, page 3 button should be disabled and not trigger click
    const pageButton = screen.getByText('4');
    await user.click(pageButton);
    
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
