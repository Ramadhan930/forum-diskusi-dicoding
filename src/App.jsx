import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Pastikan Link diimport di sini
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/slice';
import { LoadingBar } from 'react-redux-loading-bar';
import { Toaster } from 'react-hot-toast'; // Tambahkan notifikasi cantik

import { unsetAuthUser } from './states/authUser/slice';
import api from './utils/api';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AddThreadPage from './pages/AddThreadPage'; // 1. IMPORT HALAMAN BARU INI

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(unsetAuthUser());
    api.putAccessToken('');
  };

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <h1>Sedang Memuat Aplikasi Forum...</h1>
      </div>
    );
  }

  return (
    <>
      <LoadingBar style={{ backgroundColor: '#0066ff', height: '5px' }} />
      <Toaster position="top-right" /> {/* Feedback sukses/gagal */}
      <div
        className="app-container"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: '#fff',
          minHeight: '100vh',
          boxShadow: '0 0 10px rgba(0,0,0,0.05)',
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            borderBottom: '1px solid #eee',
            alignItems: 'center',
            backgroundColor: '#fff',
            sticky: 'top',
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>
              Madhan Forum
            </h1>
            <nav style={{ marginTop: '10px', display: 'flex', gap: '15px' }}>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: '#0066ff',
                  fontWeight: '500',
                }}
              >
                Threads
              </Link>
              <Link
                to="/leaderboards"
                style={{
                  textDecoration: 'none',
                  color: '#0066ff',
                  fontWeight: '500',
                }}
              >
                Leaderboards
              </Link>
              {/* 2. TOMBOL NAVIGASI KE HALAMAN BARU */}
              {authUser && (
                <Link
                  to="/new"
                  style={{
                    textDecoration: 'none',
                    color: '#0066ff',
                    fontWeight: 'bold',
                  }}
                >
                  + Buat Diskusi
                </Link>
              )}
            </nav>
          </div>

          {authUser && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={authUser.avatar}
                alt={authUser.name}
                style={{
                  width: '35px',
                  borderRadius: '50%',
                  border: '2px solid #0066ff',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {authUser.name}
                </span>
                <button
                  onClick={onLogout}
                  style={{
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    color: 'red',
                    padding: 0,
                    textAlign: 'left',
                    fontSize: '0.8rem',
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </header>

        <main style={{ padding: '20px' }}>
          <Routes>
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
                {/* 3. RUTE KHUSUS TAMBAH THREAD */}
                <Route path="/new" element={<AddThreadPage />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;