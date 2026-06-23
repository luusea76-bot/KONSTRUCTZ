export default function ProductCard({
  item,
  badge,
  eyebrow,
  specs,
  fallback,
  className = '',
  imageClassName = '',
  onView,
  onAddToCart
}) {
  const detailHref = `?page=product-detail&id=${item.slug || item.id}`;

  const handleView = (event) => {
    event.preventDefault();
    onView(item);
  };

  return (
    <div className={`product-card ${className}`.trim()}>
      <a
        href={detailHref}
        className={`card-image-area ${imageClassName}`.trim()}
        onClick={handleView}
      >
        {badge && <span className="card-image-badge">{badge}</span>}
        {item.image ? (
          <img src={item.image} alt={item.name} className="card-image" />
        ) : (
          fallback
        )}
      </a>

      <div className="card-info">
        {eyebrow && <div className="card-badge-type">{eyebrow}</div>}
        <h3 className="card-name text-black">
          <a
            href={detailHref}
            onClick={handleView}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {item.name}
          </a>
        </h3>

        <div className="card-specs">
          {specs.map((spec) => (
            <div key={spec.label}>
              <span>{spec.label}:</span> {spec.value}
            </div>
          ))}
        </div>

        <div className="card-footer" style={{ display: 'flex', gap: '8px' }}>
          <a
            href={detailHref}
            className="cta-button black-pill-btn"
            style={{ flex: 1, textAlign: 'center', display: 'block' }}
            onClick={handleView}
          >
            View Details
          </a>
          <button
            className="cta-button white-pill-dark-border"
            style={{ padding: '10px 16px', fontSize: '13px' }}
            onClick={() => onAddToCart(item)}
            aria-label="Add to cart"
          >
            🛒
          </button>
        </div>
      </div>
    </div>
  );
}
