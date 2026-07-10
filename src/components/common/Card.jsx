
import PropTypes from 'prop-types';
const Card = ({ title, description, image, tags, onClick }) => {
  return (
    <div className="glass-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {image && (
        <div style={{ width: '100%', height: '180px', overflow: 'hidden', borderRadius: '8px', marginBottom: '16px' }}>
          <img 
            src={image} 
            alt={title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      )}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>{title}</h3>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>{description}</p>
      {tags && tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {tags.map((tag) => (
            <span 
              key={tag} 
              style={{ 
                background: 'rgba(20, 184, 166, 0.1)', 
                color: 'var(--color-primary)', 
                fontSize: '0.75rem', 
                fontWeight: 600, 
                padding: '4px 8px', 
                borderRadius: '4px' 
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};
Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};
export default Card;
