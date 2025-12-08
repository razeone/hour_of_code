import { useState } from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

// Quick jump milestones
const JUMP_MILESTONES = [5, 10, 25, 50, 100];

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  const [showGoTo, setShowGoTo] = useState(false);
  const [goToValue, setGoToValue] = useState('');

  const handlePrevious = () => {
    if (currentPage > 1 && !disabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !disabled) {
      onPageChange(currentPage + 1);
    }
  };

  const handleGoToSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(goToValue, 10);
    if (page >= 1 && page <= totalPages && !disabled) {
      onPageChange(page);
      setGoToValue('');
      setShowGoTo(false);
    }
  };

  // Get quick jump pages based on current position
  const getQuickJumps = (): number[] => {
    const jumps: number[] = [];
    
    // Add milestone pages that are ahead of current page
    for (const milestone of JUMP_MILESTONES) {
      if (milestone > currentPage && milestone <= totalPages) {
        jumps.push(milestone);
      }
    }

    // Also add some pages behind if we're far ahead
    if (currentPage > 10) {
      const backJumps = JUMP_MILESTONES
        .filter(m => m < currentPage && m >= 1)
        .slice(-2); // Take last 2 milestones behind us
      jumps.unshift(...backJumps);
    }

    return jumps.slice(0, 5); // Limit to 5 quick jumps
  };

  // Generate page numbers to display
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  const quickJumps = getQuickJumps();

  return (
    <div className="pagination-container">
      {/* Quick Jump Buttons */}
      {quickJumps.length > 0 && (
        <div className="pagination__quick-jumps">
          <span className="pagination__quick-label">Jump to:</span>
          {quickJumps.map((page) => (
            <button
              key={page}
              className={`pagination__quick-button ${page < currentPage ? 'pagination__quick-button--back' : ''}`}
              onClick={() => onPageChange(page)}
              disabled={disabled}
              title={`Go to page ${page}`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* Main Pagination */}
      <nav className="pagination" aria-label="Pagination">
        <button
          className="pagination__button pagination__button--arrow"
          onClick={handlePrevious}
          disabled={currentPage === 1 || disabled}
          aria-label="Previous page"
        >
          ←
        </button>

        <div className="pagination__pages">
          {getPageNumbers().map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={page}
                className={`pagination__button ${
                  page === currentPage ? 'pagination__button--active' : ''
                }`}
                onClick={() => onPageChange(page)}
                disabled={disabled}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            ) : (
              <span key={`ellipsis-${index}`} className="pagination__ellipsis">
                {page}
              </span>
            )
          )}
        </div>

        <button
          className="pagination__button pagination__button--arrow"
          onClick={handleNext}
          disabled={currentPage === totalPages || disabled}
          aria-label="Next page"
        >
          →
        </button>

        {/* Go to Page Button */}
        <button
          className="pagination__goto-toggle"
          onClick={() => setShowGoTo(!showGoTo)}
          disabled={disabled}
          aria-label="Go to specific page"
          title="Go to page..."
        >
          #
        </button>
      </nav>

      {/* Go to Page Input */}
      {showGoTo && (
        <form className="pagination__goto" onSubmit={handleGoToSubmit}>
          <label htmlFor="goto-page" className="pagination__goto-label">
            Go to page:
          </label>
          <input
            id="goto-page"
            type="number"
            min={1}
            max={totalPages}
            value={goToValue}
            onChange={(e) => setGoToValue(e.target.value)}
            className="pagination__goto-input"
            placeholder={`1-${totalPages}`}
            autoFocus
          />
          <button
            type="submit"
            className="pagination__goto-submit"
            disabled={disabled || !goToValue}
          >
            Go
          </button>
        </form>
      )}

      {/* Page Info */}
      <div className="pagination__info">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
