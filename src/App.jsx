import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/slice';
import { LoadingBar } from 'react-redux-loading-bar';

// TAMBAHKAN IMPORT INI
import { unsetAuthUser } from './states/authUser/slice';
import api from './utils/api';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { Link } from 'react-router-dom';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(unsetAuthUser());
    api.putAccessToken(''); // Hapus token agar saat refresh tetap logout
  };

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <h1>Sedang Memuat Aplikasi Forum...</h1>
      </div>
    );
  }

  return (
    <>
      <LoadingBar style={{ backgroundColor: '#000', height: '5px' }} />
      <div className="app-container">
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', borderBottom: '1px solid #ddd', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0 }}>Dicoding Forum</h1>
            {/* NAVIGASI PINDAH KE SINI AGAR RAPI */}
            <nav style={{ marginTop: '5px' }}>
              <Link to="/" style={{ marginRight: '15px', fontSize: '14px' }}>Threads</Link>
              <Link to="/leaderboards" style={{ fontSize: '14px' }}>Leaderboards</Link>
            </nav>
          </div>

          {authUser && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src={authUser.avatar} alt={authUser.name} style={{ width: '30px', borderRadius: '50%' }} />
              <span>{authUser.name}</span>
              <button onClick={onLogout} style={{ cursor: 'pointer', padding: '5px 12px' }}>Logout</button>
            </div>
          )}
        </header>

        <main style={{ padding: '20px' }}>
          <Routes>
            {/* ROUTE LEADERBOARD BISA DIAKSES SIAPA SAJA */}
            <Route path="/leaderboards" element={<LeaderboardPage />} />
            
            {!authUser ? (
              <>
                <Route path="/*" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </>
            ) : (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/threads/:id" element={<DetailPage />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;