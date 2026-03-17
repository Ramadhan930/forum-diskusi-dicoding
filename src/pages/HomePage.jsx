import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncPopulateUsersAndThreads } from '../states/threads/slice';
import { postedAt } from '../utils';

function HomePage() {
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const [selectedCategory, setSelectedCategory] = useState(''); // State untuk filter

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  // Ambil daftar kategori unik dari threads
  const categories = [...new Set(threads.map((thread) => thread.category))];

  const usersMap = useMemo(() => {
    const map = {};
    users.forEach((user) => {
      map[user.id] = user;
    });
    return map;
  }, [users]);

  const threadList = threads
    .filter((thread) =>
      selectedCategory ? thread.category === selectedCategory : true,
    )
    .map((thread) => ({
      ...thread,
      user: usersMap[thread.ownerId],
    }));

  return (
    <section className="home-page">
      {/* 1. Navigasi ke Halaman Tambah Thread (Sesuai Revisi) */}
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>Diskusi Tersedia</h2>
        <Link to="/new">
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#0066ff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            + Buat Diskusi Baru
          </button>
        </Link>
      </div>

      {/* 2. Filter Kategori (Bonus Bintang 5) */}
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setSelectedCategory('')}
          style={{
            padding: '5px 12px',
            borderRadius: '20px',
            border: '1px solid #0066ff',
            backgroundColor: selectedCategory === '' ? '#0066ff' : 'white',
            color: selectedCategory === '' ? 'white' : '#0066ff',
            cursor: 'pointer',
          }}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '5px 12px',
              borderRadius: '20px',
              border: '1px solid #0066ff',
              backgroundColor:
                selectedCategory === category ? '#0066ff' : 'white',
              color: selectedCategory === category ? 'white' : '#0066ff',
              cursor: 'pointer',
            }}
          >
            #{category}
          </button>
        ))}
      </div>

      <div className="threads-list">
        {threadList.length > 0 ? (
          threadList.map((thread) => (
            <div
              key={thread.id}
              className="thread-item"
              style={{
                border: '1px solid #eee',
                padding: '1.5rem',
                marginBottom: '1rem',
                borderRadius: '8px',
                backgroundColor: '#fff',
              }}
            >
              <header>
                <span
                  style={{
                    backgroundColor: '#f3f4f6',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                  }}
                >
                  #{thread.category}
                </span>
                <h3 style={{ margin: '10px 0' }}>
                  <Link
                    to={`/threads/${thread.id}`}
                    style={{ color: '#0066ff', textDecoration: 'none' }}
                  >
                    {thread.title}
                  </Link>
                </h3>
              </header>
              <article
                style={{
                  fontSize: '0.95rem',
                  color: '#374151',
                  marginBottom: '15px',
                }}
                dangerouslySetInnerHTML={{
                  __html:
                    thread.body.substring(0, 200) +
                    (thread.body.length > 200 ? '...' : ''),
                }}
              />
              <footer
                style={{
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  borderTop: '1px solid #f3f4f6',
                  paddingTop: '10px',
                }}
              >
                <span>
                  Dibuat oleh <strong>{thread.user?.name || 'Anonim'}</strong>
                </span>
                <span style={{ margin: '0 10px' }}>•</span>
                <span>{postedAt(thread.createdAt)}</span>
                <span style={{ margin: '0 10px' }}>•</span>
                <span>💬 {thread.totalComments} Komentar</span>
              </footer>
            </div>
          ))
        ) : (
          <p>Tidak ada diskusi ditemukan.</p>
        )}
      </div>
    </section>
  );
}

export default HomePage;
