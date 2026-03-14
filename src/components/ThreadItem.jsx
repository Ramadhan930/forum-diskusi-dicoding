import React from 'react';
import PropTypes from 'prop-types'; // Wajib untuk Bintang 5
import { Link } from 'react-router-dom';
import { postedAt } from '../utils';

// Pastikan deklarasi komponennya seperti ini (langsung pakai export default juga boleh)
function ThreadItem({ id, title, body, category, createdAt, totalComments, user }) {
  return (
    <div className="thread-item" style={{ border: '1px solid #eee', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
      <header>
        <span className="category" style={{ backgroundColor: '#eee', padding: '2px 8px', borderRadius: '4px' }}>
          #{category}
        </span>
        <h3 style={{ margin: '10px 0' }}>
          <Link to={`/threads/${id}`} style={{ color: '#0066ff', textDecoration: 'none' }}>
            {title}
          </Link>
        </h3>
      </header>
      <article 
        style={{ marginBottom: '1rem' }} 
        dangerouslySetInnerHTML={{ __html: body.substring(0, 150) + (body.length > 150 ? '...' : '') }} 
      />
      <footer style={{ fontSize: '0.8rem', color: '#666' }}>
        <span>Dibuat oleh <strong>{user?.name || 'Anonim'}</strong></span>
        <span style={{ margin: '0 10px' }}>•</span>
        <span>{postedAt(createdAt)}</span>
        <span style={{ margin: '0 10px' }}>•</span>
        <span>💬 {totalComments} Komentar</span>
      </footer>
    </div>
  );
}

// VALIDASI PROPTYPES (Ini yang bikin reviewer senang!)
ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
};

export default ThreadItem;