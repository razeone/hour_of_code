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
    render(<Pagination {...defaultProps} totalPages={4} currentPage={2} />);
    
    // Use getAllByText for numbers that might appear in quick jumps too
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
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

  describe('Quick Jump Buttons', () => {
    it('shows quick jump buttons for milestones ahead of current page', () => {
      render(<Pagination {...defaultProps} currentPage={1} totalPages={100} />);
      
      expect(screen.getByText('Jump to:')).toBeInTheDocument();
      expect(screen.getByTitle('Go to page 5')).toBeInTheDocument();
      expect(screen.getByTitle('Go to page 10')).toBeInTheDocument();
      expect(screen.getByTitle('Go to page 25')).toBeInTheDocument();
      expect(screen.getByTitle('Go to page 50')).toBeInTheDocument();
    });

    it('calls onPageChange when quick jump button is clicked', async () => {
      const onPageChange = jest.fn();
      const { user } = render(
        <Pagination {...defaultProps} currentPage={1} totalPages={100} onPageChange={onPageChange} />
      );
      
      await user.click(screen.getByTitle('Go to page 25'));
      
      expect(onPageChange).toHaveBeenCalledWith(25);
    });

    it('shows back jumps when on higher page', () => {
      render(<Pagination {...defaultProps} currentPage={30} totalPages={100} />);
      
      // Should show milestone behind (10) and ahead (50)
      expect(screen.getByTitle('Go to page 10')).toBeInTheDocument();
      expect(screen.getByTitle('Go to page 50')).toBeInTheDocument();
    });

    it('does not show quick jumps when no valid milestones exist', () => {
      render(<Pagination {...defaultProps} currentPage={1} totalPages={4} />);
      
      expect(screen.queryByText('Jump to:')).not.toBeInTheDocument();
    });
  });

  describe('Go to Page', () => {
    it('shows go to page toggle button', () => {
      render(<Pagination {...defaultProps} />);
      
      expect(screen.getByLabelText('Go to specific page')).toBeInTheDocument();
    });

    it('shows go to input when toggle is clicked', async () => {
      const { user } = render(<Pagination {...defaultProps} />);
      
      await user.click(screen.getByLabelText('Go to specific page'));
      
      expect(screen.getByLabelText('Go to page:')).toBeInTheDocument();
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });

    it('navigates to entered page on submit', async () => {
      const onPageChange = jest.fn();
      const { user } = render(
        <Pagination {...defaultProps} onPageChange={onPageChange} />
      );
      
      await user.click(screen.getByLabelText('Go to specific page'));
      await user.type(screen.getByRole('spinbutton'), '7');
      await user.click(screen.getByText('Go'));
      
      expect(onPageChange).toHaveBeenCalledWith(7);
    });

    it('hides go to input after navigation', async () => {
      const { user } = render(<Pagination {...defaultProps} />);
      
      await user.click(screen.getByLabelText('Go to specific page'));
      await user.type(screen.getByRole('spinbutton'), '5');
      await user.click(screen.getByText('Go'));
      
      expect(screen.queryByLabelText('Go to page:')).not.toBeInTheDocument();
    });
  });

  describe('Page Info', () => {
    it('shows current page info', () => {
      render(<Pagination {...defaultProps} currentPage={5} totalPages={10} />);
      
      expect(screen.getByText('Page 5 of 10')).toBeInTheDocument();
    });
  });
});
