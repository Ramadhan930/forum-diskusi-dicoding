import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveThreadDetail, asyncAddComment } from '../states/threadDetail/slice';
import { postedAt } from '../utils'; // Gunakan fungsi waktu yang kita buat sebelumnya

function DetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onCommentSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      dispatch(asyncAddComment({ threadId: id, content }));
      setContent('');
    }
  };

  if (!threadDetail) {
    return (
      <p style={{ textAlign: 'center', marginTop: '50px' }}>
        Sedang memuat detail...
      </p>
    );
  }

  return (
    <section
      className="detail-page"
      style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}
    >
      {/* HEADER DETAIL: Menampilkan Avatar Pembuat (SYARAT REVISI) */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          borderBottom: '1px solid #eee',
          paddingBottom: '20px',
        }}
      >
        <img
          src={threadDetail.owner.avatar}
          alt={threadDetail.owner.name}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '2px solid #0066ff',
          }}
        />
        <div>
          <h2 style={{ margin: 0 }}>{threadDetail.title}</h2>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
            Dibuat oleh <strong>{threadDetail.owner.name}</strong> •{' '}
            {postedAt(threadDetail.createdAt)}
          </p>
        </div>
      </header>

      {/* BODY THREAD */}
      <article
        style={{ marginTop: '20px', lineHeight: '1.6', fontSize: '1.1rem' }}
        dangerouslySetInnerHTML={{ __html: threadDetail.body }}
      />

      <div style={{ marginTop: '10px' }}>
        <span
          style={{
            backgroundColor: '#f0f0f0',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '0.8rem',
          }}
        >
          #{threadDetail.category}
        </span>
      </div>

      <hr
        style={{ margin: '40px 0', border: '0', borderTop: '1px solid #eee' }}
      />

      {/* FORM KOMENTAR */}
      {authUser ? (
        <div className="comment-form" style={{ marginBottom: '40px' }}>
          <h3>Beri Komentar</h3>
          <form onSubmit={onCommentSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis komentarmu..."
              required
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                marginBottom: '10px',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 25px',
                backgroundColor: '#0066ff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Kirim Komentar
            </button>
          </form>
        </div>
      ) : (
        <p>Silakan login untuk memberi komentar.</p>
      )}

      {/* DAFTAR KOMENTAR (Dilengkapi Avatar juga agar aman) */}
      <div className="comments-list">
        <h3>Komentar ({threadDetail.comments.length})</h3>
        {threadDetail.comments.map((comment) => (
          <div
            key={comment.id}
            className="comment-item"
            style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '20px',
              padding: '15px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
            }}
          >
            <img
              src={comment.owner.avatar}
              alt={comment.owner.name}
              style={{ width: '35px', height: '35px', borderRadius: '50%' }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}>
                <strong>{comment.owner.name}</strong> •{' '}
                <span style={{ color: '#888' }}>
                  {postedAt(comment.createdAt)}
                </span>
              </p>
              <p style={{ margin: 0 }}>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DetailPage;