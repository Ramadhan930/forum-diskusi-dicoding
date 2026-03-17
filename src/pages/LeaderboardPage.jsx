import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/slice';

function LeaderboardPage() {
  const leaderboards = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section
      className="leaderboard-page"
      style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}
    >
      <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        Klasemen Pengguna Aktif
      </h2>

      <div
        style={{
          marginTop: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: 'bold',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
        >
          <span>Pengguna</span>
          <span>Skor</span>
        </header>

        {leaderboards.length > 0 ? (
          leaderboards.map((item, index) => (
            <div
              key={item.user.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 15px',
                borderBottom:
                  index === leaderboards.length - 1 ? 'none' : '1px solid #eee',
              }}
            >
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <span
                  style={{ fontWeight: 'bold', color: '#666', width: '20px' }}
                >
                  {index + 1}.
                </span>
                <img
                  src={item.user.avatar}
                  alt={item.user.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid #ddd',
                  }}
                />
                <span style={{ fontWeight: '500' }}>{item.user.name}</span>
              </div>
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  color: '#0066ff',
                }}
              >
                {item.score}
              </span>
            </div>
          ))
        ) : (
          <div style={{ padding: '30px', textAlign: 'center' }}>
            <p style={{ color: '#999' }}>Memuat peringkat pengguna...</p>
          </div>
        )}
      </div>

      <p
        style={{
          marginTop: '20px',
          fontSize: '0.8rem',
          color: '#888',
          textAlign: 'center',
        }}
      >
        *Skor dihitung berdasarkan aktivitas diskusi dan komentar.
      </p>
    </section>
  );
}

export default LeaderboardPage;
