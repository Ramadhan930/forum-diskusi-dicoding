import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncPopulateUsersAndThreads } from '../states/threads/slice';
import ThreadInput from '../components/ThreadInput';
import { postedAt } from '../utils'; // Pastikan sudah buat file utils

function HomePage() {
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  return (
    <section className="home-page">
      <ThreadInput />
      
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Diskusi Tersedia</h2>
      </div>

      <div className="threads-list" style={{ marginTop: '15px' }}>
        {threadList.length > 0 ? (
          threadList.map((thread) => (
            <div key={thread.id} className="thread-item" style={{ 
              border: '1px solid #eee', 
              padding: '1.5rem', 
              marginBottom: '1rem', 
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <header>
                <span style={{ 
                  backgroundColor: '#f3f4f6', 
                  padding: '4px 10px', 
                  borderRadius: '4px', 
                  fontSize: '0.85rem',
                  color: '#4b5563'
                }}>
                  #{thread.category}
                </span>
                <h3 style={{ margin: '10px 0' }}>
                  <Link to={`/threads/${thread.id}`} style={{ color: '#0066ff', textDecoration: 'none' }}>
                    {thread.title}
                  </Link>
                </h3>
              </header>
              
              <article 
                style={{ fontSize: '0.95rem', color: '#374151', marginBottom: '15px' }}
                dangerouslySetInnerHTML={{ __html: thread.body.substring(0, 200) + (thread.body.length > 200 ? '...' : '') }} 
              />
              
              <footer style={{ fontSize: '0.85rem', color: '#6b7280', borderTop: '1px solid #f3f4f6', paddingTop: '10px' }}>
                <span>Dibuat oleh <strong>{thread.user?.name || 'Anonim'}</strong></span>
                <span style={{ margin: '0 10px' }}>•</span>
                <span>{postedAt(thread.createdAt)}</span>
                <span style={{ margin: '0 10px' }}>•</span>
                <span>💬 {thread.totalComments} Komentar</span>
              </footer>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Belum ada diskusi tersedia. Jadilah yang pertama membuat thread!</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default HomePage;