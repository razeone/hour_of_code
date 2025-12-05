import './Skeleton.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export function Skeleton({
  width = '100%',
  height = '1rem',
  borderRadius = '4px',
  className = '',
}: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
}

export function PokemonCardSkeleton() {
  return (
    <div className="pokemon-card-skeleton">
      <Skeleton height="120px" className="skeleton-image" />
      <Skeleton width="60px" height="14px" className="skeleton-id" />
      <Skeleton width="80%" height="20px" className="skeleton-name" />
      <div className="skeleton-types">
        <Skeleton width="60px" height="22px" borderRadius="12px" />
        <Skeleton width="60px" height="22px" borderRadius="12px" />
      </div>
    </div>
  );
}

interface PokemonGridSkeletonProps {
  count?: number;
}

export function PokemonGridSkeleton({ count = 20 }: PokemonGridSkeletonProps) {
  return (
    <div className="pokemon-grid">
      {Array.from({ length: count }).map((_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function PokemonDetailSkeleton() {
  return (
    <div className="pokemon-detail-skeleton">
      <div className="detail-header-skeleton">
        <Skeleton width="150px" height="150px" borderRadius="50%" />
        <Skeleton width="200px" height="32px" className="skeleton-name" />
        <Skeleton width="80px" height="20px" className="skeleton-id" />
      </div>
      <div className="detail-types-skeleton">
        <Skeleton width="80px" height="28px" borderRadius="14px" />
        <Skeleton width="80px" height="28px" borderRadius="14px" />
      </div>
      <div className="detail-stats-skeleton">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="stat-skeleton">
            <Skeleton width="80px" height="16px" />
            <Skeleton width="100%" height="12px" borderRadius="6px" />
          </div>
        ))}
      </div>
    </div>
  );
}
